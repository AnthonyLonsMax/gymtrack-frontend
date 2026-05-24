import { useState } from "react";
import { WorkoutSelect } from "#/workout";
import { useAuthStore } from "#/auth/store/useAuthStore";
import type { Excercice } from "#/schemas/excerciceSchema";
import { ExcerciceCard } from "./ExcerciceCard";
import { useExcercices, useDeleteExcercice } from "./hooks/useExcercices";

export interface ExcerciceListProps {
	onEdit?: (excercice: Excercice) => void;
	limit?: number;
}

export function ExcerciceList({ onEdit, limit = 10 }: ExcerciceListProps) {
	const user = useAuthStore((s) => s.user);
	const [workoutId, setWorkoutId] = useState("");
	const { data, isLoading, isError, error } = useExcercices(
		user?.id ?? "",
		workoutId,
		limit,
	);
	const deleteMutation = useDeleteExcercice();

	return (
		<div className="space-y-4">
			<WorkoutSelect value={workoutId} onChange={setWorkoutId} />
			{isLoading && (
				<div className="flex justify-center p-8">
					<span className="animate-spin size-6 border-2 border-primary border-t-transparent rounded-full" />
				</div>
			)}
			{isError && (
				<div className="text-destructive p-4">Error: {error.message}</div>
			)}
			{!isLoading && !isError && !data?.content.length && (
				<div className="text-muted-foreground p-4">No hay ejercicios</div>
			)}
			{data && data.content.length > 0 && (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{data.content.map((excercice) => (
						<ExcerciceCard
							key={excercice.id}
							excercice={excercice}
							onEdit={onEdit}
							onDelete={(e) =>
								deleteMutation.mutate({ userId: user?.id, workoutId, id: e.id })
							}
						/>
					))}
				</div>
			)}
		</div>
	);
}
