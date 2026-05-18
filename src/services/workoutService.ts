import mapError from "#/shared/mapError";
import { axiosInstance } from "#/singletons/axios";
import type {
	Workout,
	WorkoutCreate,
	WorkoutUpdate,
} from "../schemas/workoutSchema";

export async function workoutGetAll(userId: string, limit = 10, offset = 0) {
	return axiosInstance
		.get<{ content: Workout[] }>(
			`/api/users/${userId}/workouts?limit=${limit}&offset=${offset}`,
		)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function workoutGetOne(userId: string, id: string) {
	return axiosInstance
		.get<Workout>(`/api/users/${userId}/workouts/${id}`)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function workoutCreate(userId: string, data: WorkoutCreate) {
	return axiosInstance
		.post<Workout>(`/api/users/${userId}/workouts`, data)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function workoutPatch(
	userId: string,
	id: string,
	data: WorkoutUpdate,
) {
	return axiosInstance
		.patch<Workout>(`/api/users/${userId}/workouts/${id}`, data)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function workoutDelete(userId: string, id: string) {
	return axiosInstance
		.delete<Workout>(`/api/users/${userId}/workouts/${id}`)
		.catch((err) => {
			throw mapError(err);
		});
}
