import mapError from "#/shared/mapError";
import { axiosInstance } from "#/singletons/axios";
import type {
	Objetive,
	ObjetiveCreate,
	ObjetiveUpdate,
} from "../schemas/objetiveSchema";

export async function objetiveGetAll(userId: string, limit = 10, offset = 0) {
	return axiosInstance
		.get<{ content: Objetive[] }>(
			`/api/users/${userId}/objetives?limit=${limit}&offset=${offset}`,
		)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function objetiveGetOne(userId: string, id: string) {
	return axiosInstance
		.get<Objetive>(`/api/users/${userId}/objetives/${id}`)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function objetiveCreate(userId: string, data: ObjetiveCreate) {
	return axiosInstance
		.post<Objetive>(`/api/users/${userId}/objetives`, data)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function objetivePatch(
	userId: string,
	id: string,
	data: ObjetiveUpdate,
) {
	return axiosInstance
		.patch<Objetive>(`/api/users/${userId}/objetives/${id}`, data)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function objetiveDelete(userId: string, id: string) {
	return axiosInstance
		.delete<Objetive>(`/api/users/${userId}/objetives/${id}`)
		.catch((err) => {
			throw mapError(err);
		});
}
