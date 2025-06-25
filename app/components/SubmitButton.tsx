"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";


interface iAppProps{
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
    className?: string;
}

export function SubmitButton({text, variant, className}:iAppProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          disabled
          className={cn("w-full", className)}
          variant={"outline"}
        >
          <Loader2 className="size-4 mr-2 animate-spin"/> Please wait
        </Button>
      ) : (
        <Button
          type="submit"
          className={cn("w-full", className)}
          variant={variant}
        >
         
          {text}
        </Button>
      )}
    </>
  );
}

export function GoogleAuthButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          disabled
          className="w-full flex items-center gap-2"
          variant={"outline"}
        >
          <Image
            src="/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="animate-spin"
          />{" "}
          Signing...
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-full flex items-center gap-2"
          variant={"outline"}
        >
          <Image src="/google.svg" alt="Google" width={20} height={20} />
          Sign in with Google
        </Button>
      )}
    </>
  );
}
