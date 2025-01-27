import { LinkIcon } from "lucide-react";

export default function Title({ children, iconLink }: { children: React.ReactNode, iconLink: boolean }) {
  return (
    <>
      <span className="flex justify-between group">
        <h3 className="text-teal-400 font-bold pb-1">{children}</h3>
        {iconLink && <LinkIcon className="w-5 h-5 text-[#383838] group-hover:text-white" />}
      </span>
      <hr className="border-[#383838] mb-4" />
    </>
  );
}
