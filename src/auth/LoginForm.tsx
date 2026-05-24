import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "#/auth/store/useAuthStore";
import { login } from "#/auth/services/authService";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import type { AppError } from "#/shared/mapError";

const loginSchema = z.object({
	userName: z.string().min(1, "Username is required"),
	password: z.string().min(1, "Password is required"),
});

type LoginData = z.infer<typeof loginSchema>;

export function LoginForm() {
	const authenticate = useAuthStore((s) => s.authenticate);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<LoginData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = handleSubmit(async (data) => {
		try {
			const res = await login(data);
			const { accessToken, refreshToken, id, userName, picture } = res.data;
			authenticate({ id, userName, picture }, accessToken, refreshToken);
			navigate({ to: "/dashboard" });
		} catch (err) {
			const appErr = err as AppError;
			setError("root", { message: appErr.message });
		}
	});

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Login to your account</CardTitle>
				<CardDescription>
					Enter your username and password to login
				</CardDescription>
				<CardAction>
					<Link to="/auth/registration">
						<Button variant="link" type="button">
							Sign Up
						</Button>
					</Link>
				</CardAction>
			</CardHeader>
			<form onSubmit={onSubmit}>
				<CardContent>
					<div className="flex flex-col gap-6">
						{errors.root && (
							<p className="text-destructive text-sm">{errors.root.message}</p>
						)}
						<div className="grid gap-2">
							<Label htmlFor="userName">Username</Label>
							<Input
								id="userName"
								placeholder="username"
								{...register("userName")}
							/>
							{errors.userName && (
								<p className="text-destructive text-sm">
									{errors.userName.message}
								</p>
							)}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" {...register("password")} />
							{errors.password && (
								<p className="text-destructive text-sm">
									{errors.password.message}
								</p>
							)}
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex-col gap-2">
					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? "Logging in..." : "Login"}
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}
