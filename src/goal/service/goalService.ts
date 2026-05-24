import type { Goal, GoalCreate, GoalUpdate } from "#/schemas/goalSchema";
import mapError from "#/shared/mapError";
import { axiosInstance } from "#/shared/axios";

export async function goalGetAll(
	userId: string,
	objetiveId: string,
	limit = 10,
	offset = 0,
) {
	return axiosInstance
		.get<{ content: Goal[] }>(
			`/api/users/${userId}/objetives/${objetiveId}/goals?limit=${limit}&offset=${offset}`,
		)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function goalGetOne(
	userId: string,
	objetiveId: string,
	id: string,
) {
	return axiosInstance
		.get<Goal>(`/api/users/${userId}/objetives/${objetiveId}/goals/${id}`)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function goalCreate(
	userId: string,
	objetiveId: string,
	data: GoalCreate,
) {
	return axiosInstance
		.post<Goal>(`/api/users/${userId}/objetives/${objetiveId}/goals`, data)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function goalPatch(
	userId: string,
	objetiveId: string,
	id: string,
	data: GoalUpdate,
) {
	return axiosInstance
		.patch<Goal>(
			`/api/users/${userId}/objetives/${objetiveId}/goals/${id}`,
			data,
		)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function goalDelete(
	userId: string,
	objetiveId: string,
	id: string,
) {
	return axiosInstance
		.delete<Goal>(`/api/users/${userId}/objetives/${objetiveId}/goals/${id}`)
		.catch((err) => {
			throw mapError(err);
		});
}
