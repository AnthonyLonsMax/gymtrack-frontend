import { Pencil, Trash2 } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import type { Objetive } from "#/objetive/schema/objetiveSchema";

export interface ObjetiveCardProps {
	objetive: Objetive;
	onEdit?: (objetive: Objetive) => void;
	onDelete?: (objetive: Objetive) => void;
}

export function ObjetiveCard({
	objetive,
	onEdit,
	onDelete,
}: ObjetiveCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{objetive.name}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground">
					{objetive.description || "Sin descripción"}
				</p>
			</CardContent>
			<div className="flex gap-2 px-6 pb-4">
				{onEdit && (
					<Button variant="outline" size="sm" onClick={() => onEdit(objetive)}>
						<Pencil className="size-4" />
					</Button>
				)}
				{onDelete && (
					<Button
						variant="destructive"
						size="sm"
						onClick={() => onDelete(objetive)}
					>
						<Trash2 className="size-4" />
					</Button>
				)}
			</div>
		</Card>
	);
}
