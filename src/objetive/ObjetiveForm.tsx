import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { useAuthStore } from "#/auth/store/useAuthStore";
import type { Objetive } from "#/schemas/objetiveSchema";
import {
	objetiveCreateSchema,
	objetiveUpdateSchema,
} from "#/schemas/objetiveSchema";
import { useCreateObjetive, useUpdateObjetive } from "./hooks/useObjetives";

export interface ObjetiveFormProps {
	objetive?: Objetive;
	onSuccess?: () => void;
	onCancel?: () => void;
}

export function ObjetiveForm({
	objetive,
	onSuccess,
	onCancel,
}: ObjetiveFormProps) {
	const user = useAuthStore((s) => s.user);
	const isEditing = !!objetive;
	const schema = isEditing ? objetiveUpdateSchema : objetiveCreateSchema;
	const createMutation = useCreateObjetive();
	const updateMutation = useUpdateObjetive();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: objetive
			? { name: objetive.name, description: objetive.description ?? "" }
			: { name: "", description: "" },
	});

	const onSubmit = handleSubmit((data) => {
		if (isEditing && objetive) {
			updateMutation.mutate(
				{ userId: user?.id, id: objetive.id, data },
				{ onSuccess },
			);
		} else {
			createMutation.mutate({ userId: user?.id, data }, { onSuccess });
		}
	});

	return (
		<form onSubmit={onSubmit} className="space-y-4">
			<div className="grid gap-2">
				<Label htmlFor="name">Name</Label>
				<Input id="name" {...register("name")} />
				{errors.name && (
					<p className="text-destructive text-sm">{errors.name.message}</p>
				)}
			</div>
			<div className="grid gap-2">
				<Label htmlFor="description">Description</Label>
				<Input id="description" {...register("description")} />
			</div>
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
