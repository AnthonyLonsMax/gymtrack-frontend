import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import type { GymDay } from "#/schemas/gymDaySchema";

export interface GymDayCardProps {
	gymDay: GymDay;
	onDelete?: (gymDay: GymDay) => void;
}

export function GymDayCard({ gymDay, onDelete }: GymDayCardProps) {
	const navigate = useNavigate();

	return (
		<Card>
			<CardHeader>
				<CardTitle>GymDay</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground">
					{new Date(gymDay.created).toLocaleDateString("es-ES", {
						weekday: "long",
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</p>
			</CardContent>
			<div className="flex gap-2 px-6 pb-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() =>
						navigate({
							to: "/dashboard/gymdays/$gymDayId",
							params: { gymDayId: gymDay.id },
						})
					}
				>
					<Eye className="size-4" />
				</Button>
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
