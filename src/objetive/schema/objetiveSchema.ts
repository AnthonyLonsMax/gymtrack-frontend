import { z } from "zod";

export const objetiveSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(4).max(64),
	description: z.string().nullable(),
	created: z.string().datetime(),
	updated: z.string().datetime(),
});

export const objetiveCreateSchema = z.object({
	name: z.string().min(4).max(64),
	description: z.string().optional(),
});

export const objetiveUpdateSchema = objetiveCreateSchema.partial();

export type Objetive = z.infer<typeof objetiveSchema>;
export type ObjetiveCreate = z.infer<typeof objetiveCreateSchema>;
export type ObjetiveUpdate = z.infer<typeof objetiveUpdateSchema>;
