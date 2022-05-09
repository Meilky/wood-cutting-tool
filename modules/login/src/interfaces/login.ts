export interface Login {
	state: LoginStates,
	msg?: string
}

export enum LoginStates {
	LOADING,
	SUCCESS,
	ERROR,
	NA,
}
