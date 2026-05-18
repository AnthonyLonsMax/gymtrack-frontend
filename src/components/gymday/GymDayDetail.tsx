import { Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	ChevronDown,
	ChevronRight,
	Pencil,
	Plus,
	Trash2,
	X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import {
	useCreateGymDayExcerciceDone,
	useDeleteGymDayExcerciceDone,
	useGymDayExcercicesDone,
	useUpdateGymDayExcerciceDone,
} from "#/hooks/useGymDayExcercicesDone";
import {
	useCreateGymDayWorkoutExcercice,
	useDeleteGymDayWorkoutExcercice,
	useGymDayWorkoutExcercices,
	useUpdateGymDayWorkoutExcercice,
} from "#/hooks/useGymDayWorkoutExcercices";
import {
	useCreateGymDayWorkout,
	useDeleteGymDayWorkout,
	useGymDayWorkouts,
} from "#/hooks/useGymDayWorkouts";
import type { GymDay } from "#/schemas/gymDaySchema";
import type {
	GymDayExcerciceDone,
} from "#/schemas/gymDayExcerciceDoneSchema";
import type { GymDayWorkoutExcercice } from "#/schemas/gymDayWorkoutExcerciceSchema";
import type { GymDayWorkout } from "#/schemas/gymDayWorkoutSchema";

export interface GymDayDetailProps {
	gymDay: GymDay;
}

function EditExerciseModal({
	open,
	title,
	initial,
	onSave,
	onClose,
}: {
	open: boolean;
	title: string;
	initial: { name: string; sets: number; reps: number; weigth: string | null };
	onSave: (data: { name: string; sets: number; reps: number; weigth?: string }) => void;
	onClose: () => void;
}) {
	const [name, setName] = useState(initial.name);
	const [sets, setSets] = useState(initial.sets);
	const [reps, setReps] = useState(initial.reps);
	const [weigth, setWeigth] = useState(initial.weigth ?? "");

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="bg-card rounded-4xl p-6 w-full max-w-md shadow-xl">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-heading font-medium">{title}</h2>
					<Button variant="ghost" size="sm" onClick={onClose}>
						<X className="size-4" />
					</Button>
				</div>
				<div className="space-y-4">
					<div className="grid gap-2">
						<Label htmlFor="edit-name">Nombre</Label>
						<Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} />
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="edit-sets">Sets</Label>
							<Input id="edit-sets" type="number" value={sets} onChange={(e) => setSets(Number(e.target.value))} />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="edit-reps">Reps</Label>
							<Input id="edit-reps" type="number" value={reps} onChange={(e) => setReps(Number(e.target.value))} />
						</div>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="edit-weigth">Peso</Label>
						<Input id="edit-weigth" value={weigth} onChange={(e) => setWeigth(e.target.value)} placeholder="Ej: 80 kg" />
					</div>
					<div className="flex gap-2 justify-end">
						<Button variant="outline" onClick={onClose}>Cancelar</Button>
						<Button onClick={() => onSave({ name, sets, reps, weigth: weigth || undefined })}>
							Guardar
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

function WorkoutExercisesSection({
	gymDayId,
	workout,
}: {
	gymDayId: string;
	workout: GymDayWorkout;
}) {
	const { data: exercises, isLoading } = useGymDayWorkoutExcercices(
		gymDayId,
		workout.id,
	);
	const createExercise = useCreateGymDayWorkoutExcercice();
	const deleteExercise = useDeleteGymDayWorkoutExcercice();
	const updateExercise = useUpdateGymDayWorkoutExcercice();
	const [name, setName] = useState("");
	const [sets, setSets] = useState(0);
	const [reps, setReps] = useState(0);
	const [weigth, setWeigth] = useState("");
	const [editing, setEditing] = useState<GymDayWorkoutExcercice | null>(null);

	const items = exercises?.content;

	const handleAdd = () => {
		if (name.trim().length < 4) return;
		createExercise.mutate(
			{
				gymDayId,
				workoutId: workout.id,
				data: { name, sets, reps, weigth: weigth || undefined },
			},
			{
				onSuccess: () => {
					setName("");
					setSets(0);
					setReps(0);
					setWeigth("");
				},
			},
		);
	};

	const handleEdit = (data: { name: string; sets: number; reps: number; weigth?: string }) => {
		if (!editing) return;
		updateExercise.mutate(
			{ gymDayId, workoutId: workout.id, id: editing.id, data },
			{ onSuccess: () => setEditing(null) },
		);
	};

	return (
		<div className="ml-6 mt-2 space-y-2">
			<p className="text-sm font-medium text-muted-foreground">Ejercicios</p>
			{isLoading && (
				<p className="text-sm text-muted-foreground">Cargando...</p>
			)}
			{!isLoading && (!items || items.length === 0) && (
				<p className="text-sm text-muted-foreground">Sin ejercicios</p>
			)}
			{items && items.length > 0 && (
				<div className="space-y-2">
					{items.map((ex) => (
						<div
							key={ex.id}
							className="flex items-center justify-between rounded-2xl border p-3 text-sm"
						>
							<div>
								<p className="font-medium">{ex.name}</p>
								<p className="text-muted-foreground">
									Sets: {ex.sets} | Reps: {ex.reps}
									{ex.weigth ? ` | Peso: ${ex.weigth}` : ""}
								</p>
							</div>
							<div className="flex gap-1">
								<Button
									variant="outline"
									size="sm"
									onClick={() => setEditing(ex)}
								>
									<Pencil className="size-3" />
								</Button>
								<Button
									variant="destructive"
									size="sm"
									onClick={() =>
										deleteExercise.mutate({
											gymDayId,
											workoutId: workout.id,
											id: ex.id,
										})
									}
								>
									<Trash2 className="size-3" />
								</Button>
							</div>
						</div>
					))}
				</div>
			)}
			<EditExerciseModal
				open={!!editing}
				title="Editar ejercicio"
				initial={editing ? { name: editing.name, sets: editing.sets, reps: editing.reps, weigth: editing.weigth } : { name: "", sets: 0, reps: 0, weigth: null }}
				onSave={handleEdit}
				onClose={() => setEditing(null)}
			/>
			<div className="grid grid-cols-2 gap-2 rounded-2xl border p-3">
				<div className="col-span-2">
					<Label htmlFor="ex-name">Nombre</Label>
					<Input
						id="ex-name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Ej: Press banca"
					/>
				</div>
				<div>
					<Label htmlFor="ex-sets">Sets</Label>
					<Input
						id="ex-sets"
						type="number"
						value={sets}
						onChange={(e) => setSets(Number(e.target.value))}
					/>
				</div>
				<div>
					<Label htmlFor="ex-reps">Reps</Label>
					<Input
						id="ex-reps"
						type="number"
						value={reps}
						onChange={(e) => setReps(Number(e.target.value))}
					/>
				</div>
				<div className="col-span-2">
					<Label htmlFor="ex-weigth">Peso</Label>
					<Input
						id="ex-weigth"
						value={weigth}
						onChange={(e) => setWeigth(e.target.value)}
						placeholder="Ej: 80 kg"
					/>
				</div>
				<div className="col-span-2">
					<Button
						size="sm"
						onClick={handleAdd}
						disabled={createExercise.isPending}
					>
						<Plus className="size-3 mr-1" /> Agregar ejercicio
					</Button>
				</div>
			</div>
		</div>
	);
}

function ExercisesDoneSection({ gymDayId }: { gymDayId: string }) {
	const { data, isLoading } = useGymDayExcercicesDone(gymDayId);
	const createExercise = useCreateGymDayExcerciceDone();
	const deleteExercise = useDeleteGymDayExcerciceDone();
	const updateExercise = useUpdateGymDayExcerciceDone();
	const [name, setName] = useState("");
	const [sets, setSets] = useState(0);
	const [reps, setReps] = useState(0);
	const [weigth, setWeigth] = useState("");
	const [editing, setEditing] = useState<GymDayExcerciceDone | null>(null);

	const handleAdd = () => {
		if (name.trim().length < 4) return;
		createExercise.mutate(
			{
				gymDayId,
				data: { name, sets, reps, weigth: weigth || undefined },
			},
			{
				onSuccess: () => {
					setName("");
					setSets(0);
					setReps(0);
					setWeigth("");
				},
			},
		);
	};

	const handleEdit = (data: { name: string; sets: number; reps: number; weigth?: string }) => {
		if (!editing) return;
		updateExercise.mutate(
			{ gymDayId, id: editing.id, data },
			{ onSuccess: () => setEditing(null) },
		);
	};

	return (
		<div className="space-y-3">
			{isLoading && (
				<p className="text-sm text-muted-foreground">Cargando...</p>
			)}
			{!isLoading && (!data?.content || data.content.length === 0) && (
				<p className="text-sm text-muted-foreground border rounded-2xl p-4">
					No hay ejercicios completados registrados
				</p>
			)}
			{data?.content && data.content.length > 0 && (
				<div className="space-y-2">
					{data.content.map((ex) => (
						<div
							key={ex.id}
							className="flex items-center justify-between rounded-2xl border p-3 text-sm"
						>
							<div>
								<p className="font-medium">{ex.name}</p>
								<p className="text-muted-foreground">
									Sets: {ex.sets} | Reps: {ex.reps}
									{ex.weigth ? ` | Peso: ${ex.weigth}` : ""}
								</p>
							</div>
							<div className="flex gap-1">
								<Button
									variant="outline"
									size="sm"
									onClick={() => setEditing(ex)}
								>
									<Pencil className="size-3" />
								</Button>
								<Button
									variant="destructive"
									size="sm"
									onClick={() => deleteExercise.mutate({ gymDayId, id: ex.id })}
								>
									<Trash2 className="size-3" />
								</Button>
							</div>
						</div>
					))}
				</div>
			)}
			<EditExerciseModal
				open={!!editing}
				title="Editar ejercicio completado"
				initial={editing ? { name: editing.name, sets: editing.sets, reps: editing.reps, weigth: editing.weigth } : { name: "", sets: 0, reps: 0, weigth: null }}
				onSave={handleEdit}
				onClose={() => setEditing(null)}
			/>
			<div className="grid grid-cols-2 gap-2 rounded-2xl border p-3">
				<div className="col-span-2">
					<Label htmlFor="ed-name">Nombre</Label>
					<Input
						id="ed-name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Ej: Dominadas"
					/>
				</div>
				<div>
					<Label htmlFor="ed-sets">Sets</Label>
					<Input
						id="ed-sets"
						type="number"
						value={sets}
						onChange={(e) => setSets(Number(e.target.value))}
					/>
				</div>
				<div>
					<Label htmlFor="ed-reps">Reps</Label>
					<Input
						id="ed-reps"
						type="number"
						value={reps}
						onChange={(e) => setReps(Number(e.target.value))}
					/>
				</div>
				<div className="col-span-2">
					<Label htmlFor="ed-weigth">Peso</Label>
					<Input
						id="ed-weigth"
						value={weigth}
						onChange={(e) => setWeigth(e.target.value)}
						placeholder="Ej: 20 kg"
					/>
				</div>
				<div className="col-span-2">
					<Button
						size="sm"
						onClick={handleAdd}
						disabled={createExercise.isPending}
					>
						<Plus className="size-3 mr-1" /> Agregar ejercicio completado
					</Button>
				</div>
			</div>
		</div>
	);
}

export function GymDayDetail({ gymDay }: GymDayDetailProps) {
	const { data: workouts, isLoading: loadingWorkouts } = useGymDayWorkouts(
		gymDay.id,
	);
	const createWorkout = useCreateGymDayWorkout();
	const deleteWorkout = useDeleteGymDayWorkout();
	const [newWorkoutName, setNewWorkoutName] = useState("");
	const [expandedWorkout, setExpandedWorkout] = useState<string | null>(null);

	const handleAddWorkout = () => {
		if (newWorkoutName.trim()) {
			createWorkout.mutate(
				{ gymDayId: gymDay.id, data: { name: newWorkoutName } },
				{ onSuccess: () => setNewWorkoutName("") },
			);
		}
	};

	return (
		<div className="space-y-10">
			<img
				src="/gym-header.jpg"
				alt="Gimnasio"
				className="w-full h-48 rounded-3xl object-cover shadow-lg"
				style={{ filter: "grayscale(100%) contrast(1.15) brightness(0.85)" }}
			/>

			<div className="flex items-center gap-4">
				<Link to="/dashboard/gymdays">
					<Button variant="ghost" size="sm">
						<ArrowLeft className="size-4" />
					</Button>
				</Link>
				<div>
					<h1 className="text-2xl font-heading font-medium">GymDay</h1>
					<p className="text-sm text-muted-foreground">
						{new Date(gymDay.created).toLocaleDateString("es-ES", {
							weekday: "long",
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
				</div>
			</div>

			<section>
				<h2 className="text-lg font-heading font-medium mb-3">Workouts</h2>
				<div className="flex gap-2 mb-4">
					<Input
						placeholder="Nombre del workout"
						value={newWorkoutName}
						onChange={(e) => setNewWorkoutName(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleAddWorkout()}
					/>
					<Button onClick={handleAddWorkout} disabled={createWorkout.isPending}>
						<Plus className="size-4" />
					</Button>
				</div>

				{loadingWorkouts && (
					<p className="text-sm text-muted-foreground">Cargando...</p>
				)}
				{!loadingWorkouts && (!workouts || workouts.length === 0) && (
					<p className="text-sm text-muted-foreground border rounded-2xl p-4">
						Sin workouts
					</p>
				)}
				{workouts && workouts.length > 0 && (
					<div className="space-y-2">
						{workouts.map((w) => (
							<Card key={w.id}>
								<CardHeader className="pb-2">
									<div className="flex items-center justify-between">
										<button
											type="button"
											className="flex items-center gap-2"
											onClick={() =>
												setExpandedWorkout(
													expandedWorkout === w.id ? null : w.id,
												)
											}
										>
											{expandedWorkout === w.id ? (
												<ChevronDown className="size-4 text-muted-foreground" />
											) : (
												<ChevronRight className="size-4 text-muted-foreground" />
											)}
											<CardTitle className="text-base">{w.name}</CardTitle>
										</button>
										<Button
											variant="destructive"
											size="sm"
											onClick={() =>
												deleteWorkout.mutate({
													gymDayId: gymDay.id,
													id: w.id,
												})
											}
										>
											<Trash2 className="size-3" />
										</Button>
									</div>
								</CardHeader>
								{expandedWorkout === w.id && (
									<CardContent>
										<WorkoutExercisesSection gymDayId={gymDay.id} workout={w} />
									</CardContent>
								)}
							</Card>
						))}
					</div>
				)}
			</section>

			<section>
				<h2 className="text-lg font-heading font-medium mb-3">
					Ejercicios Completados
				</h2>
				<ExercisesDoneSection gymDayId={gymDay.id} />
			</section>
		</div>
	);
}
