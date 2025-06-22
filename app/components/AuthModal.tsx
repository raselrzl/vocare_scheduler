import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { signIn } from "../lib/auth";
import { GoogleAuthButton } from "./SubmitButton";

export function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm text-center">
        <DialogHeader>
          <DialogTitle className="sr-only">Login to your account</DialogTitle>
          <div className="flex justify-center">
            <Image
              src="/logo-transparent.png"
              alt="Logo"
              width={150}
              height={50}
              className="object-contain"
            />
          </div>
        </DialogHeader>
        <div className="mt-6 flex justify-center">
          <form
            action={async () => {
              "use server"
              await signIn("google");
            }}
            className="w-full"
          >
            <GoogleAuthButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
