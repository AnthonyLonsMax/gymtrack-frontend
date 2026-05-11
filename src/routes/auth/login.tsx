import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "#/components/auth/login";

export const Route = createFileRoute("/auth/login")({
	component: LoginPage,
});

function LoginPage() {
	return <LoginForm />;
}
