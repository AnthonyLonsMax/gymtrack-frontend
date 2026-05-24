import { Pencil, Trash2 } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import type { GymDayWorkoutExcercice } from "#/schemas/gymDayWorkoutExcerciceSchema";

export interface GymDayWorkoutExcerciceCardProps {
	excercice: GymDayWorkoutExcercice;
	onEdit?: (excercice: GymDayWorkoutExcercice) => void;
	onDelete?: (excercice: GymDayWorkoutExcercice) => void;
}

export function GymDayWorkoutExcerciceCard({
	excercice,
	onEdit,
	onDelete,
}: GymDayWorkoutExcerciceCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{excercice.name}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-sm text-muted-foreground space-y-1">
					<p>Sets: {excercice.sets}</p>
					<p>Reps: {excercice.reps}</p>
					<p>Weight: {excercice.weigth ?? "-"}</p>
				</div>
			</CardContent>
			<div className="flex gap-2 px-6 pb-4">
				{onEdit && (
					<Button variant="outline" size="sm" onClick={() => onEdit(excercice)}>
						<Pencil className="size-4" />
					</Button>
				)}
				{onDelete && (
					<Button
						variant="destructive"
						size="sm"
						onClick={() => onDelete(excercice)}
					>
						<Trash2 className="size-4" />
					</Button>
				)}
			</div>
		</Card>
	);
}
