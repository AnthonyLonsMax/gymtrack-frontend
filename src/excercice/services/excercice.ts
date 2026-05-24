import type {
	Excercice,
	ExcerciceCreate,
	ExcerciceUpdate,
} from "#/excercice/schema/excerciceSchema";
import mapError from "#/shared/mapError";
import { axiosInstance } from "#/shared/axios";

export async function excerciceGetAll(
	userId: string,
	workoutId: string,
	limit = 10,
	offset = 0,
) {
	return axiosInstance
		.get<{ content: Excercice[] }>(
			`/api/users/${userId}/workouts/${workoutId}/excercices?limit=${limit}&offset=${offset}`,
		)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function excerciceGetOne(
	userId: string,
	workoutId: string,
	id: string,
) {
	return axiosInstance
		.get<Excercice>(
			`/api/users/${userId}/workouts/${workoutId}/excercices/${id}`,
		)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function excerciceCreate(
	userId: string,
	workoutId: string,
	data: ExcerciceCreate,
) {
	return axiosInstance
		.post<Excercice>(
			`/api/users/${userId}/workouts/${workoutId}/excercices`,
			data,
		)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function excercicePatch(
	userId: string,
	workoutId: string,
	id: string,
	data: ExcerciceUpdate,
) {
	return axiosInstance
		.patch<Excercice>(
			`/api/users/${userId}/workouts/${workoutId}/excercices/${id}`,
			data,
		)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function excerciceDelete(
	userId: string,
	workoutId: string,
	id: string,
) {
	return axiosInstance
		.delete<Excercice>(
			`/api/users/${userId}/workouts/${workoutId}/excercices/${id}`,
		)
		.catch((err) => {
			throw mapError(err);
		});
}
