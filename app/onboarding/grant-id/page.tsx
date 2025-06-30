"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CalendarCheck2, Loader2 } from "lucide-react";

export default function OnboardingrouteTwo() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleConnect = () => {
    setLoading(true);
    router.push("/api/auth"); // Redirect manually
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center">You're Almost There!</CardTitle>
          <CardDescription>
            To complete your setup, please connect your calendar. This allows you to schedule meetings and manage your availability effortlessly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleConnect}
            disabled={loading}
            className="w-full flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <CalendarCheck2 className="mr-2" />
                Connect Your Calendar
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
