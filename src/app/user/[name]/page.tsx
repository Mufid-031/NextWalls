"use client";

import { NavBar } from "@/components/home/Navbar";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { Wallpaper } from "@/types/wallpaper.type";
import axios from "axios";
import { Link as LinkIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { use, useState } from "react";
import Link from "next/link";
import Jumbotron from "@/components/user/Jumbotron";
import Menu from "@/components/user/Menu";
import { Comment as CommentType, User as UserType } from "@prisma/client";
import CommentComponent from "@/components/user/Comment";
import CommentInput from "@/components/user/CommentInput";

interface Comment extends CommentType {
  user: UserType;
  replies?: Comment[];
}

export default function UserProfilePage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const { getWallpapers } = useWallpaper();
  const { data: session } = useSession();
  const [recentWallpapers, setRecentWallpapers] = useState<Wallpaper[]>([]);
  const [commentMode, setCommentMode] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [profileComments, setProfileComments] = useState<Comment[]>([]);

  const handleAddCommentClick = async () => {
    if (comment === "") return;
    console.log(comment);
    console.log(session?.user?.id);
    console.log(name);
    try {
      const userId = session?.user?.id;
      const profileId = name;
      const response = await axios.post("/api/users/comment", {
        comment,
        userId,
        profileId,
      });

      const data = await response.data;
      console.log(data);
      setComment("");
      setCommentMode(false);
    } catch (error) {
      console.log("error add comment: ", error);
    }
  };

  useIsomorphicLayoutEffect(() => {
    getWallpapers();

    const getRecentWallpapers = async (name: string) => {
      try {
        const response = await axios.get(`/api/users/recent/${name}`);
        const data = await response.data;
        setRecentWallpapers(data);
      } catch (error) {
        console.log("error fetch recent wallpapers: ", error);
      }
    };

    const getProfileComments = async (name: string) => {
      try {
        const response = await axios.get(`/api/users/comment/${name}`);
        const data = await response.data;
        setProfileComments(data);
      } catch (error) {
        console.log("error fetch profile comments: ", error);
      }
    };

    getRecentWallpapers(name);
    getProfileComments(name);
  }, [name, comment]);

  return (
    <>
      <header className="fixed top-0 z-50 w-full">
        <NavBar />
      </header>
      <Jumbotron />
      <main className="w-[90%] h-screen mx-auto bg-black/30 shadow-2xl relative">
        <Menu />
        <section className="grid grid-cols-2 pt-20 px-10 gap-3">
          <div className="w-full h-full overflow-hidden">
            <span className="flex justify-between group">
              <h3 className="text-teal-400 font-bold pb-1">{profileComments.length} Comments</h3>
              <LinkIcon className="w-5 h-5 text-[#383838] group-hover:text-white" />
            </span>
            <hr className="border-[#383838] mb-4" />
            <CommentInput 
              commentMode={commentMode} 
              setCommentMode={setCommentMode} 
              setComment={setComment} 
              handleAddCommentClick={handleAddCommentClick} 
            />
            {profileComments.map((comment: Comment) => (
              <div key={comment.id}>
                <CommentComponent comment={comment} />
              </div>
            ))}
          </div>
          <div className="w-full h-full">
            <div className="w-full h-full overflow-hidden">
              <Link href={`/user/${name}/uploads`} className="flex justify-between group">
                <h3 className="text-teal-400 font-bold pb-1">Recent Uploads</h3>
              </Link>
              <hr className="border-[#383838] mb-4" />
              <div className="w-full bg-black/70 flex flex-wrap justify-center py-2 mb-5">
                {recentWallpapers.map((wallpaper) => (
                  <Link href={`/wallpapers/${wallpaper.id}`} key={wallpaper.id} className="w-36 h-20">
                    <Image src={wallpaper?.imageUrl || "/placeholder.svg"} width={300} height={300} alt="profile" className="w-full h-full object-cover object-left" />
                  </Link>
                ))}
              </div>
              <div className="flex justify-between group">
                <h3 className="text-teal-400 font-bold pb-1">User Information</h3>
                <LinkIcon className="w-5 h-5 text-[#383838] group-hover:text-white" />
              </div>
              <hr className="border-[#383838] mb-4" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
