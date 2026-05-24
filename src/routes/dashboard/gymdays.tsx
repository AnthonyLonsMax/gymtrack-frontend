import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import { GymDayList } from "#/gymday";
import { Button } from "#/components/ui/button";
import { useCreateGymDay } from "#/gymday/hooks/useGymDays";

export const Route = createFileRoute("/dashboard/gymdays")({
	component: GymDaysLayout,
});

function GymDaysLayout() {
	const createMutation = useCreateGymDay();
	const [isFormOpen, setIsFormOpen] = useState(false);

	const handleCreate = () => {
		setIsFormOpen(true);
	};
	const handleSuccess = () => {
		setIsFormOpen(false);
	};
	const handleCancel = () => {
		setIsFormOpen(false);
	};

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-heading font-medium">GymDays</h1>
				<Button onClick={handleCreate}>
					<Plus className="size-4" /> Nuevo
				</Button>
			</div>
			<GymDayList />
			<Outlet />
			{isFormOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
					<div className="bg-card rounded-4xl p-6 w-full max-w-md shadow-xl">
						<h2 className="text-lg font-heading font-medium mb-4">
							Nuevo GymDay
						</h2>
						<div className="flex gap-2 justify-end">
							<Button variant="outline" onClick={handleCancel}>
								Cancelar
							</Button>
							<Button
								onClick={() =>
									createMutation.mutate({}, { onSuccess: handleSuccess })
								}
								disabled={createMutation.isPending}
							>
								Crear
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
