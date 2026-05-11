import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import type { Goal } from "#/schemas/goalSchema";

export interface GoalCardProps {
	goal: Goal;
	onEdit?: (goal: Goal) => void;
	onDelete?: (goal: Goal) => void;
}

export function GoalCard({ goal, onEdit, onDelete }: GoalCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					{goal.done ? (
						<CheckCircle2 className="size-4 text-green-500" />
					) : (
						<Circle className="size-4 text-muted-foreground" />
					)}
					{goal.name}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground">
					{goal.description || "Sin descripción"}
				</p>
			</CardContent>
			<div className="flex gap-2 px-6 pb-4">
				{onEdit && (
					<Button variant="outline" size="sm" onClick={() => onEdit(goal)}>
						<Pencil className="size-4" />
					</Button>
				)}
				{onDelete && (
					<Button
						variant="destructive"
						size="sm"
						onClick={() => onDelete(goal)}
					>
						<Trash2 className="size-4" />
					</Button>
				)}
			</div>
		</Card>
	);
}
