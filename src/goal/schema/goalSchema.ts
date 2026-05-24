import { z } from "zod";

export const goalSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(4).max(64),
	description: z.string().nullable(),
	done: z.boolean(),
	created: z.string().datetime(),
	updated: z.string().datetime(),
});

export const goalCreateSchema = z.object({
	name: z.string().min(4).max(64),
	description: z.string().optional(),
	done: z.boolean(),
});

export const goalUpdateSchema = goalCreateSchema.partial();

export type Goal = z.infer<typeof goalSchema>;
export type GoalCreate = z.infer<typeof goalCreateSchema>;
export type GoalUpdate = z.infer<typeof goalUpdateSchema>;
