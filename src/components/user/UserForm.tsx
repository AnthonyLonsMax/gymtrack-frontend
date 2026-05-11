import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { useCreateUser, useUpdateUser } from "#/hooks/useUsers";
import type { User } from "#/schemas/userSchema";
import { userCreateSchema, userUpdateSchema } from "#/schemas/userSchema";

export interface UserFormProps {
	user?: User;
	onSuccess?: () => void;
	onCancel?: () => void;
}

export function UserForm({ user, onSuccess, onCancel }: UserFormProps) {
	const isEditing = !!user;
	const schema = isEditing ? userUpdateSchema : userCreateSchema;
	const createMutation = useCreateUser();
	const updateMutation = useUpdateUser();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: user
			? { user_name: user.user_name, picture: user.picture }
			: { user_name: "", picture: "", password: "" },
	});

	const onSubmit = handleSubmit((data) => {
		if (isEditing && user) {
			updateMutation.mutate({ id: user.id, data }, { onSuccess });
		} else {
			createMutation.mutate(data as any, { onSuccess });
		}
	});

	return (
		<form onSubmit={onSubmit} className="space-y-4">
			<div className="grid gap-2">
				<Label htmlFor="user_name">Username</Label>
				<Input id="user_name" {...register("user_name")} />
				{errors.user_name && (
					<p className="text-destructive text-sm">{errors.user_name.message}</p>
				)}
			</div>
			<div className="grid gap-2">
				<Label htmlFor="picture">Picture URL</Label>
				<Input id="picture" {...register("picture")} />
				{errors.picture && (
					<p className="text-destructive text-sm">{errors.picture.message}</p>
				)}
			</div>
			{!isEditing && (
				<div className="grid gap-2">
					<Label htmlFor="password">Password</Label>
					<Input id="password" type="password" {...register("password")} />
					{errors.password && (
						<p className="text-destructive text-sm">
							{errors.password.message}
						</p>
					)}
				</div>
			)}
			<div className="flex gap-2 justify-end">
				{onCancel && (
					<Button type="button" variant="outline" onClick={onCancel}>
						Cancelar
					</Button>
				)}
				<Button
					type="submit"
					disabled={createMutation.isPending || updateMutation.isPending}
				>
					{isEditing ? "Actualizar" : "Crear"}
				</Button>
			</div>
		</form>
	);
}
