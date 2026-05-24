import type {
	ExcerciceCreate,
	ExcerciceUpdate,
} from "#/excercice/schema/excerciceSchema";
import { notifyError, notifySuccess } from "#/shared/notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	excerciceGetAll,
	excerciceGetOne,
	excerciceCreate,
	excercicePatch,
	excerciceDelete,
} from "../services/excercice";

export function useExcercices(
	userId: string,
	workoutId: string,
	limit = 10,
	offset = 0,
) {
	return useQuery({
		queryKey: ["excercices", userId, workoutId, limit, offset],
		queryFn: () =>
			excerciceGetAll(userId, workoutId, limit, offset).then((r) => r.data),
		enabled: !!userId && !!workoutId,
	});
}

export function useExcercice(userId: string, workoutId: string, id: string) {
	return useQuery({
		queryKey: ["excercices", userId, workoutId, id],
		queryFn: () => excerciceGetOne(userId, workoutId, id).then((r) => r.data),
		enabled: !!userId && !!workoutId && !!id,
	});
}

export function useCreateExcercice() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({
			userId,
			workoutId,
			data,
		}: {
			userId: string;
			workoutId: string;
			data: ExcerciceCreate;
		}) => excerciceCreate(userId, workoutId, data).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["excercices"] });
			notifySuccess("Ejercicio creado");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}

export function useUpdateExcercice() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({
			userId,
			workoutId,
			id,
			data,
		}: {
			userId: string;
			workoutId: string;
			id: string;
			data: ExcerciceUpdate;
		}) => excercicePatch(userId, workoutId, id, data).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["excercices"] });
			notifySuccess("Ejercicio actualizado");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}

export function useDeleteExcercice() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({
			userId,
			workoutId,
			id,
		}: {
			userId: string;
			workoutId: string;
			id: string;
		}) => excerciceDelete(userId, workoutId, id).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["excercices"] });
			notifySuccess("Ejercicio eliminado");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}
