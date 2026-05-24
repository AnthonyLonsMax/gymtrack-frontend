import mapError from "#/shared/mapError";
import { axiosInstance } from "#/shared/axios";
import type { UserCreate, UserUpdate } from "#/auth/schema/userSchema";
import type { User } from "#/types/auth";

export async function userGetAll(limit = 10, offset = 0) {
	return axiosInstance
		.get<User[]>(`/api/users?limit=${limit}&offset=${offset}`)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function userGetOne(id: string) {
	return axiosInstance.get<User>(`/api/users/${id}`).catch((err) => {
		throw mapError(err);
	});
}

export async function userCreate(data: UserCreate) {
	return axiosInstance.post<User>("/api/users", data).catch((err) => {
		throw mapError(err);
	});
}

export async function userPatch(id: string, data: UserUpdate) {
	return axiosInstance.patch<User>(`/api/users/${id}`, data).catch((err) => {
		throw mapError(err);
	});
}

export async function userDelete(id: string) {
	return axiosInstance.delete<User>(`/api/users/${id}`).catch((err) => {
		throw mapError(err);
	});
}
