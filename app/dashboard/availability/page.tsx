import { updateAvailabilityAction } from "@/app/action";
import { SubmitButton } from "@/app/components/SubmitButton";
import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { times } from "@/app/lib/times";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { notFound } from "next/navigation";

async function getData(userId: string) {
  const data = await prisma.availability.findMany({
    where: {
      userId: userId,
    },
  });
  if (!data || data.length === 0) {
    notFound();
  }
  return data;
}

export default async function AvailabilityPage() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>
          Manage your weekly availability and working hours.
        </CardDescription>
      </CardHeader>

      <form action={updateAvailabilityAction}>
        <CardContent className="space-y-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 rounded-md border bg-muted/30"
            >
              <input type="hidden" name={`id-${item.id}`} value={item.id}/>
              {/* Column 1: Switch and Day */}
              <div className="flex items-center gap-2">
                <Switch defaultChecked={item.isActive} name={`isActive-${item.id}`}/>
                <p className="text-base font-medium">{item.day}</p>
              </div>

              {/* Column 2: From time */}
              <Select defaultValue={item.fromTime} name={`fromTime-${item.id}`}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="From time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {times.map((t) => (
                      <SelectItem key={t.id} value={t.time}>
                        {t.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Column 3: Till time */}
              <Select defaultValue={item.tillTime} name={`tillTime-${item.id}`}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Till time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {times.map((t) => (
                      <SelectItem key={t.id} value={t.time}>
                        {t.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </CardContent>
        <CardFooter className="mt-4">
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );
}
