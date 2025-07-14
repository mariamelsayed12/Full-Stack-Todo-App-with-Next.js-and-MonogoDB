import { z } from "zod";

export const todoformSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long")
    .max(20, "Title must be at most 20 characters long")
    .trim(),
  body: z
    .string()
    .min(5, "Body must be at least 5 characters long")
    .max(20, "Body must be at most 20 characters long")
    .trim(),
    
  completed: z.boolean(),
});
