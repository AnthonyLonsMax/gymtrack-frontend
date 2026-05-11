import { Trash2 } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import type { GymDay } from "#/schemas/gymDaySchema";

export interface GymDayCardProps {
	gymDay: GymDay;
	onDelete?: (gymDay: GymDay) => void;
}

export function GymDayCard({ gymDay, onDelete }: GymDayCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>GymDay</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground">
					Creado: {new Date(gymDay.created).toLocaleDateString()}
				</p>
			</CardContent>
			<div className="flex gap-2 px-6 pb-4">
				{onDelete && (
					<Button
						variant="destructive"
						size="sm"
						onClick={() => onDelete(gymDay)}
					>
						<Trash2 className="size-4" />
					</Button>
				)}
			</div>
		</Card>
	);
}
