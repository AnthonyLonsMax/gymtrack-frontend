import { useUsers } from "./hooks/useUsers";

export interface UserSelectProps {
	value?: string;
	onChange?: (userId: string) => void;
}

export function UserSelect({ value, onChange }: UserSelectProps) {
	const { data } = useUsers(10_000);

	return (
		<select
			className="h-9 w-full rounded-3xl border border-input bg-background px-3 text-sm"
			value={value}
			onChange={(e) => onChange?.(e.target.value)}
		>
			<option value="">Seleccionar usuario</option>
			{data?.map((u) => (
				<option key={u.id} value={u.id}>
					{u.user_name}
				</option>
			))}
		</select>
	);
}
