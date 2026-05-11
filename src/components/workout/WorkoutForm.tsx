import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { useAuthStore } from "#/hooks/useAuthStore";
import { useCreateWorkout, useUpdateWorkout } from "#/hooks/useWorkouts";
import type { Workout } from "#/schemas/workoutSchema";
import {
	workoutCreateSchema,
	workoutUpdateSchema,
} from "#/schemas/workoutSchema";

export interface WorkoutFormProps {
	workout?: Workout;
	onSuccess?: () => void;
	onCancel?: () => void;
}

export function WorkoutForm({
	workout,
	onSuccess,
	onCancel,
}: WorkoutFormProps) {
	const user = useAuthStore((s) => s.user);
	const isEditing = !!workout;
	const schema = isEditing ? workoutUpdateSchema : workoutCreateSchema;
	const createMutation = useCreateWorkout();
	const updateMutation = useUpdateWorkout();

	console.log(user);
	

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: workout
			? { name: workout.name, picture: workout.picture }
			: { name: "", picture: "" },
	});

	const onSubmit = handleSubmit((data) => {
		if (isEditing && workout) {
			updateMutation.mutate(
				{ userId: user?.id, id: workout.id, data },
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
				<Label htmlFor="picture">Picture URL</Label>
				<Input id="picture" {...register("picture")} />
				{errors.picture && (
					<p className="text-destructive text-sm">{errors.picture.message}</p>
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
