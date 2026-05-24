import type {
	GymDayWorkoutExcercice,
	GymDayWorkoutExcerciceCreate,
	GymDayWorkoutExcerciceUpdate,
} from "#/gymday_workout_excercice/schema/gymDayWorkoutExcerciceSchema";
import mapError from "#/shared/mapError";
import { axiosInstance } from "#/shared/axios";

export async function gymDayWorkoutExcerciceGetAll(
	gymDayId: string,
	workoutId: string,
	limit = 10,
	offset = 0,
) {
	return axiosInstance
		.get<{ content: GymDayWorkoutExcercice[] }>(
			`/api/gymdays/${gymDayId}/workouts/${workoutId}/excercices?limit=${limit}&offset=${offset}`,
		)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function gymDayWorkoutExcerciceGetOne(
	gymDayId: string,
	workoutId: string,
	id: string,
) {
	return axiosInstance
		.get<GymDayWorkoutExcercice>(
			`/api/gymdays/${gymDayId}/workouts/${workoutId}/excercices/${id}`,
		)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function gymDayWorkoutExcerciceCreate(
	gymDayId: string,
	workoutId: string,
	data: GymDayWorkoutExcerciceCreate,
) {
	return axiosInstance
		.post<GymDayWorkoutExcercice>(
			`/api/gymdays/${gymDayId}/workouts/${workoutId}/excercices`,
			data,
		)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function gymDayWorkoutExcercicePatch(
	gymDayId: string,
	workoutId: string,
	id: string,
	data: GymDayWorkoutExcerciceUpdate,
) {
	return axiosInstance
		.patch<GymDayWorkoutExcercice>(
			`/api/gymdays/${gymDayId}/workouts/${workoutId}/excercices/${id}`,
			data,
		)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function gymDayWorkoutExcerciceDelete(
	gymDayId: string,
	workoutId: string,
	id: string,
) {
	return axiosInstance
		.delete<GymDayWorkoutExcercice>(
			`/api/gymdays/${gymDayId}/workouts/${workoutId}/excercices/${id}`,
		)
		.catch((err) => {
			throw mapError(err);
		});
}
