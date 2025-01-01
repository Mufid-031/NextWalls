import { cn } from "@/lib/utils"

export default function Checkbox({
    name,
    id,
    className
}: {
    name: string;
    id: string;
    className?: string;
}) {
    return (
        <input className={cn("h-4 w-4 border border-gray-300 rounded text-white", className)} type="checkbox" name={name} id={id} />
    )
}