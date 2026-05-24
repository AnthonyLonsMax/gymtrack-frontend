import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ExcerciceForm, ExcerciceList } from "#/excercice";
import { Button } from "#/components/ui/button";
import type { Excercice } from "#/schemas/excerciceSchema";

export const Route = createFileRoute("/dashboard/excercices")({
	component: ExcercicesPage,
});

function ExcercicesPage() {
	const [editingEntity, setEditingEntity] = useState<Excercice | undefined>();
	const [isFormOpen, setIsFormOpen] = useState(false);

	const handleEdit = (entity: Excercice) => {
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
				src="/exercises-header.jpg"
				alt=""
				className="w-full h-48 rounded-3xl object-cover shadow-lg mb-6"
				style={{ filter: "grayscale(100%) contrast(1.15) brightness(0.85)" }}
			/>
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-heading font-medium">Ejercicios</h1>
				<Button onClick={handleCreate}>
					<Plus className="size-4" /> Nuevo
				</Button>
			</div>
			<ExcerciceList onEdit={handleEdit} />
			{isFormOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
					<div className="bg-card rounded-4xl p-6 w-full max-w-md shadow-xl">
						<h2 className="text-lg font-heading font-medium mb-4">
							{editingEntity ? "Editar Ejercicio" : "Nuevo Ejercicio"}
						</h2>
						<ExcerciceForm
							excercice={editingEntity}
							onSuccess={handleSuccess}
							onCancel={handleCancel}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
