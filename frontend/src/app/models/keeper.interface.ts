export type Keeper = {
	userName: string;
	displayName: string;
	email: string;
	password: string;
	isAdmin: boolean;
}

export type LoginKeeper = {
	email: string;
	password: string;
}
