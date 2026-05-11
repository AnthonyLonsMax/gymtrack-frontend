import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	userCreate,
	userDelete,
	userGetAll,
	userGetOne,
	userPatch,
} from "#/services/userService";
import { notifyError, notifySuccess } from "#/shared/notification";
import type { UserCreate, UserUpdate } from "../schemas/userSchema";

export function useUsers(limit = 10, offset = 0) {
	return useQuery({
		queryKey: ["users", limit, offset],
		queryFn: () => userGetAll(limit, offset).then((r) => r.data),
	});
}

export function useUser(id: string) {
	return useQuery({
		queryKey: ["users", id],
		queryFn: () => userGetOne(id).then((r) => r.data),
		enabled: !!id,
	});
}

export function useCreateUser() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (data: UserCreate) => userCreate(data).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["users"] });
			notifySuccess("Usuario creado");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}

export function useUpdateUser() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UserUpdate }) =>
			userPatch(id, data).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["users"] });
			notifySuccess("Usuario actualizado");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}

export function useDeleteUser() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => userDelete(id).then((r) => r.data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["users"] });
			notifySuccess("Usuario eliminado");
		},
		onError: (err: Error) => notifyError(err.message),
	});
}
