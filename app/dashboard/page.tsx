import { notFound } from "next/navigation";
import { requireUser } from "../lib/hooks";
import prisma from "../lib/db";
import EmptyState from "../components/EmptyState";

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
    <div>
      {data.eventType.length === 0 ? (
        <EmptyState
          title="No Event Found"
          description="You haven't created any event yet. Start by creating one."
          buttonText="Create Event"
          href="/dashboard/new"
        />
      ) : (
        <>kjhkj</>
      )}
    </div>
  );
}
