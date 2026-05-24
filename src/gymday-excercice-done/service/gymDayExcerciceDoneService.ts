import type {
	GymDayExcerciceDone,
	GymDayExcerciceDoneCreate,
	GymDayExcerciceDoneUpdate,
} from "#/schemas/gymDayExcerciceDoneSchema";
import mapError from "#/shared/mapError";
import { axiosInstance } from "#/shared/axios";

export async function gymDayExcerciceDoneGetAll(
	gymDayId: string,
	limit = 10,
	offset = 0,
) {
	return axiosInstance
		.get<{ content: GymDayExcerciceDone[] }>(
			`/api/gymdays/${gymDayId}/excercices-done?limit=${limit}&offset=${offset}`,
		)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function gymDayExcerciceDoneGetOne(gymDayId: string, id: string) {
	return axiosInstance
		.get<GymDayExcerciceDone>(`/api/gymdays/${gymDayId}/excercices-done/${id}`)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function gymDayExcerciceDoneCreate(
	gymDayId: string,
	data: GymDayExcerciceDoneCreate,
) {
	return axiosInstance
		.post<GymDayExcerciceDone>(`/api/gymdays/${gymDayId}/excercices-done`, data)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function gymDayExcerciceDonePatch(
	gymDayId: string,
	id: string,
	data: GymDayExcerciceDoneUpdate,
) {
	return axiosInstance
		.patch<GymDayExcerciceDone>(
			`/api/gymdays/${gymDayId}/excercices-done/${id}`,
			data,
		)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function gymDayExcerciceDoneDelete(gymDayId: string, id: string) {
	return axiosInstance
		.delete<GymDayExcerciceDone>(
			`/api/gymdays/${gymDayId}/excercices-done/${id}`,
		)
		.catch((err) => {
			throw mapError(err);
		});
}
