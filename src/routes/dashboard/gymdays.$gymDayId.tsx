import { createFileRoute } from "@tanstack/react-router";
import { GymDayDetail } from "#/gymday";
import { useGymDay } from "#/gymday/hooks/useGymDays";

export const Route = createFileRoute("/dashboard/gymdays/$gymDayId")({
	component: GymDayPage,
});

function GymDayPage() {
	const { gymDayId } = Route.useParams();
	const { data: gymDay, isLoading, isError, error } = useGymDay(gymDayId);

	if (isLoading)
		return (
			<div className="flex justify-center p-8">
				<span className="animate-spin size-6 border-2 border-primary border-t-transparent rounded-full" />
			</div>
		);
	if (isError)
		return <div className="text-destructive p-4">Error: {error.message}</div>;
	if (!gymDay)
		return (
			<div className="text-muted-foreground p-4">GymDay no encontrado</div>
		);

	return <GymDayDetail gymDay={gymDay} />;
}
