import type { AuthCtx } from "#/types/auth";
import { createContext, type ReactNode } from "react";
import { useAuthStore } from "./store/useAuthStore";

export const DefaultAuthContext: AuthCtx = {
	authenticate() {},
	isLoggedIn: false,
	logout() {},
} as const;

export const AuthContext = createContext<AuthCtx>(DefaultAuthContext);

export function AuthContextProvider({ children }: { children: ReactNode }) {
	const auth = useAuthStore();
	return (
		<AuthContext.Provider
			value={{
				authenticate: auth.authenticate,
				isLoggedIn: auth.isLoggedIn,
				logout: auth.logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
