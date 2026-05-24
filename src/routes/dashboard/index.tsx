import { useAuthStore } from "#/auth/store/useAuthStore";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
	component: DashboardHome,
});

function DashboardHome() {
	const user = useAuthStore((store) => store.user);
	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
			<img
				src="/exercise-person.jpg"
				alt="Persona haciendo ejercicio"
				className="w-full max-w-sm mx-auto rounded-3xl object-cover shadow-lg"
				style={{
					maxHeight: "50vh",
					filter: "grayscale(100%) contrast(1.15) brightness(0.85)",
				}}
			/>
			<h1 className="text-2xl font-heading font-medium mt-6">
				Bienvenido, {user?.userName}
			</h1>
			<p className="text-muted-foreground mt-2 max-w-md">
				Selecciona una sección del menú lateral para gestionar tus workouts,
				ejercicios y objetivos.
			</p>
		</div>
	);
}
