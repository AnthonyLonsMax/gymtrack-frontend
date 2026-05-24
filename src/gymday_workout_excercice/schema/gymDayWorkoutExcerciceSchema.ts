import { z } from "zod";

export const gymDayWorkoutExcerciceSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(4).max(46),
	sets: z.number().int().min(0),
	reps: z.number().int().min(0),
	weigth: z.string().nullable(),
	created: z.string().datetime(),
	updated: z.string().datetime(),
});

export const gymDayWorkoutExcerciceCreateSchema = z.object({
	name: z.string().min(4).max(46),
	sets: z.number().int().min(0),
	reps: z.number().int().min(0),
	weigth: z.string().optional(),
});

export const gymDayWorkoutExcerciceUpdateSchema =
	gymDayWorkoutExcerciceCreateSchema.partial();

export type GymDayWorkoutExcercice = z.infer<
	typeof gymDayWorkoutExcerciceSchema
>;
export type GymDayWorkoutExcerciceCreate = z.infer<
	typeof gymDayWorkoutExcerciceCreateSchema
>;
export type GymDayWorkoutExcerciceUpdate = z.infer<
	typeof gymDayWorkoutExcerciceUpdateSchema
>;
