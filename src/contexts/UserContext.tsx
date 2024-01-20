/* eslint-disable no-unused-vars */
import { ReactNode, createContext, useState, useEffect } from 'react';
import { IUser, ROLES } from './types/user';

const initialContext = {
	id: Date.now(),
	//@ts-ignore
	role: ROLES.CLIENT,
};
export const AuthContext = createContext<{
	user?: IUser;
	handleUser?: (payload: IUser) => void;
}>({});

export function UserContext({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<IUser | null>(null);

	const handleUser = (
		payload: IUser = {
			...initialContext,
		}
	) => {
		localStorage.setItem('user', JSON.stringify(payload));
		setUser(payload);
	};

	useEffect(() => {
		handleUser();
	}, []);

	return (
		<AuthContext.Provider value={{ user: user as IUser, handleUser }}>
			{children}
		</AuthContext.Provider>
	);
}
