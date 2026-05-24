import { Pencil, Trash2 } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import type { Workout } from "#/schemas/workoutSchema";

export interface WorkoutCardProps {
	workout: Workout;
	onEdit?: (workout: Workout) => void;
	onDelete?: (workout: Workout) => void;
}

export function WorkoutCard({ workout, onEdit, onDelete }: WorkoutCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{workout.name}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground">{workout.picture}</p>
			</CardContent>
			<div className="flex gap-2 px-6 pb-4">
				{onEdit && (
					<Button variant="outline" size="sm" onClick={() => onEdit(workout)}>
						<Pencil className="size-4" />
					</Button>
				)}
				{onDelete && (
					<Button
						variant="destructive"
						size="sm"
						onClick={() => onDelete(workout)}
					>
						<Trash2 className="size-4" />
					</Button>
				)}
			</div>
		</Card>
	);
}
