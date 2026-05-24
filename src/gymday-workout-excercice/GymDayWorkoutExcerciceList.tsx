import { useState } from "react";

import type { GymDayWorkoutExcercice } from "#/schemas/gymDayWorkoutExcerciceSchema";
import { GymDayWorkoutExcerciceCard } from "./GymDayWorkoutExcerciceCard";
import {
	useDeleteGymDayWorkoutExcercice,
	useGymDayWorkoutExcercices,
} from "./hooks/useGymDayWorkoutExcercices";

export interface GymDayWorkoutExcerciceListProps {
	onEdit?: (excercice: GymDayWorkoutExcercice) => void;
	limit?: number;
}

export function GymDayWorkoutExcerciceList({
	onEdit,
	limit = 10,
}: GymDayWorkoutExcerciceListProps) {
	const [gymDayId, setGymDayId] = useState("");
	const [workoutId, setWorkoutId] = useState("");
	const { data, isLoading, isError, error } = useGymDayWorkoutExcercices(
		gymDayId,
		workoutId,
		limit,
	);
	const deleteMutation = useDeleteGymDayWorkoutExcercice();

	return (
		<div className="space-y-4">
			<input
				className="h-9 w-full rounded-3xl border border-input bg-background px-3 text-sm"
				placeholder="GymDay ID"
				value={gymDayId}
				onChange={(e) => setGymDayId(e.target.value)}
			/>
			<input
				className="h-9 w-full rounded-3xl border border-input bg-background px-3 text-sm"
				placeholder="Workout ID"
				value={workoutId}
				onChange={(e) => setWorkoutId(e.target.value)}
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
				<div className="text-muted-foreground p-4">No hay ejercicios</div>
			)}
			{data && data.length > 0 && (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{data.map((e) => (
						<GymDayWorkoutExcerciceCard
							key={e.id}
							excercice={e}
							onEdit={onEdit}
							onDelete={(ex) =>
								deleteMutation.mutate({ gymDayId, workoutId, id: ex.id })
							}
						/>
					))}
				</div>
			)}
		</div>
	);
}
