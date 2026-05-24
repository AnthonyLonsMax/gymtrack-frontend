import type { User } from "#/schemas/userSchema";
import { useUsers, useDeleteUser } from "./hooks/useUsers";
import { UserCard } from "./UserCard";

export interface UserListProps {
	onEdit?: (user: User) => void;
	limit?: number;
}

export function UserList({ onEdit, limit = 10 }: UserListProps) {
	const { data, isLoading, isError, error } = useUsers(limit);
	const deleteMutation = useDeleteUser();

	if (isLoading)
		return (
			<div className="flex justify-center p-8">
				<span className="animate-spin size-6 border-2 border-primary border-t-transparent rounded-full" />
			</div>
		);
	if (isError)
		return <div className="text-destructive p-4">Error: {error.message}</div>;
	if (!data?.length)
		return <div className="text-muted-foreground p-4">No hay usuarios</div>;

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{data.map((user) => (
				<UserCard
					key={user.id}
					user={user}
					onEdit={onEdit}
					onDelete={(u) => deleteMutation.mutate(u.id)}
				/>
			))}
		</div>
	);
}
