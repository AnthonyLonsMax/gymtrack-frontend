import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	workoutCreate,
	workoutDelete,
	workoutGetAll,
	workoutGetOne,
	workoutPatch,
} from "#/services/workoutService";
import { notifyError, notifySuccess } from "#/shared/notification";
import type { WorkoutCreate, WorkoutUpdate } from "../schemas/workoutSchema";

export function useWorkouts(userId: string, limit = 10, offset = 0) {
	return useQuery({
		queryKey: ["workouts", userId, limit, offset],
		queryFn: () => workoutGetAll(userId, limit, offset).then((r) => r.data),
		enabled: !!userId,
	});
}

export function useWorkout(userId: string, id: string) {
	return useQuery({
		queryKey: ["workouts", userId, id],
		queryFn: () => workoutGetOne(userId, id).then((r) => r.data),
		enabled: !!userId && !!id,
	});
}

export function useCreateWorkout() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ userId, data }: { userId: string; data: WorkoutCreate }) =>
			workoutCreate(userId, data).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["workouts"] });
			notifySuccess("Workout creado");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}

export function useUpdateWorkout() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({
			userId,
			id,
			data,
		}: {
			userId: string;
			id: string;
			data: WorkoutUpdate;
		}) => workoutPatch(userId, id, data).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["workouts"] });
			notifySuccess("Workout actualizado");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}

export function useDeleteWorkout() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ userId, id }: { userId: string; id: string }) =>
			workoutDelete(userId, id).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["workouts"] });
			notifySuccess("Workout eliminado");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}
