import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must be atleast 8 characters long"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Enter full name."),
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must be atleast 8 characters "),
});
