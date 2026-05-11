import { AxiosError } from "axios";

export interface AppError {
	message: string;
	status?: number;
	code?: string;
}

export default function mapError(err: unknown): AppError {
	if (err instanceof AxiosError) {
		const data = err.response?.data as Record<string, unknown> | undefined;
		return {
			message: (data?.message as string) || err.message || "Unknown error",
			status: err.response?.status,
			code: data?.code as string | undefined,
		};
	}
	if (err instanceof Error) {
		return { message: err.message };
	}
	return { message: "Unknown error" };
}
