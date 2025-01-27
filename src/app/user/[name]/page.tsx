"use client";

import CommentInput from "@/components/user/CommentInput";
import CommentComponent from "@/components/user/Comment";
import RecentUploads from "@/components/user/RecentUploads";
import axios from "axios";
import { use, useState } from "react";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useSession } from "next-auth/react";
import { Comment as CommentType, User as UserType } from "@prisma/client";
import Title from "@/components/user/Title";

interface Comment extends CommentType {
  user: UserType;
  replies?: Comment[];
}

export default function UserProfilePage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const { getWallpapers } = useWallpaper();
  const { data: session } = useSession();
  const [commentMode, setCommentMode] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [profileComments, setProfileComments] = useState<Comment[]>([]);
  const [reply, setReply] = useState<string>("");


  const handleAddCommentClick = async () => {
    if (comment === "") return;
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

    const getProfileComments = async (name: string) => {
      try {
        const response = await axios.get(`/api/users/comment/${name}`);
        const data = await response.data;
        setProfileComments(data);
      } catch (error) {
        console.log("error fetch profile comments: ", error);
      }
    };

    getProfileComments(name);
  }, [name, comment, reply]);

  return (
    <>
      
        <section className="grid grid-cols-2 pt-20 px-10 gap-3">
          <div className="w-full h-full overflow-hidden">
            <Title iconLink>{profileComments.length} Comments</Title>
            <CommentInput
              commentMode={commentMode}
              setCommentMode={setCommentMode}
              setComment={setComment}
              handleAddCommentClick={handleAddCommentClick}
            />
            {profileComments.map((comment: Comment) => (
              <div key={comment.id}>
                <CommentComponent comment={comment} reply={reply} setReply={setReply} />
              </div>
            ))}
          </div>
          <div className="w-full h-full">
            <div className="w-full h-full overflow-hidden">
              <RecentUploads name={name} />
              <Title iconLink>User Information</Title>Tit
            </div>
          </div>
        </section>
    </>
  );
}
