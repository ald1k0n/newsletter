/* eslint-disable no-unused-vars */
import { AuthContext } from '@/contexts';
import { useContext } from 'react';
import { Button } from './Button';
import { IUser, ROLES } from '@/contexts/types/user';

export const Header = () => {
	const { handleUser, user } = useContext(AuthContext) as {
		handleUser: (payload: IUser) => void;
		user: IUser;
	};

	const promoteToAdmin = () => {
		const newAdminUser: IUser = {
			id: Date.now(),
			role: ROLES.ADMIN,
		};

		handleUser(newAdminUser);
	};

	return (
		<header className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
			<div className='sm:flex sm:items-center sm:justify-between'>
				<div className='text-center sm:text-left'>
					<h1 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
						Добро пожаловать!
						{user?.role === ROLES.ADMIN && (
							<p className='mt-1.5 text-sm text-gray-500'>
								Вы администратор 🎉
							</p>
						)}
					</h1>
				</div>

				<div className='mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center'>
					<Button onClick={promoteToAdmin}>Стать Администратором</Button>
				</div>
			</div>
		</header>
	);
};
