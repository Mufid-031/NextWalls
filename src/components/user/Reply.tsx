import { MessageCircleIcon, X } from "lucide-react";
import { Button } from "../ui/Button";
import { Comment } from "@prisma/client";

export default function Reply({ setReply, setReplyMode, comment, handleReplyClick }: { setReply: (value: string) => void; setReplyMode: (value: boolean) => void; comment: Comment; handleReplyClick: (value: number) => void }) {
  return (
    <div className="w-full px-2 flex flex-col gap-3">
      <textarea onChange={(e) => setReply(e.target.value)} name="comment" id="comment" className="w-full h-36 bg-darkgunmetal text-white p-2"></textarea>
      <div className="flex gap-2 justify-end">
        <Button size="default" variant="ghost" className="bg-red-400 flex items-center gap-1" onClick={() => setReplyMode(false)}>
          <X className="w-4 h-4 text-black" />
          <span>Cancel</span>
        </Button>
        <Button size="default" variant="ghost" className="bg-green-400 flex items-center gap-1" onClick={() => handleReplyClick(comment.id)}>
          <MessageCircleIcon fill="#000" className="w-4 h-4 text-black" />
          <span>Add Comment</span>
        </Button>
      </div>
    </div>
  );
}
