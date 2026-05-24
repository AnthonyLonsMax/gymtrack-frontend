import { useAuthStore } from "#/auth/store/useAuthStore";
import { useWorkouts } from "./hooks/useWorkouts";

export interface WorkoutSelectProps {
	value?: string;
	onChange?: (workoutId: string) => void;
}

export function WorkoutSelect({ value, onChange }: WorkoutSelectProps) {
	const user = useAuthStore((s) => s.user);
	const { data } = useWorkouts(user?.id ?? "", 10_000);

	return (
		<select
			className="h-9 w-full rounded-3xl border border-input bg-background px-3 text-sm"
			value={value}
			onChange={(e) => onChange?.(e.target.value)}
		>
			<option value="">Seleccionar workout</option>
			{data?.content.map((w) => (
				<option key={w.id} value={w.id}>
					{w.name}
				</option>
			))}
		</select>
	);
}
