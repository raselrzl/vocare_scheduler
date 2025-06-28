import { conformZodMessage } from "@conform-to/zod";
import { z } from "zod";

export const onboardingSchema = z.object({
  fullName: z.string().min(3).max(150),
  userName: z
    .string()
    .min(3)
    .max(150)
    .regex(/^[a-zA-Z0-9-]+$/, {
      message: "Username can only contain letters, numbers, and hyphens (-)",
    }),
});

export function onboardingSchemaValidation(options?: {
  isUsernameUnique: () => Promise<boolean>;
}) {
  return z.object({
    userName: z
      .string()
      .min(3)
      .max(150)
      .regex(/^[a-zA-Z0-9-]+$/, {
        message: "Username can only contain letters, numbers, and hyphens (-)",
      })
      .superRefine(async (value, ctx) => {
        if (typeof options?.isUsernameUnique !== "function") {
          ctx.addIssue({
            code: "custom",
            message: "Username uniqueness validator is not defined",
            fatal: true,
          });
          return;
        }

        const isUnique = await options.isUsernameUnique();
        if (!isUnique) {
          ctx.addIssue({
            code: "custom",
            message: "Username is already used, try a new username",
          });
        }
      }),
    fullName: z.string().min(3).max(150),
  });
}


export const settingsSchema = z.object({
  fullName: z.string().min(3).max(150),
  profileImage: z.string()
});


export const createEventTypeSchema = z.object({
  title: z
    .string()
    .min(3)
    .max(100),

  url: z
    .string()
    .min(3)
    .max(200),

  description: z
    .string()
    .max(500),

  duration: z
    .number()
    .min(15)
    .max(60),

  videoCallSoftware: z
    .string()
    .min(3)
});