import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { notifyError, notifySuccess } from "#/shared/notification";
import type {
	GymDayWorkoutExcerciceCreate,
	GymDayWorkoutExcerciceUpdate,
} from "#/gymday_workout_excercice/schema/gymDayWorkoutExcerciceSchema";
import {
	gymDayWorkoutExcerciceGetAll,
	gymDayWorkoutExcerciceGetOne,
	gymDayWorkoutExcerciceCreate,
	gymDayWorkoutExcercicePatch,
	gymDayWorkoutExcerciceDelete,
} from "../service/gymDayWorkoutExcerciceService";

export function useGymDayWorkoutExcercices(
	gymDayId: string,
	workoutId: string,
	limit = 10,
	offset = 0,
) {
	return useQuery({
		queryKey: ["gymday-workout-excercices", gymDayId, workoutId, limit, offset],
		queryFn: () =>
			gymDayWorkoutExcerciceGetAll(gymDayId, workoutId, limit, offset).then(
				(r) => r.data,
			),
		enabled: !!gymDayId && !!workoutId,
	});
}

export function useGymDayWorkoutExcercice(
	gymDayId: string,
	workoutId: string,
	id: string,
) {
	return useQuery({
		queryKey: ["gymday-workout-excercices", gymDayId, workoutId, id],
		queryFn: () =>
			gymDayWorkoutExcerciceGetOne(gymDayId, workoutId, id).then((r) => r.data),
		enabled: !!gymDayId && !!workoutId && !!id,
	});
}

export function useCreateGymDayWorkoutExcercice() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({
			gymDayId,
			workoutId,
			data,
		}: {
			gymDayId: string;
			workoutId: string;
			data: GymDayWorkoutExcerciceCreate;
		}) =>
			gymDayWorkoutExcerciceCreate(gymDayId, workoutId, data).then(
				(r) => r.data,
			),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["gymday-workout-excercices"] });
			notifySuccess("Ejercicio creado en GymDay Workout");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}

export function useUpdateGymDayWorkoutExcercice() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({
			gymDayId,
			workoutId,
			id,
			data,
		}: {
			gymDayId: string;
			workoutId: string;
			id: string;
			data: GymDayWorkoutExcerciceUpdate;
		}) =>
			gymDayWorkoutExcercicePatch(gymDayId, workoutId, id, data).then(
				(r) => r.data,
			),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["gymday-workout-excercices"] });
			notifySuccess("Ejercicio actualizado en GymDay Workout");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}

export function useDeleteGymDayWorkoutExcercice() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({
			gymDayId,
			workoutId,
			id,
		}: {
			gymDayId: string;
			workoutId: string;
			id: string;
		}) =>
			gymDayWorkoutExcerciceDelete(gymDayId, workoutId, id).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["gymday-workout-excercices"] });
			notifySuccess("Ejercicio eliminado de GymDay Workout");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}
