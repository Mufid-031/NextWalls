import { MessageCircleIcon, Plus, X } from "lucide-react";
import { Button } from "../ui/Button";

export default function CommentInput({ commentMode, setCommentMode, setComment, handleAddCommentClick }: { commentMode: boolean, setCommentMode: (value: boolean) => void, setComment: (value: string) => void, handleAddCommentClick: () => void }) {
  return (
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
  );
}
