import { z } from "zod";

export const excerciceSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(4).max(46),
	sets: z.number().int().min(0),
	reps: z.number().int().min(0),
	weigth: z.string(),
	created: z.string().datetime(),
	updated: z.string().datetime(),
});

export const excerciceCreateSchema = z.object({
	name: z.string().min(4).max(46),
	sets: z.number().int().min(0),
	reps: z.number().int().min(0),
	weigth: z.string(),
});

export const excerciceUpdateSchema = excerciceCreateSchema.partial();

export type Excercice = z.infer<typeof excerciceSchema>;
export type ExcerciceCreate = z.infer<typeof excerciceCreateSchema>;
export type ExcerciceUpdate = z.infer<typeof excerciceUpdateSchema>;
