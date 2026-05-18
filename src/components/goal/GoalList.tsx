import { useState } from "react";
import { ObjetiveSelect } from "#/components/objetive/ObjetiveSelect";
import { useAuthStore } from "#/hooks/useAuthStore";
import { useDeleteGoal, useGoals } from "#/hooks/useGoals";
import type { Goal } from "#/schemas/goalSchema";
import { GoalCard } from "./GoalCard";

export interface GoalListProps {
	onEdit?: (goal: Goal) => void;
	limit?: number;
}

export function GoalList({ onEdit, limit = 10 }: GoalListProps) {
	const user = useAuthStore((s) => s.user);
	const [objetiveId, setObjetiveId] = useState("");
	const { data, isLoading, isError, error } = useGoals(
		user?.id ?? "",
		objetiveId,
		limit,
	);
	const deleteMutation = useDeleteGoal();

	return (
		<div className="space-y-4">
			<ObjetiveSelect value={objetiveId} onChange={setObjetiveId} />
			{isLoading && (
				<div className="flex justify-center p-8">
					<span className="animate-spin size-6 border-2 border-primary border-t-transparent rounded-full" />
				</div>
			)}
			{isError && (
				<div className="text-destructive p-4">Error: {error.message}</div>
			)}
			{!isLoading && !isError && !data?.content.length && (
				<div className="text-muted-foreground p-4">No hay metas</div>
			)}
			{data && data.content.length > 0 && (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{data.content.map((goal) => (
						<GoalCard
							key={goal.id}
							goal={goal}
							onEdit={onEdit}
							onDelete={(g) =>
								deleteMutation.mutate({
									userId: user?.id,
									objetiveId,
									id: g.id,
								})
							}
						/>
					))}
				</div>
			)}
		</div>
	);
}
