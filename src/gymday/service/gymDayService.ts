import type { GymDay, GymDayCreate } from "#/schemas/gymDaySchema";
import mapError from "#/shared/mapError";
import { axiosInstance } from "#/shared/axios";

export async function gymDayGetAll(limit = 10, offset = 0) {
	return axiosInstance
		.get<{ content: GymDay[] }>(`/api/gymdays?limit=${limit}&offset=${offset}`)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function gymDayGetOne(id: string) {
	return axiosInstance.get<GymDay>(`/api/gymdays/${id}`).catch((err) => {
		throw mapError(err);
	});
}

export async function gymDayCreate(data: GymDayCreate) {
	return axiosInstance.post<GymDay>("/api/gymdays", data).catch((err) => {
		throw mapError(err);
	});
}

export async function gymDayDelete(id: string) {
	return axiosInstance.delete<GymDay>(`/api/gymdays/${id}`).catch((err) => {
		throw mapError(err);
	});
}
