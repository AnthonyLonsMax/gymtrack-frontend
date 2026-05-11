import {
	createFileRoute,
	Link,
	Outlet,
	useLocation,
	useNavigate,
} from "@tanstack/react-router";
import {
	Calendar,
	Dumbbell,
	LogOut,
	Target,
	Trophy,
} from "lucide-react";
import { Button } from "#/components/ui/button";
import { useAuthStore } from "#/hooks/useAuthStore";

export const Route = createFileRoute("/dashboard")({
	component: DashboardLayout,
});

const navItems = [
	{ to: "/dashboard", label: "Dashboard", icon: Calendar },
	{ to: "/dashboard/workouts", label: "Workouts", icon: Dumbbell },
	{ to: "/dashboard/excercices", label: "Ejercicios", icon: Dumbbell },
	{ to: "/dashboard/objetives", label: "Objetivos", icon: Target },
	{ to: "/dashboard/goals", label: "Metas", icon: Trophy },
	{ to: "/dashboard/gymdays", label: "GymDays", icon: Calendar },
];

function DashboardLayout() {
	const user = useAuthStore((s) => s.user);
	const logout = useAuthStore((s) => s.logout);
	const location = useLocation();
	const navigate = useNavigate()

	return (
		<div className="flex min-h-screen">
			<aside className="w-64 border-r bg-sidebar p-4 flex flex-col gap-2">
				<div className="font-heading text-lg font-medium mb-4 px-2">
					GymTrack
				</div>
				<nav className="flex flex-col gap-1 flex-1">
					{navItems.map((item) => (
						<Link
							key={item.to}
							to={item.to}
							className={`flex items-center gap-3 rounded-3xl px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${location.pathname === item.to ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}`}
						>
							<item.icon className="size-4" />
							{item.label}
						</Link>
					))}
				</nav>
				<div className="border-t pt-4">
					<div className="flex items-center gap-2 px-2 mb-2">
						<div className="size-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
							{user?.userName?.charAt(0).toUpperCase()}
						</div>
						<span className="text-sm">{user?.userName}</span>
					</div>
					<Button
						variant="ghost"
						size="sm"
						className="w-full justify-start gap-2"
						onClick={() => {
							logout();
							navigate({ to: '/' })
						}}
					>
						<LogOut className="size-4" />
						Cerrar sesión
					</Button>
				</div>
			</aside>
			<main className="flex-1 p-6">
				<Outlet />
			</main>
		</div>
	);
}
