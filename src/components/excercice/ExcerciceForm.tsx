import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { WorkoutSelect } from "#/components/workout";
import { useAuthStore } from "#/hooks/useAuthStore";
import { useCreateExcercice, useUpdateExcercice } from "#/hooks/useExcercices";
import type { Excercice } from "#/schemas/excerciceSchema";
import {
	excerciceCreateSchema,
	excerciceUpdateSchema,
} from "#/schemas/excerciceSchema";

export interface ExcerciceFormProps {
	excercice?: Excercice;
	onSuccess?: () => void;
	onCancel?: () => void;
}

export function ExcerciceForm({
	excercice,
	onSuccess,
	onCancel,
}: ExcerciceFormProps) {
	const user = useAuthStore((s) => s.user);
	const isEditing = !!excercice;
	const schema = isEditing ? excerciceUpdateSchema : excerciceCreateSchema;
	const createMutation = useCreateExcercice();
	const updateMutation = useUpdateExcercice();
	const [workoutId, setWorkoutId] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: excercice
			? {
					name: excercice.name,
					sets: excercice.sets,
					reps: excercice.reps,
					weigth: excercice.weigth,
				}
			: { name: "", sets: 0, reps: 0, weigth: "" },
	});

	const onSubmit = handleSubmit((data) => {
		if (isEditing && excercice) {
			updateMutation.mutate(
				{ userId: user?.id, workoutId, id: excercice.id, data },
				{ onSuccess },
			);
		} else {
			createMutation.mutate(
				{ userId: user?.id, workoutId, data },
				{ onSuccess },
			);
		}
	});

	return (
		<form onSubmit={onSubmit} className="space-y-4">
			{!isEditing && (
				<div className="grid gap-2">
					<Label>Workout</Label>
					<WorkoutSelect value={workoutId} onChange={setWorkoutId} />
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
				<Label htmlFor="sets">Sets</Label>
				<Input
					id="sets"
					type="number"
					{...register("sets", { valueAsNumber: true })}
				/>
				{errors.sets && (
					<p className="text-destructive text-sm">{errors.sets.message}</p>
				)}
			</div>
			<div className="grid gap-2">
				<Label htmlFor="reps">Reps</Label>
				<Input
					id="reps"
					type="number"
					{...register("reps", { valueAsNumber: true })}
				/>
				{errors.reps && (
					<p className="text-destructive text-sm">{errors.reps.message}</p>
				)}
			</div>
			<div className="grid gap-2">
				<Label htmlFor="weigth">Weight</Label>
				<Input id="weigth" {...register("weigth")} />
				{errors.weigth && (
					<p className="text-destructive text-sm">{errors.weigth.message}</p>
				)}
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
