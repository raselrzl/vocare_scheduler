import prisma from "@/app/lib/db";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { deleteEventTypeAction } from "@/app/action";
import Link from "next/link";
import { SubmitButton } from "@/app/components/SubmitButton";

export default async function DeleteEventPage({
  params,
}: {
  params: Promise<{ eventTypeId: string }>;
}) {
  const { eventTypeId } = await params;

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h1 className="text-xl font-semibold">Delete Event</h1>
          <p>Are you sure you want to delete this event?</p>

          <form
            action={deleteEventTypeAction}
            className="flex items-center justify-between gap-4 pt-4"
          >
            <input type="hidden" name="id" value={eventTypeId} />

            <Link href="/dashboard">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>

            <SubmitButton
              text="Confirm Delete"
              variant="destructive"
              className="w-fit"
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
