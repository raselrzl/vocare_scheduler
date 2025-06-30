"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function EditEventLink({ eventId }: { eventId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    setLoading(true);
    router.push(`/dashboard/event/${eventId}`);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-primary text-white px-2 py-1 cursor-pointer rounded-md flex items-center justify-center gap-2"
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      Edit Event
    </button>
  );
}
