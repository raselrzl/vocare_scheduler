import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  href,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-in fade-in duration-300 border border-dashed border-border rounded-lg bg-muted/20">
      <div className="bg-red-100 text-red-600 rounded-full p-4 mb-4 shadow-sm">
        <Ban className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">{description}</p>
      <Link href={href}>
        <Button className="mt-6"><PlusCircle />{buttonText}</Button>
      </Link>
    </div>
  );
}
