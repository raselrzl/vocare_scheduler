import Image from "next/image";
import Link from "next/link";
import { AuthModal } from "./AuthModal";

export function Navbar() {
  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center w-full max-w-3xl space-y-4">
        <Link href="/" className="flex flex-col items-center space-y-1">
          <img
            src="/logo-transparent.png"
            alt="Logo"
            className="object-contain h-30"
          />
          <p className="text-muted-foreground text-sm text-center">
            A scheduling app, to make schedule easier!
          </p>
        </Link>

        <AuthModal />
      </div>
    </div>
  );
}
