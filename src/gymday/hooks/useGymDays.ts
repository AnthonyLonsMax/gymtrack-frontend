import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { notifyError, notifySuccess } from "#/shared/notification";
import type { GymDayCreate } from "../schema/gymDaySchema";
import { gymDayGetAll, gymDayGetOne, gymDayCreate, gymDayDelete } from "../service/gymDayService";

export function useGymDays(limit = 10, offset = 0) {
	return useQuery({
		queryKey: ["gymdays", limit, offset],
		queryFn: () => gymDayGetAll(limit, offset).then((r) => r.data),
	});
}

export function useGymDay(id: string) {
	return useQuery({
		queryKey: ["gymdays", id],
		queryFn: () => gymDayGetOne(id).then((r) => r.data),
		enabled: !!id,
	});
}

export function useCreateGymDay() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (data: GymDayCreate) => gymDayCreate(data).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["gymdays"] });
			notifySuccess("GymDay creado");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}

export function useDeleteGymDay() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => gymDayDelete(id).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["gymdays"] });
			notifySuccess("GymDay eliminado");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}
