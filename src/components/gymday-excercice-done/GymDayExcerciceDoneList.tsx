import { useState } from "react";
import {
	useDeleteGymDayExcerciceDone,
	useGymDayExcercicesDone,
} from "#/hooks/useGymDayExcercicesDone";
import type { GymDayExcerciceDone } from "#/schemas/gymDayExcerciceDoneSchema";
import { GymDayExcerciceDoneCard } from "./GymDayExcerciceDoneCard";

export interface GymDayExcerciceDoneListProps {
	onEdit?: (excercice: GymDayExcerciceDone) => void;
	limit?: number;
}

export function GymDayExcerciceDoneList({
	onEdit,
	limit = 10,
}: GymDayExcerciceDoneListProps) {
	const [gymDayId, setGymDayId] = useState("");
	const { data, isLoading, isError, error } = useGymDayExcercicesDone(
		gymDayId,
		limit,
	);
	const deleteMutation = useDeleteGymDayExcerciceDone();

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
			{!isLoading && !isError && !data?.content.length && (
				<div className="text-muted-foreground p-4">
					No hay ejercicios completados
				</div>
			)}
			{data && data.content.length > 0 && (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{data.content.map((e) => (
						<GymDayExcerciceDoneCard
							key={e.id}
							excercice={e}
							onEdit={onEdit}
							onDelete={(ex) => deleteMutation.mutate({ gymDayId, id: ex.id })}
						/>
					))}
				</div>
			)}
		</div>
	);
}
