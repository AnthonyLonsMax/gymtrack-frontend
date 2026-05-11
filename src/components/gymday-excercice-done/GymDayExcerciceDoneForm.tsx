import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import {
	useCreateGymDayExcerciceDone,
	useUpdateGymDayExcerciceDone,
} from "#/hooks/useGymDayExcercicesDone";
import type { GymDayExcerciceDone } from "#/schemas/gymDayExcerciceDoneSchema";
import {
	gymDayExcerciceDoneCreateSchema,
	gymDayExcerciceDoneUpdateSchema,
} from "#/schemas/gymDayExcerciceDoneSchema";

export interface GymDayExcerciceDoneFormProps {
	excercice?: GymDayExcerciceDone;
	onSuccess?: () => void;
	onCancel?: () => void;
}

export function GymDayExcerciceDoneForm({
	excercice,
	onSuccess,
	onCancel,
}: GymDayExcerciceDoneFormProps) {
	const isEditing = !!excercice;
	const schema = isEditing
		? gymDayExcerciceDoneUpdateSchema
		: gymDayExcerciceDoneCreateSchema;
	const createMutation = useCreateGymDayExcerciceDone();
	const updateMutation = useUpdateGymDayExcerciceDone();
	const [gymDayId, setGymDayId] = useState("");

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
					weigth: excercice.weigth ?? "",
				}
			: { name: "", sets: 0, reps: 0, weigth: "" },
	});

	const onSubmit = handleSubmit((data) => {
		if (isEditing && excercice) {
			updateMutation.mutate(
				{ gymDayId, id: excercice.id, data },
				{ onSuccess },
			);
		} else {
			createMutation.mutate({ gymDayId, data }, { onSuccess });
		}
	});

	return (
		<form onSubmit={onSubmit} className="space-y-4">
			{!isEditing && (
				<div className="grid gap-2">
					<Label htmlFor="gymDayId">GymDay ID</Label>
					<Input
						id="gymDayId"
						value={gymDayId}
						onChange={(e) => setGymDayId(e.target.value)}
					/>
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
