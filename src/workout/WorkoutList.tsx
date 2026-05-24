import { useAuthStore } from "#/auth/store/useAuthStore";
import type { Workout } from "#/workout/schema/workoutSchema";
import { useWorkouts, useDeleteWorkout } from "./hooks/useWorkouts";
import { WorkoutCard } from "./WorkoutCard";

export type WorkoutListProps = {
	onEdit?: (workout: Workout) => void;
	limit?: number;
};

export function WorkoutList({ onEdit, limit = 10 }: WorkoutListProps) {
	const user = useAuthStore((s) => s.user);
	const { data, isLoading, isError, error } = useWorkouts(
		user?.id ?? "",
		limit,
	);
	const deleteMutation = useDeleteWorkout();

	if (isLoading)
		return (
			<div className="flex justify-center p-8">
				<span className="animate-spin size-6 border-2 border-primary border-t-transparent rounded-full" />
			</div>
		);
	if (isError)
		return <div className="text-destructive p-4">Error: {error.message}</div>;
	if (!data?.content.length)
		return <div className="text-muted-foreground p-4">No hay workouts</div>;

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{data.content.map((workout) => (
				<WorkoutCard
					key={workout.id}
					workout={workout}
					onEdit={onEdit}
					onDelete={(w) =>
						deleteMutation.mutate({ userId: user?.id, id: w.id })
					}
				/>
			))}
		</div>
	);
}
