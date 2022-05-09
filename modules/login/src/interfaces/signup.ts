export interface Signup {
	state: SignupStates,
	msg?: string
}

export enum SignupStates {
	LOADING,
	SUCCESS,
	ERROR,
	NA,
}
