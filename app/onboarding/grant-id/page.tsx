import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CalendarCheck2 } from "lucide-react";
import Link from "next/link";

export default function OnboardingrouteTwo() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>You are Almost done</CardTitle>
          <CardDescription>
            We have to connect your calendar to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">
            <CalendarCheck2/> <Link href="/api/auth">Connect Calendar to your account</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
