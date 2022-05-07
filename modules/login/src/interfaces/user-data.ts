export interface UserData {
	username: string;
	email: string;
	token: string;
}

export interface LoginData {
	usernameOrEmail?: string;
	password: string;
}

export interface SignupData {
	username: string;
	email: string;
	password: string;
}
