import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ObjetiveSelect } from "#/components/objetive/ObjetiveSelect";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { useAuthStore } from "#/hooks/useAuthStore";
import { useCreateGoal, useUpdateGoal } from "#/hooks/useGoals";
import type { Goal } from "#/schemas/goalSchema";
import { goalCreateSchema, goalUpdateSchema } from "#/schemas/goalSchema";

export interface GoalFormProps {
	goal?: Goal;
	onSuccess?: () => void;
	onCancel?: () => void;
}

export function GoalForm({ goal, onSuccess, onCancel }: GoalFormProps) {
	const user = useAuthStore((s) => s.user);
	const isEditing = !!goal;
	const schema = isEditing ? goalUpdateSchema : goalCreateSchema;
	const createMutation = useCreateGoal();
	const updateMutation = useUpdateGoal();
	const [objetiveId, setObjetiveId] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: goal
			? {
					name: goal.name,
					description: goal.description ?? "",
					done: goal.done,
				}
			: { name: "", description: "", done: false },
	});

	const onSubmit = handleSubmit((data) => {
		if (isEditing && goal) {
			updateMutation.mutate(
				{ userId: user?.id, objetiveId, id: goal.id, data },
				{ onSuccess },
			);
		} else {
			createMutation.mutate(
				{ userId: user?.id, objetiveId, data },
				{ onSuccess },
			);
		}
	});

	return (
		<form onSubmit={onSubmit} className="space-y-4">
			{!isEditing && (
				<div className="grid gap-2">
					<Label>Objetivo</Label>
					<ObjetiveSelect value={objetiveId} onChange={setObjetiveId} />
				</div>
			)}
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
			<div className="flex items-center gap-2">
				<input
					type="checkbox"
					id="done"
					{...register("done")}
					className="size-4"
				/>
				<Label htmlFor="done">Completado</Label>
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
