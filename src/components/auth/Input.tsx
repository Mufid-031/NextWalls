import { cn } from "@/lib/utils";

export default function Input({
    type,
    name,
    id,
    className
}: {
    type: string;
    name: string;
    id: string;
    className?: string
}) {
    return (
        <input className={cn("text-black border rounded border-slate-600", className)} type={type} name={name} id={id} />
    )
}