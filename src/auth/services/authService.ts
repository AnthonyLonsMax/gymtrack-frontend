import { axiosInstance } from "#/shared/axios";
import mapError from "#/shared/mapError";
import type { AuthResponse, LoginRequest, RegisterRequest } from "#/types/auth";

export async function login(data: LoginRequest) {
	return axiosInstance
		.post<AuthResponse>("/api/auth/login", data)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function register(data: RegisterRequest) {
	return axiosInstance
		.post<AuthResponse>("/api/auth/register", data)
		.catch((err) => {
			throw mapError(err);
		});
}

export async function refresh(refreshToken: string) {
	return axiosInstance
		.post<AuthResponse>("/api/auth/refresh", { refreshToken })
		.catch((err) => {
			throw mapError(err);
		});
}
