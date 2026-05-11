import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuthStore } from "#/hooks/useAuthStore";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
	return <Navigate to={isLoggedIn ? "/dashboard" : "/auth/login"} />;
}
