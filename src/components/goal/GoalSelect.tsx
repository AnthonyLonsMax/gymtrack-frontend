import { useAuthStore } from "#/hooks/useAuthStore";
import { useGoals } from "#/hooks/useGoals";

export interface GoalSelectProps {
	objetiveId: string;
	value?: string;
	onChange?: (goalId: string) => void;
}

export function GoalSelect({ objetiveId, value, onChange }: GoalSelectProps) {
	const user = useAuthStore((s) => s.user);
	const { data } = useGoals(user?.id ?? "", objetiveId, 10_000);

	return (
		<select
			className="h-9 w-full rounded-3xl border border-input bg-background px-3 text-sm"
			value={value}
			onChange={(e) => onChange?.(e.target.value)}
		>
			<option value="">Seleccionar meta</option>
			{data?.map((g) => (
				<option key={g.id} value={g.id}>
					{g.name}
				</option>
			))}
		</select>
	);
}
