import { Pencil, Trash2 } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import type { User } from "#/auth/schema/userSchema";

export interface UserCardProps {
	user: User;
	onEdit?: (user: User) => void;
	onDelete?: (user: User) => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{user.user_name}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground">{user.picture}</p>
			</CardContent>
			<div className="flex gap-2 px-6 pb-4">
				{onEdit && (
					<Button variant="outline" size="sm" onClick={() => onEdit(user)}>
						<Pencil className="size-4" />
					</Button>
				)}
				{onDelete && (
					<Button
						variant="destructive"
						size="sm"
						onClick={() => onDelete(user)}
					>
						<Trash2 className="size-4" />
					</Button>
				)}
			</div>
		</Card>
	);
}
