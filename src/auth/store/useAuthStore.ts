import type { AuthCtx } from "#/types/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create<AuthCtx>()(
	persist(
		(set) => ({
			user: undefined,
			isLoggedIn: false,
			authenticate: (user, accessToken, refreshToken) => {
				localStorage.setItem("access_token", accessToken);
				localStorage.setItem("refresh_token", refreshToken);
				set({ user, isLoggedIn: true });
			},
			logout: () => {
				localStorage.removeItem("access_token");
				localStorage.removeItem("refresh_token");
				set({ user: undefined, isLoggedIn: false });
			},
		}),
		{ name: "auth-storage" },
	),
);
