import EditEventTypeForm from "@/app/components/bookingForm/EditEventTypeForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

async function getData(eventTypeId: string) {
  const data = await prisma.eventType.findUnique({
    where: {
      id: eventTypeId,
    },
    select: {
      title: true,
      duration: true,
      description: true,
      url: true,
      videoCallSoftware: true,
      id: true,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

export default async function EditRoutePage({
  params,
}: {
  params: { eventTypeId: string };
}) {
  const data = await getData(params.eventTypeId);
  return (
    <>
      <EditEventTypeForm
        title={data.title}
        duration={data.duration}
        id={data.id}
        url={data.url}
        videoCallSoftware={data.videoCallSoftware}
        description={data.description}
      />
    </>
  );
}
