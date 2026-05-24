import { z } from "zod";

export const gymDayWorkoutSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1).max(64),
	created: z.string().datetime(),
	updated: z.string().datetime(),
});

export const gymDayWorkoutCreateSchema = z.object({
	name: z.string().min(1).max(64),
});

export const gymDayWorkoutUpdateSchema = gymDayWorkoutCreateSchema.partial();

export type GymDayWorkout = z.infer<typeof gymDayWorkoutSchema>;
export type GymDayWorkoutCreate = z.infer<typeof gymDayWorkoutCreateSchema>;
export type GymDayWorkoutUpdate = z.infer<typeof gymDayWorkoutUpdateSchema>;
