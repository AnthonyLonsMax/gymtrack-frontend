import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";

import type { GymDayWorkout } from "#/schemas/gymDayWorkoutSchema";
import {
	gymDayWorkoutCreateSchema,
	gymDayWorkoutUpdateSchema,
} from "#/schemas/gymDayWorkoutSchema";
import {
	useCreateGymDayWorkout,
	useUpdateGymDayWorkout,
} from "./hooks/useGymDayWorkouts";

export interface GymDayWorkoutFormProps {
	gymDayWorkout?: GymDayWorkout;
	onSuccess?: () => void;
	onCancel?: () => void;
}

export function GymDayWorkoutForm({
	gymDayWorkout,
	onSuccess,
	onCancel,
}: GymDayWorkoutFormProps) {
	const isEditing = !!gymDayWorkout;
	const schema = isEditing
		? gymDayWorkoutUpdateSchema
		: gymDayWorkoutCreateSchema;
	const createMutation = useCreateGymDayWorkout();
	const updateMutation = useUpdateGymDayWorkout();
	const [gymDayId, setGymDayId] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: gymDayWorkout ? { name: gymDayWorkout.name } : { name: "" },
	});

	const onSubmit = handleSubmit((data) => {
		if (isEditing && gymDayWorkout) {
			updateMutation.mutate(
				{ gymDayId, id: gymDayWorkout.id, data },
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
