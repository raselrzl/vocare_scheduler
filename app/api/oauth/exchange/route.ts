import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { nylas, nylasConfig } from "@/app/lib/nylas";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await requireUser();
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return Response.json(
      { error: "No authorization code returned from Nylas" },
      { status: 400 }
    );
  }

  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientSecret: nylasConfig.apiKey,
      clientId: nylasConfig.clientId,
      code,
      redirectUri: nylasConfig.redirectUri,
    });

    const { grantId, email } = response;

    await prisma.user.update({
        where:{
            id: session.user?.id
        },
        data:{
            grantId: grantId,
            grantEmail: email,
        }
    })

  } catch (error) {
    console.error("Error exchanging code for token:", error);

    return Response.json(
      { error: "Failed to exchange code for token" },
      { status: 500 }
    );
  }

  redirect("/dashboard")
}
