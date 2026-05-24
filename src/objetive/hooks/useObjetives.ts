import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { notifyError, notifySuccess } from "#/shared/notification";
import type {
	ObjetiveCreate,
	ObjetiveUpdate,
} from "#/objetive/schema/objetiveSchema";
import {
	objetiveGetAll,
	objetiveGetOne,
	objetiveCreate,
	objetivePatch,
	objetiveDelete,
} from "../service/objetiveService";

export function useObjetives(userId: string, limit = 10, offset = 0) {
	return useQuery({
		queryKey: ["objetives", userId, limit, offset],
		queryFn: () => objetiveGetAll(userId, limit, offset).then((r) => r.data),
		enabled: !!userId,
	});
}

export function useObjetive(userId: string, id: string) {
	return useQuery({
		queryKey: ["objetives", userId, id],
		queryFn: () => objetiveGetOne(userId, id).then((r) => r.data),
		enabled: !!userId && !!id,
	});
}

export function useCreateObjetive() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ userId, data }: { userId: string; data: ObjetiveCreate }) =>
			objetiveCreate(userId, data).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["objetives"] });
			notifySuccess("Objetivo creado");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}

export function useUpdateObjetive() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({
			userId,
			id,
			data,
		}: {
			userId: string;
			id: string;
			data: ObjetiveUpdate;
		}) => objetivePatch(userId, id, data).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["objetives"] });
			notifySuccess("Objetivo actualizado");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}

export function useDeleteObjetive() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ userId, id }: { userId: string; id: string }) =>
			objetiveDelete(userId, id).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["objetives"] });
			notifySuccess("Objetivo eliminado");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}
