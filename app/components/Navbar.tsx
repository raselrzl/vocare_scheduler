import Image from "next/image";
import Link from "next/link";
import { AuthModal } from "./AuthModal";

export function Navbar() {
  return (
    <div className="flex items-center justify-between h-20 px-4">
      <Link href="/" className="flex items-center h-full">
        <Image
          src="/logo-transparent.png"
          alt="Logo"
          width={180}
          height={48}
          className="object-contain"
        />
      </Link>
      <AuthModal />
    </div>
  );
}
