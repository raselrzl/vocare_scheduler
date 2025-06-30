import { notFound } from "next/navigation";
import { requireUser } from "../lib/hooks";
import prisma from "../lib/db";
import EmptyState from "../components/EmptyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Copy,
  Delete,
  ExternalLink,
  Link2,
  Pen,
  Settings,
  User2,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CopyLinkMenuItem } from "../components/CopyLinkMenu";
import { MenuActiveSwitch } from "../components/EventTypeSwitcher";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      userName: true,
      eventType: {
        select: {
          id: true,
          title: true,
          duration: true,
          active: true,
          url: true,
        },
      },
    },
  });

  if (!data) {
    notFound();
  }

  return data;
}

export default async function DashboardPage() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <>
      {data.eventType.length === 0 ? (
        <EmptyState
          title="No Event Found"
          description="You haven't created any event yet. Start by creating one."
          buttonText="Create Event"
          href="/dashboard/new"
        />
      ) : (
        <>
          <div className="flex items-center px-2 justify-between">
            <div className="hidden sm:grid gap-y-1">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold">
                  Events Type
                </h1>
                <p>Create and manage your event types here.</p>
              </div>
            </div>
            <Button asChild>
              <Link href="/dashboard/new">Create New Event</Link>
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.eventType.map((item) => (
              <div
                className=" overflow-hidden shadow border relative rounded-sm"
                key={item.id}
              >
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Settings className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Event</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link href={`/${data.userName}/${item.url}`}>
                            <ExternalLink />
                            Preview
                          </Link>
                        </DropdownMenuItem>

                        <CopyLinkMenuItem
                          meetingUrl={`${process.env.NEXT_PUBLIC_URL}/${data.userName}/${item.url}`}
                        />
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/event/${item.id}`}>
                            <Pen />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Delete />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Link href="/" className="flex flex-shrink-0 p-4">
                  <div className="flex-shrink-0">
                    <User2 className="size-4 ml-1" />
                  </div>
                  <div className="ml-4">
                    <dl>
                      <dt className="text-sm">
                        {item.duration} Minutes Meeting
                      </dt>
                      <dd className="text-lg font-medium">{item.title}</dd>
                    </dl>
                  </div>
                </Link>
                <div className="flex bg-muted px-5 py-3 items-center justify-between">
                  <MenuActiveSwitch
                    initialChecked={item.active}
                    eventTypeId={item.id}
                  />{" "}
                  <Link
                    href={`/dashboard/event/${item.id}`}
                    className="bg-primary text-white px-2 py-1 rounded-md"
                  >
                    Edit Event
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
