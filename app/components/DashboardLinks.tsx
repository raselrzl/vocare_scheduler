"use client";

import { cn } from "@/lib/utils";
import { CalendarCheck, HomeIcon, Settings, Users2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface iAppProps {
  id: number;
  name: string;
  href: string;
  icon: any;
}

export const dashboardLinks: iAppProps[] = [
  {
    id: 0,
    name: "Event Types",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    id: 1,
    name: "Meetings",
    href: "/dashboard/meetings",
    icon: Users2,
  },
  {
    id: 2,
    name: "availability",
    href: "/dashboard/availability",
    icon: CalendarCheck,
  },
  {
    id: 3,
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardLinks() {
  const pathname = usePathname();
  return (
    <div className="bg-white">
      <div className="flex h-10 items-center border-b px-4 lg:h-[60px] lg:px-6 md:hidden shrink-0 mb-5">
        <Link href="/" className="flex items-center h-full">
          <Image
            src="/logo-transparent.png"
            alt="Logo"
            width={120}
            height={32}
            className="object-contain"
          />
        </Link>
      </div>
      {dashboardLinks.map((link) => (
        <Link
          className={cn(
            pathname === link.href
              ? "text-primary bg-primary/10 "
              : "text-muted-foreground hover:text-foreground",
            "flex items-center gap-3 px-3 py-2 transition-all hover:text-primary rounded-none"
          )}
          href={link.href}
          key={link.id}
        >
          <link.icon className="size-4" />
          {link.name}
        </Link>
      ))}
    </div>
  );
}
