import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
	headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem("access_token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const original = error.config;
		if (error.response?.status === 401 && !original._retry) {
			original._retry = true;
			try {
				const refresh = localStorage.getItem("refresh_token");
				if (!refresh) throw new Error("no refresh token");
				const res = await axios.post(
					`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/auth/refresh`,
					{ refreshToken: refresh },
				);
				localStorage.setItem("access_token", res.data.accessToken);
				original.headers.Authorization = `Bearer ${res.data.access_token}`;
				return axiosInstance(original);
			} catch {
				localStorage.removeItem("access_token");
				localStorage.removeItem("refresh_token");
				window.location.href = "/auth/login";
			}
		}
		return Promise.reject(error);
	},
);
