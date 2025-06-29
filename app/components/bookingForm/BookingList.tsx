"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Link2, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface Booking {
  id: string;
  title: string;
  htmlLink: string;
  calendarId: string;
  status: string;
  description?: string;
  when: {
    startTime: number;
    endTime: number;
  };
}

export default function BookingsList({ bookings }: { bookings: Booking[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((booking) => (
        <Card key={booking.id} className="rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold line-clamp-1">
                {booking.title}
              </h2>
              <CalendarCheck className="text-green-500 size-5" />
            </div>
            {booking.description && (
              <p className="text-muted-foreground text-sm line-clamp-2">
                {booking.description}
              </p>
            )}
            <div className="text-sm space-y-2">
              <p className="flex items-center gap-2">
                <Calendar className="size-4 text-primary" />
                {format(new Date(booking.when.startTime * 1000), "PPP")}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="size-4 text-primary" />
                {format(new Date(booking.when.startTime * 1000), "p")} - {format(new Date(booking.when.endTime * 1000), "p")}
              </p>
              <p className="flex items-center gap-2">
                <Link2 className="size-4 text-primary" />
                <Link
                  href={booking.htmlLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline line-clamp-1"
                >
                  View in Calendar
                </Link>
              </p>
            </div>
            <div className="pt-2">
              <Button asChild className="w-full text-sm">
                <Link href={`/dashboard/meetings/${booking.id}`}>Manage</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
