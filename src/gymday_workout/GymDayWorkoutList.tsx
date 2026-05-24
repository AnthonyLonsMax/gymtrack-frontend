import { useState } from "react";

import type { GymDayWorkout } from "#/gymday_workout/schema/gymDayWorkoutSchema";
import { GymDayWorkoutCard } from "./GymDayWorkoutCard";
import {
	useDeleteGymDayWorkout,
	useGymDayWorkouts,
} from "./hooks/useGymDayWorkouts";

export interface GymDayWorkoutListProps {
	onEdit?: (gymDayWorkout: GymDayWorkout) => void;
	limit?: number;
}

export function GymDayWorkoutList({
	onEdit,
	limit = 10,
}: GymDayWorkoutListProps) {
	const [gymDayId, setGymDayId] = useState("");
	const { data, isLoading, isError, error } = useGymDayWorkouts(
		gymDayId,
		limit,
	);
	const deleteMutation = useDeleteGymDayWorkout();

	return (
		<div className="space-y-4">
			<input
				className="h-9 w-full rounded-3xl border border-input bg-background px-3 text-sm"
				placeholder="GymDay ID"
				value={gymDayId}
				onChange={(e) => setGymDayId(e.target.value)}
			/>
			{isLoading && (
				<div className="flex justify-center p-8">
					<span className="animate-spin size-6 border-2 border-primary border-t-transparent rounded-full" />
				</div>
			)}
			{isError && (
				<div className="text-destructive p-4">Error: {error.message}</div>
			)}
			{!isLoading && !isError && !data?.length && (
				<div className="text-muted-foreground p-4">
					No hay workouts en este GymDay
				</div>
			)}
			{data && data.length > 0 && (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{data.map((w) => (
						<GymDayWorkoutCard
							key={w.id}
							gymDayWorkout={w}
							onEdit={onEdit}
							onDelete={(gw) => deleteMutation.mutate({ gymDayId, id: gw.id })}
						/>
					))}
				</div>
			)}
		</div>
	);
}
