import type {
	GymDayWorkout,
	GymDayWorkoutCreate,
	GymDayWorkoutUpdate,
} from "#/schemas/gymDayWorkoutSchema";
import mapError from "#/shared/mapError";
import { axiosInstance } from "#/shared/axios";

export async function gymDayWorkoutGetAll(
	gymDayId: string,
	limit = 10,
	offset = 0,
) {
	return axiosInstance
		.get<GymDayWorkout[]>(
			`/api/gymdays/${gymDayId}/workouts?limit=${limit}&offset=${offset}`,
		)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function gymDayWorkoutGetOne(gymDayId: string, id: string) {
	return axiosInstance
		.get<GymDayWorkout>(`/api/gymdays/${gymDayId}/workouts/${id}`)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function gymDayWorkoutCreate(
	gymDayId: string,
	data: GymDayWorkoutCreate,
) {
	return axiosInstance
		.post<GymDayWorkout>(`/api/gymdays/${gymDayId}/workouts`, data)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function gymDayWorkoutPatch(
	gymDayId: string,
	id: string,
	data: GymDayWorkoutUpdate,
) {
	return axiosInstance
		.patch<GymDayWorkout>(`/api/gymdays/${gymDayId}/workouts/${id}`, data)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function gymDayWorkoutDelete(gymDayId: string, id: string) {
	return axiosInstance
		.delete<GymDayWorkout>(`/api/gymdays/${gymDayId}/workouts/${id}`)
		.catch((err) => {
			throw mapError(err);
		});
}
