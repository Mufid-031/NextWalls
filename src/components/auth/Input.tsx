import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: string;
    name: string;
    id: string;
    className?: string;
}

export default function Input({
    type,
    name,
    id,
    className,
    ...props
}: InputProps) {
    return (
        <input 
            className={cn("text-black border rounded border-slate-600", className)} 
            type={type} 
            name={name} 
            id={id} 
            {...props}
        />
    )
}