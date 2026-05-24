import type {
	GymDayWorkoutCreate,
	GymDayWorkoutUpdate,
} from "#/schemas/gymDayWorkoutSchema";
import { notifySuccess, notifyError } from "#/shared/notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	gymDayWorkoutGetAll,
	gymDayWorkoutGetOne,
	gymDayWorkoutCreate,
	gymDayWorkoutPatch,
	gymDayWorkoutDelete,
} from "../service/gymDayWorkoutService";

export function useGymDayWorkouts(gymDayId: string, limit = 10, offset = 0) {
	return useQuery({
		queryKey: ["gymday-workouts", gymDayId, limit, offset],
		queryFn: () =>
			gymDayWorkoutGetAll(gymDayId, limit, offset).then((r) => r.data),
		enabled: !!gymDayId,
	});
}

export function useGymDayWorkout(gymDayId: string, id: string) {
	return useQuery({
		queryKey: ["gymday-workouts", gymDayId, id],
		queryFn: () => gymDayWorkoutGetOne(gymDayId, id).then((r) => r.data),
		enabled: !!gymDayId && !!id,
	});
}

export function useCreateGymDayWorkout() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({
			gymDayId,
			data,
		}: {
			gymDayId: string;
			data: GymDayWorkoutCreate;
		}) => gymDayWorkoutCreate(gymDayId, data).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["gymday-workouts"] });
			notifySuccess("Workout creado en GymDay");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}

export function useUpdateGymDayWorkout() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({
			gymDayId,
			id,
			data,
		}: {
			gymDayId: string;
			id: string;
			data: GymDayWorkoutUpdate;
		}) => gymDayWorkoutPatch(gymDayId, id, data).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["gymday-workouts"] });
			notifySuccess("Workout actualizado en GymDay");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}

export function useDeleteGymDayWorkout() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ gymDayId, id }: { gymDayId: string; id: string }) =>
			gymDayWorkoutDelete(gymDayId, id).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["gymday-workouts"] });
			notifySuccess("Workout eliminado de GymDay");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}
