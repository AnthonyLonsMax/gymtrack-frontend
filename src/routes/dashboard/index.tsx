import { useAuthStore } from "#/hooks/useAuthStore";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
	component: DashboardHome,
});

function DashboardHome() {
	const user = useAuthStore(store => store.user)
	return (
		<div>
			<h1 className="text-2xl font-heading font-medium mb-4">Dashboard</h1>
			<p className="text-muted-foreground">
				Bienvenido a GymTrack {user?.userName}. Selecciona una sección del menú lateral.
			</p>
		</div>
	);
}
