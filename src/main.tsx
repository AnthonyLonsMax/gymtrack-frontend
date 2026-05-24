import { createRouter, RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { useContext } from "react";
import type { AuthCtx } from "./types/auth";
import {
	AuthContext,
	AuthContextProvider,
	DefaultAuthContext,
} from "./auth/AuthProvider";

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	scrollRestoration: true,
	context: {
		auth: undefined!,
	},
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app")!;

const AppProvider = () => {
	const auth = useContext<AuthCtx>(AuthContext);

	return (
		<RouterProvider
			router={router}
			context={{
				auth: auth,
			}}
		/>
	);
};

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<AuthContextProvider>
			<AppProvider />
		</AuthContextProvider>,
	);
}
