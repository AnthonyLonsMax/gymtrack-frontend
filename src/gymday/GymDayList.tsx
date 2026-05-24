import { useDeleteGymDay, useGymDays } from "#/gymday/hooks/useGymDays";
import { GymDayCard } from "./GymDayCard";

export interface GymDayListProps {
	limit?: number;
}

export function GymDayList({ limit = 10 }: GymDayListProps) {
	const { data, isLoading, isError, error } = useGymDays(limit);
	const deleteMutation = useDeleteGymDay();

	if (isLoading)
		return (
			<div className="flex justify-center p-8">
				<span className="animate-spin size-6 border-2 border-primary border-t-transparent rounded-full" />
			</div>
		);
	if (isError)
		return <div className="text-destructive p-4">Error: {error.message}</div>;
	if (!data?.content.length)
		return <div className="text-muted-foreground p-4">No hay GymDays</div>;

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{data.content.map((gd) => (
				<GymDayCard
					key={gd.id}
					gymDay={gd}
					onDelete={(g) => deleteMutation.mutate(g.id)}
				/>
			))}
		</div>
	);
}
