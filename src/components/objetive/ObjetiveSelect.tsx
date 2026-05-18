import { useAuthStore } from "#/hooks/useAuthStore";
import { useObjetives } from "#/hooks/useObjetives";

export interface ObjetiveSelectProps {
	value?: string;
	onChange?: (objetiveId: string) => void;
}

export function ObjetiveSelect({ value, onChange }: ObjetiveSelectProps) {
	const user = useAuthStore((s) => s.user);
	const { data } = useObjetives(user?.id ?? "", 10_000);

	return (
		<select
			className="h-9 w-full rounded-3xl border border-input bg-background px-3 text-sm"
			value={value}
			onChange={(e) => onChange?.(e.target.value)}
		>
			<option value="">Seleccionar objetivo</option>
			{data?.content.map((o) => (
				<option key={o.id} value={o.id}>
					{o.name}
				</option>
			))}
		</select>
	);
}
