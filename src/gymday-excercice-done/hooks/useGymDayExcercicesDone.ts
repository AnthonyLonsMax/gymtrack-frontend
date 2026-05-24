import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { notifyError, notifySuccess } from "#/shared/notification";
import type {
	GymDayExcerciceDoneCreate,
	GymDayExcerciceDoneUpdate,
} from "../../schemas/gymDayExcerciceDoneSchema";
import {
	gymDayExcerciceDoneGetAll,
	gymDayExcerciceDoneGetOne,
	gymDayExcerciceDoneCreate,
	gymDayExcerciceDonePatch,
	gymDayExcerciceDoneDelete,
} from "../service/gymDayExcerciceDoneService";

export function useGymDayExcercicesDone(
	gymDayId: string,
	limit = 10,
	offset = 0,
) {
	return useQuery({
		queryKey: ["gymday-excercices-done", gymDayId, limit, offset],
		queryFn: () =>
			gymDayExcerciceDoneGetAll(gymDayId, limit, offset).then((r) => r.data),
		enabled: !!gymDayId,
	});
}

export function useGymDayExcerciceDone(gymDayId: string, id: string) {
	return useQuery({
		queryKey: ["gymday-excercices-done", gymDayId, id],
		queryFn: () => gymDayExcerciceDoneGetOne(gymDayId, id).then((r) => r.data),
		enabled: !!gymDayId && !!id,
	});
}

export function useCreateGymDayExcerciceDone() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({
			gymDayId,
			data,
		}: {
			gymDayId: string;
			data: GymDayExcerciceDoneCreate;
		}) => gymDayExcerciceDoneCreate(gymDayId, data).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["gymday-excercices-done"] });
			notifySuccess("Ejercicio completado registrado");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}

export function useUpdateGymDayExcerciceDone() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({
			gymDayId,
			id,
			data,
		}: {
			gymDayId: string;
			id: string;
			data: GymDayExcerciceDoneUpdate;
		}) => gymDayExcerciceDonePatch(gymDayId, id, data).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["gymday-excercices-done"] });
			notifySuccess("Ejercicio completado actualizado");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}

export function useDeleteGymDayExcerciceDone() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ gymDayId, id }: { gymDayId: string; id: string }) =>
			gymDayExcerciceDoneDelete(gymDayId, id).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["gymday-excercices-done"] });
			notifySuccess("Ejercicio completado eliminado");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}
