export type User = {
	id: string;
	userName: string;
	picture: string;
};

export type AuthCtx = {
	user?: User;
	isLoggedIn: boolean;
	authenticate: (user: User, accessToken: string, refreshToken: string) => void;
	logout: () => void;
};

export type LoginRequest = {
	userName: string;
	password: string;
};

export type RegisterRequest = {
	userName: string;
	picture: string;
	password: string;
};

export type AuthResponse = {
	accessToken: string;
	refreshToken: string;
	id: string;
	userName: string;
	picture: string;
};
