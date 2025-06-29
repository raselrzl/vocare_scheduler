import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full text-center space-y-4">
        <CheckCircle className="mx-auto text-green-600 size-12" />
        <h1 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h1>
        <p className="text-gray-600">
          Your meeting has been successfully scheduled. A confirmation email has been sent to your inbox.
        </p>
        <Link
          href="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md mt-4"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
