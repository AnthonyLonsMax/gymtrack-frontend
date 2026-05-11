import { z } from "zod";

export const userSchema = z.object({
	id: z.string().uuid(),
	user_name: z.string().min(4).max(68),
	picture: z.string().min(2).max(68),
	created: z.string().datetime(),
	updated: z.string().datetime(),
});

export const userCreateSchema = z.object({
	user_name: z.string().min(4).max(68),
	picture: z.string().min(2).max(68),
	password: z.string().min(7).max(128),
});

export const userUpdateSchema = userCreateSchema.partial();

export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
