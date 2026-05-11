import { create } from "zustand";

export interface User {
	id: string;
	userName: string;
	picture: string;
}

interface AuthContext {
	user?: User, 
	isLoggedIn: boolean;
	authenticate: (user: User, accessToken: string, refreshToken: string) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthContext>((set) => ({
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
}));
