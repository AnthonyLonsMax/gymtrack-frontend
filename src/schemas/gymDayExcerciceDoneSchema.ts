import { z } from "zod";

export const gymDayExcerciceDoneSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(4).max(46),
	sets: z.number().int().min(0),
	reps: z.number().int().min(0),
	weigth: z.string().nullable(),
	created: z.string().datetime(),
	updated: z.string().datetime(),
});

export const gymDayExcerciceDoneCreateSchema = z.object({
	name: z.string().min(4).max(46),
	sets: z.number().int().min(0),
	reps: z.number().int().min(0),
	weigth: z.string().optional(),
});

export const gymDayExcerciceDoneUpdateSchema =
	gymDayExcerciceDoneCreateSchema.partial();

export type GymDayExcerciceDone = z.infer<typeof gymDayExcerciceDoneSchema>;
export type GymDayExcerciceDoneCreate = z.infer<
	typeof gymDayExcerciceDoneCreateSchema
>;
export type GymDayExcerciceDoneUpdate = z.infer<
	typeof gymDayExcerciceDoneUpdateSchema
>;
