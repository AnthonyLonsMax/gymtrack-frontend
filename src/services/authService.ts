import { axiosInstance } from "#/singletons/axios"
import mapError from "#/shared/mapError"

export interface LoginRequest {
  userName: string
  password: string
}

export interface RegisterRequest {
  userName: string
  picture: string
  password: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  id: string
  userName: string
  picture: string
}

export async function login(data: LoginRequest) {
  return axiosInstance.post<AuthResponse>("/api/auth/login", data)
    .catch(err => { throw mapError(err) })
}

export async function register(data: RegisterRequest) {
  return axiosInstance.post<AuthResponse>("/api/auth/register", data)
    .catch(err => { throw mapError(err) })
}

export async function refresh(refreshToken: string) {
  return axiosInstance.post<AuthResponse>("/api/auth/refresh", { refreshToken })
    .catch(err => { throw mapError(err) })
}
