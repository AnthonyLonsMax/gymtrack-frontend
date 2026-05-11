import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	goalCreate,
	goalDelete,
	goalGetAll,
	goalGetOne,
	goalPatch,
} from "#/services/goalService";
import { notifyError, notifySuccess } from "#/shared/notification";
import type { GoalCreate, GoalUpdate } from "../schemas/goalSchema";

export function useGoals(
	userId: string,
	objetiveId: string,
	limit = 10,
	offset = 0,
) {
	return useQuery({
		queryKey: ["goals", userId, objetiveId, limit, offset],
		queryFn: () =>
			goalGetAll(userId, objetiveId, limit, offset).then((r) => r.data),
		enabled: !!userId && !!objetiveId,
	});
}

export function useGoal(userId: string, objetiveId: string, id: string) {
	return useQuery({
		queryKey: ["goals", userId, objetiveId, id],
		queryFn: () => goalGetOne(userId, objetiveId, id).then((r) => r.data),
		enabled: !!userId && !!objetiveId && !!id,
	});
}

export function useCreateGoal() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({
			userId,
			objetiveId,
			data,
		}: {
			userId: string;
			objetiveId: string;
			data: GoalCreate;
		}) => goalCreate(userId, objetiveId, data).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["goals"] });
			notifySuccess("Meta creada");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}

export function useUpdateGoal() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({
			userId,
			objetiveId,
			id,
			data,
		}: {
			userId: string;
			objetiveId: string;
			id: string;
			data: GoalUpdate;
		}) => goalPatch(userId, objetiveId, id, data).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["goals"] });
			notifySuccess("Meta actualizada");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}

export function useDeleteGoal() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({
			userId,
			objetiveId,
			id,
		}: {
			userId: string;
			objetiveId: string;
			id: string;
		}) => goalDelete(userId, objetiveId, id).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["goals"] });
			notifySuccess("Meta eliminada");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}
