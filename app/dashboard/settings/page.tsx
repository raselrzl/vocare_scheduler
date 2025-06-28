import SettingForm from "@/app/components/SettingsForm";
import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { notFound } from "next/navigation";

async function getData(id: string): Promise<{
  name: string | null;
  email: string | null;
  image: string | null;
}> {
  const data = await prisma.user.findUnique({
    where: { id },
    select: {
      name: true,
      email: true,
      image: true,
    },
  });

  if (!data) {
    notFound(); 
  }

  return data;
}

export default async function SettingPage() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <SettingForm
      email={data.email ?? ""}
      fullName={data.name ?? ""}
      profileImage={data.image ?? ""}
    />
  );
}
