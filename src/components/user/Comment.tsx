"use client";

import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { Comment as CommentType, User as UserType } from "@prisma/client";
import Reply from "./Reply";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Comment extends CommentType {
  user: UserType;
  replies?: Comment[];
}

export default function CommentComponent({
  comment,
}: {
  comment: Comment;
}) {

  const { data: session } = useSession();
  const [replyMode, setReplyMode] = useState<boolean>(false);
  const [reply, setReply] = useState<string>("");

  const handleReplyClick = async (parentId: number) => {
    if (reply === "") return;
    try {
      const userId = session?.user?.id;
      const profileId = name;
      const response = await axios.post("/api/users/comment/reply", {
        comment: reply,
        userId,
        profileId,
        parentId,
      });

      const data = await response.data;
      console.log(data);
      setReply("");
      setReplyMode(false);
    } catch (error) {
      console.log("error add reply: ", error);
    }
  };


  return (

    <>
      <div className="flex flex-col gap-2">
        <div key={comment.id} className="flex flex-col gap-4 mb-3">
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
                  <span onClick={() => setReplyMode(true)} className="text-teal-400/50 hover:text-teal-400 font-semibold">
                    Reply
                  </span>{" "}
                  #{comment.id}
                </div>
              </div>
              <div className="text-white">{comment.content}</div>
            </div>
          </div>
          {comment.replies && comment.replies.map((reply: Comment) => (
            <div key={reply.id} className="h-16 bg-darkgunmetal flex items-center px-2 gap-1 ml-14">
              <div className="w-10 h-10">
                <Image src={reply.user?.avatar || "/uploads/9f9bbca9-272a-4fd5-bda2-b54ea5ddc553.png"} width={300} height={300} alt="profile" className="w-full h-full object-cover object-left" />
              </div>
              <div className="flex flex-col w-full ml-3">
                <div className="w-full flex justify-between items-center border-b-2 border-dotted border-[#383838] pb-1 text-xs">
                  <h5 className="text-white">
                    <span className="text-teal-400 font-semibold">{reply.user?.name}</span>-{moment(reply.createdAt).fromNow()}
                  </h5>
                  <div className="cursor-pointer text-white">
                    <span className="text-teal-400/50 hover:text-teal-400 font-semibold"></span> #{reply.id}
                  </div>
                </div>
                <div className="text-white">{reply.content}</div>
              </div>
            </div>
          ))}
          {replyMode ? 
            <Reply 
              setReply={setReply} 
              setReplyMode={setReplyMode} 
              comment={comment} 
              handleReplyClick={handleReplyClick} 
              /> 
            : null
          }
        </div>
      </div>
    </>
  );
}
