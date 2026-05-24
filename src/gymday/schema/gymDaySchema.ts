import { z } from "zod";

export const gymDaySchema = z.object({
	id: z.string().uuid(),
	created: z.string().datetime(),
	updated: z.string().datetime(),
});

export const gymDayCreateSchema = z.object({});

export const gymDayUpdateSchema = z.object({});

export type GymDay = z.infer<typeof gymDaySchema>;
export type GymDayCreate = z.infer<typeof gymDayCreateSchema>;
export type GymDayUpdate = z.infer<typeof gymDayUpdateSchema>;
