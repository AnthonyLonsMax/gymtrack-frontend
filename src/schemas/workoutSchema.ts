import { z } from "zod";

export const workoutSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(4).max(64),
	picture: z.string().min(1),
	created: z.string().datetime(),
	updated: z.string().datetime(),
});

export const workoutCreateSchema = z.object({
	name: z.string().min(4).max(64),
	picture: z.string().min(1),
});

export const workoutUpdateSchema = workoutCreateSchema.partial();

export type Workout = z.infer<typeof workoutSchema>;
export type WorkoutCreate = z.infer<typeof workoutCreateSchema>;
export type WorkoutUpdate = z.infer<typeof workoutUpdateSchema>;
