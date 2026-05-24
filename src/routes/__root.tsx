import { QueryClientProvider } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { queryClient } from "#/shared/queryClient";

import "../styles.css";
import type { AuthCtx } from "#/types/auth";

export const Route = createRootRouteWithContext<{ auth: AuthCtx }>()({
	component: RootComponent,
});

function RootComponent() {
	return (
		<QueryClientProvider client={queryClient}>
			<Outlet />
			<Toaster richColors />
		</QueryClientProvider>
	);
}
