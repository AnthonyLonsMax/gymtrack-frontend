import { useAuthStore } from "#/hooks/useAuthStore";
import { useDeleteObjetive, useObjetives } from "#/hooks/useObjetives";
import type { Objetive } from "#/schemas/objetiveSchema";
import { ObjetiveCard } from "./ObjetiveCard";

export interface ObjetiveListProps {
	onEdit?: (objetive: Objetive) => void;
	limit?: number;
}

export function ObjetiveList({ onEdit, limit = 10 }: ObjetiveListProps) {
	const user = useAuthStore((s) => s.user);
	const { data, isLoading, isError, error } = useObjetives(
		user?.id ?? "",
		limit,
	);
	const deleteMutation = useDeleteObjetive();

	if (isLoading)
		return (
			<div className="flex justify-center p-8">
				<span className="animate-spin size-6 border-2 border-primary border-t-transparent rounded-full" />
			</div>
		);
	if (isError)
		return <div className="text-destructive p-4">Error: {error.message}</div>;
	if (!data?.content.length)
		return <div className="text-muted-foreground p-4">No hay objetivos</div>;

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{data.content.map((objetive) => (
				<ObjetiveCard
					key={objetive.id}
					objetive={objetive}
					onEdit={onEdit}
					onDelete={(o) =>
						deleteMutation.mutate({ userId: user?.id, id: o.id })
					}
				/>
			))}
		</div>
	);
}
