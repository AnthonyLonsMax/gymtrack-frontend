import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { WorkoutForm, WorkoutList } from "#/workout";
import type { Workout } from "#/workout/schema/workoutSchema";

export const Route = createFileRoute("/dashboard/workouts")({
	component: WorkoutsPage,
});

function WorkoutsPage() {
	const [editingEntity, setEditingEntity] = useState<Workout | undefined>();
	const [isFormOpen, setIsFormOpen] = useState(false);

	const handleEdit = (entity: Workout) => {
		setEditingEntity(entity);
		setIsFormOpen(true);
	};
	const handleCreate = () => {
		setEditingEntity(undefined);
		setIsFormOpen(true);
	};
	const handleSuccess = () => {
		setIsFormOpen(false);
		setEditingEntity(undefined);
	};
	const handleCancel = () => {
		setIsFormOpen(false);
		setEditingEntity(undefined);
	};

	return (
		<div>
			<img
				src="/workout-header.jpg"
				alt=""
				className="w-full h-48 rounded-3xl object-cover shadow-lg mb-6"
				style={{ filter: "grayscale(100%) contrast(1.15) brightness(0.85)" }}
			/>
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-heading font-medium">Workouts</h1>
				<Button onClick={handleCreate}>
					<Plus className="size-4" /> Nuevo
				</Button>
			</div>
			<WorkoutList onEdit={handleEdit} />
			{isFormOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
					<div className="bg-card rounded-4xl p-6 w-full max-w-md shadow-xl">
						<h2 className="text-lg font-heading font-medium mb-4">
							{editingEntity ? "Editar Workout" : "Nuevo Workout"}
						</h2>
						<WorkoutForm
							workout={editingEntity}
							onSuccess={handleSuccess}
							onCancel={handleCancel}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
