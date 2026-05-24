import { Pencil, Trash2 } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import type { GymDayWorkout } from "#/gymday_workout/schema/gymDayWorkoutSchema";

export interface GymDayWorkoutCardProps {
	gymDayWorkout: GymDayWorkout;
	onEdit?: (gymDayWorkout: GymDayWorkout) => void;
	onDelete?: (gymDayWorkout: GymDayWorkout) => void;
}

export function GymDayWorkoutCard({
	gymDayWorkout,
	onEdit,
	onDelete,
}: GymDayWorkoutCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{gymDayWorkout.name}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground">
					Creado: {new Date(gymDayWorkout.created).toLocaleDateString()}
				</p>
			</CardContent>
			<div className="flex gap-2 px-6 pb-4">
				{onEdit && (
					<Button
						variant="outline"
						size="sm"
						onClick={() => onEdit(gymDayWorkout)}
					>
						<Pencil className="size-4" />
					</Button>
				)}
				{onDelete && (
					<Button
						variant="destructive"
						size="sm"
						onClick={() => onDelete(gymDayWorkout)}
					>
						<Trash2 className="size-4" />
					</Button>
				)}
			</div>
		</Card>
	);
}
