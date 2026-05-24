import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "#/auth/LoginForm";

export const Route = createFileRoute("/auth/login")({
	component: LoginPage,
});

function LoginPage() {
	return <LoginForm />;
}
