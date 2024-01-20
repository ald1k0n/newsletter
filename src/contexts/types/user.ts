export enum ROLES {
	USER,
	ADMIN,
}

export type IUser = {
	id?: number;
	role?: ROLES;
};
