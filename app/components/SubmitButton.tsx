"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import Image from "next/image";


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
