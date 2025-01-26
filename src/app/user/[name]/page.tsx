"use client";

import JumbotronLayout from "@/components/home/JumbotronLayout";
import { NavBar } from "@/components/home/Navbar";
import { Button } from "@/components/ui/Button";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { Wallpaper } from "@/types/wallpaper.type";
import axios from "axios";
import { Bookmark, Home, Link as LinkIcon, Mail, MessageCircleIcon, Plus, Star, Upload, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { use, useState } from "react";
import Link from "next/link";
import { Comment, User } from "@prisma/client";
import moment from "moment";

interface CommentProps extends Comment {
  user: User;
  replies: (Comment & { user: User })[];
}

export default function UserProfilePage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const { wallpapers, getWallpapers } = useWallpaper();
  const { data: session } = useSession();
  const [recentWallpapers, setRecentWallpapers] = useState<Wallpaper[]>([]);
  const [commentMode, setCommentMode] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [profileComments, setProfileComments] = useState<CommentProps[]>([]);

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
  }, [name]);

  return (
    <>
      <header className="fixed top-0 z-50 w-full">
        <NavBar />
      </header>
      <JumbotronLayout
        backgroundImage={wallpapers[0]?.imageUrl ? <Image unoptimized src={wallpapers[0]?.imageUrl || "/placeholder.svg"} alt="Wallpaper" width={1920} height={500} className="w-full h-full object-cover" /> : null}
        className="h-[350px]"
      >
        <div className="flex justify-between">
          <div className="w-full h-full flex gap-5 items-center mt-2">
            <div className="w-48 h-48 bg-slate-600/80">
              <Image src={wallpapers[1]?.imageUrl || "/placeholder.svg"} width={300} height={300} alt="profile" className="w-full h-full object-cover object-left" />
            </div>
            <div className="p-5 w-[34rem] bg-white/30">
              <h1 className="text-3xl text-[#98ff98] hover:underline cursor-pointer [text-shadow:_0_0_10px_rgba(152,255,152,0.5)] font-bold">{name}</h1>
              <p className="text-md mt-2 text-[#98ff98]">{session?.user.role || "USER"}</p>
            </div>
          </div>
          <div className="flex">
            <div className="w-12 h-12 shadow-inner shadow-black flex justify-center items-center cursor-pointer">
              <Bookmark className="w-7 h-7 text-white" />
            </div>
            <div className="w-12 h-12 shadow-inner shadow-black flex justify-center items-center cursor-pointer">
              <Mail className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </JumbotronLayout>
      <main className="w-[90%] h-screen mx-auto bg-black/30 shadow-2xl relative">
        <div className="flex justify-center absolute -top-5 left-[50%] translate-x-[-50%] drop-shadow-2xl">
          <div className="w-fit h-10 px-3 bg-darkgunmetal hover:bg-[#2b2b2b] transition-all duration-300 border border-white/10 flex justify-center items-center gap-2 cursor-pointer">
            <Home className="w-5 h-5 text-white" />
            <span className="text-white">Profile</span>
          </div>
          <div className="w-fit h-10 px-3 bg-darkgunmetal hover:bg-[#2b2b2b] transition-all duration-300 border border-white/10 flex justify-center items-center gap-2 cursor-pointer">
            <Upload className="w-5 h-5 text-white" />
            <span className="text-white">Uploads</span>
          </div>
          <div className="w-fit h-10 px-3 bg-darkgunmetal hover:bg-[#2b2b2b] transition-all duration-300 border border-white/10 flex justify-center items-center gap-2 cursor-pointer">
            <Star className="w-5 h-5 text-white" />
            <span className="text-white">Collections</span>
          </div>
        </div>
        <section className="grid grid-cols-2 pt-20 px-10 gap-3">
          <div className="w-full h-full overflow-hidden">
            <span className="flex justify-between group">
              <h3 className="text-teal-400 font-bold pb-1">1 Comments</h3>
              <LinkIcon className="w-5 h-5 text-[#383838] group-hover:text-white" />
            </span>
            <hr className="border-[#383838] mb-4" />
            <div className="flex justify-center items-center mb-5">
              {commentMode ? (
                <div className="w-full px-2 flex flex-col gap-3">
                  <textarea onChange={(e) => setComment(e.target.value)} name="comment" id="comment" className="w-full h-36 bg-darkgunmetal text-white p-2"></textarea>
                  <div className="flex gap-2 justify-end">
                    <Button size="default" variant="ghost" className="bg-red-400 flex items-center gap-1" onClick={() => setCommentMode(false)}>
                      <X className="w-4 h-4 text-black" />
                      <span>Cancel</span>
                    </Button>
                    <Button size="default" variant="ghost" className="bg-green-400 flex items-center gap-1" onClick={handleAddCommentClick}>
                      <MessageCircleIcon fill="#000" className="w-4 h-4 text-black" />
                      <span>Add Comment</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <Button size="default" variant="ghost" className="bg-green-400" onClick={() => setCommentMode(true)}>
                  <Plus className="w-4 h-4 text-black" />
                  <span>Add Comment</span>
                </Button>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {profileComments.map((comment) => (
                <div key={comment.id}>
                  <div className="w-full h-16 bg-darkgunmetal flex items-center px-2 gap-1">
                    <div className="w-10 h-10">
                      <Image src={comment.user?.avatar || "/uploads/5ad3549c-bd20-495b-a2db-5826fe9b71ee.jpg"} width={300} height={300} alt="profile" className="w-full h-full object-cover object-left" />
                    </div>
                    <div className="flex flex-col w-full ml-3">
                      <div className="w-full flex justify-between items-center border-b-2 border-dotted border-[#383838] pb-1 text-xs">
                        <h5 className="text-white">
                          <span className="text-teal-400 font-semibold">{comment.user.name}</span>-{moment(comment.createdAt).fromNow()}
                        </h5>
                        <div className="cursor-pointer text-white">
                          <span className="text-teal-400/50 hover:text-teal-400 font-semibold">Reply</span> #{comment.id}
                        </div>
                      </div>
                      <div className="text-white">{comment.content}</div>
                    </div>
                  </div>
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="h-16 bg-darkgunmetal flex items-center px-2 gap-1 ml-14 mt-5">
                      <div className="w-10 h-10">
                        <Image src={reply.user?.avatar || "/uploads/9f9bbca9-272a-4fd5-bda2-b54ea5ddc553.png"} width={300} height={300} alt="profile" className="w-full h-full object-cover object-left" />
                      </div>
                      <div className="flex flex-col w-full ml-3">
                        <div className="w-full flex justify-between items-center border-b-2 border-dotted border-[#383838] pb-1 text-xs">
                          <h5 className="text-white">
                            <span className="text-teal-400 font-semibold">{reply.user?.name}</span>-{moment(reply.createdAt).fromNow()}
                          </h5>
                          <div className="cursor-pointer text-white">
                            <span className="text-teal-400/50 hover:text-teal-400 font-semibold">Reply</span> #{reply.id}
                          </div>
                        </div>
                        <div className="text-white">{reply.content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
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
