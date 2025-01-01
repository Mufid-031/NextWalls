import { cn } from "@/lib/utils";

export default function Label({ 
    children,
    htmlFor,
    className
}: {
    children: React.ReactNode;
    htmlFor: string;
    className?: string;
}) {
  return (
    <label className={cn("text-slate-600 font-semibold", className)} htmlFor={htmlFor}>
      {children}
    </label>
  );
}