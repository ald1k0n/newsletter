import { ReactNode, createContext, useState, useEffect } from 'react';
import { IUser } from './types/user';

const initialContext = {
	id: Date.now(),
};

export const AuthContext = createContext({});

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
		<AuthContext.Provider value={{ user, handleUser }}>
			{children}
		</AuthContext.Provider>
	);
}
