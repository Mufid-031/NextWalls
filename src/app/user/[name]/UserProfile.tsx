"use client";

import CommentComponent from "@/components/user/Comment";
import CommentInput from "@/components/user/CommentInput";
import RecentUploads from "@/components/user/RecentUploads";
import Title from "@/components/user/Title";
import { useWallpaper } from "@/contexts/WallpaperContext";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Comment as CommentType, User as UserType } from "@prisma/client";

interface Comment extends CommentType {
  user: UserType;
  replies?: Comment[];
}

export default function UserProfile({ name }: { name: string }) {
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
    <section className="grid grid-cols-2 pt-20 px-10 gap-3">
      <div className="w-full h-full overflow-hidden">
        <Title iconLink>{profileComments.length} Comments</Title>
        <CommentInput commentMode={commentMode} setCommentMode={setCommentMode} setComment={setComment} handleAddCommentClick={handleAddCommentClick} />
        {profileComments.map((comment: Comment) => (
          <div key={comment.id}>
            <CommentComponent comment={comment} reply={reply} setReply={setReply} />
          </div>
        ))}
      </div>
      <div className="w-full h-full">
        <div className="w-full h-full overflow-hidden">
          <RecentUploads name={name} />
          <Title iconLink>User Information</Title>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <div className="flex w-full h-10">
                <div className="w-1/2 bg-darkgunmetal pr-2 flex justify-end items-center text-sky-400 font-semibold">Last Active</div>
                <div className="w-1/2 bg-gray-700 pl-2 flex items-center text-white font-semibold">5 minutes ago</div>
              </div>
              <div className="flex w-full h-10">
                <div className="w-1/2 bg-darkgunmetal pr-2 flex justify-end items-center text-sky-400 font-semibold">Joined</div>
                <div className="w-1/2 bg-gray-700 pl-2 flex items-center text-white font-semibold">1 week ago</div>
              </div>
              <div className="flex w-full h-10">
                <div className="w-1/2 bg-darkgunmetal pr-2 flex justify-end items-center text-sky-400 font-semibold">Uploads</div>
                <div className="w-1/2 bg-gray-700 pl-2 flex items-center text-white font-semibold">5</div>
              </div>
              <div className="flex w-full h-10">
                <div className="w-1/2 bg-darkgunmetal pr-2 flex justify-end items-center text-sky-400 font-semibold">Favorites</div>
                <div className="w-1/2 bg-gray-700 pl-2 flex items-center text-white font-semibold">5</div>
              </div>
              <div className="flex w-full h-10">
                <div className="w-1/2 bg-darkgunmetal pr-2 flex justify-end items-center text-sky-400 font-semibold">Subcribe</div>
                <div className="w-1/2 bg-gray-700 pl-2 flex items-center text-white font-semibold">5</div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex w-full h-10">
                <div className="w-1/2 bg-darkgunmetal"></div>
                <div className="w-1/2 bg-gray-700"></div>
              </div>
              <div className="flex w-full h-10">
                <div className="w-1/2 bg-darkgunmetal"></div>
                <div className="w-1/2 bg-gray-700"></div>
              </div>
              <div className="flex w-full h-10">
                <div className="w-1/2 bg-darkgunmetal"></div>
                <div className="w-1/2 bg-gray-700"></div>
              </div>
              <div className="flex w-full h-10">
                <div className="w-1/2 bg-darkgunmetal"></div>
                <div className="w-1/2 bg-gray-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
