import { useContext, useEffect, useState } from 'react';

import { ArticleContext, AuthContext } from '@/contexts';
import { Layout, Button } from '@/components';
import { ROLES } from '@/contexts/types/user';
import {
	getAllCommentsByID,
	addComment,
	deleteComment,
	editComment,
} from '@/firebase';

export default function Article() {
	const { currentNews } = useContext(ArticleContext);
	const { user } = useContext(AuthContext);

	const [comments, setComments] = useState([]);
	const [currentComment, setCurrentComment] = useState<{
		id: string;
		text: string;
	}>({ id: '', text: '' });
	const [text, setText] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		(async () => {
			await getAllCommentsByID(currentNews?.url!).then(setComments);
		})();
	}, [currentNews]);

	const handleSubmit = async () => {
		await addComment(currentNews?.url!, text)
			.then(() => console.log('Created'))
			.catch(() => console.error('ERROR'));
		await getAllCommentsByID(currentNews?.url!).then(setComments);
	};

	const handleDelete = async (id: string) => {
		await deleteComment(id)
			.then(() => console.log('Deleted'))
			.catch(() => console.log('ERROR'));
		await getAllCommentsByID(currentNews?.url!).then(setComments);
	};

	const handleEdit = async () => {
		await editComment(currentComment.id, currentComment.text)
			.then(() => console.log('Changed'))
			.catch(() => console.error('ERROR'))
			.finally(() => setIsOpen(false));
		await getAllCommentsByID(currentNews?.url!).then(setComments);
	};

	return (
		<Layout>
			<main className='w-full flex flex-col gap-y-4 container mx-auto'>
				<div>
					<h1 className='text-2xl text-center'>{currentNews?.title}</h1>
					<div className='text-center text-sm'>{currentNews?.author}</div>
					<a
						href={currentNews?.url}
						className='text-sm underline hover:text-blue-400'>
						Ссылка на полную статью
					</a>
				</div>
				<div className='w-full h-96'>
					<img
						className='w-full object-cover h-full'
						src={currentNews?.urlToImage}
						alt={currentNews?.title}
					/>
				</div>
				<p>{currentNews?.description}</p>

				<section className='w-full flex flex-col p-2 gap-3'>
					<div className='text-gray-500 font-medium text-xl'>Комментарии:</div>
					<div className='w-full'>
						<textarea
							defaultValue={text}
							onChange={(e) => setText(e.target.value)}
							className='w-full h-36 resize-none border focus:outline-none'
						/>
						<Button onClick={handleSubmit}>Отправить</Button>
					</div>

					<div className='text-gray-500 border-b'>
						Количество комментариев: {comments.length}
					</div>

					{comments.map((comment: any) => (
						<div
							key={comment.id}
							className='w-full p-2 border-b'>
							<div>{comment.comment.text}</div>
							<div className='w-full flex justify-between'>
								<div>
									<button
										onClick={() => {
											setCurrentComment({
												text: comment.comment.text,
												id: comment.id,
											});
											setIsOpen(true);
										}}>
										Изменить комментарий
									</button>
									{isOpen && (
										<dialog className='w-full min-h-screen fixed top-0 flex justify-center items-center bg-black bg-opacity-45'>
											<div className='w-96 p-2 bg-white flex flex-col'>
												<div
													onClick={() => setIsOpen(false)}
													className='w-full flex justify-end mb-2 cursor-pointer'>
													X
												</div>
												<textarea
													defaultValue={currentComment.text}
													onChange={(e) =>
														setCurrentComment((prev) => ({
															...prev,
															text: e.target.value,
														}))
													}
													className='w-full h-36 resize-none border focus:outline-none'
												/>
												<Button onClick={handleEdit}>Сохранить</Button>
											</div>
										</dialog>
									)}

									{user?.role === ROLES.ADMIN && (
										<button
											onClick={() => handleDelete(comment.id)}
											className='py-1 px-1.5 text-white bg-red-500 rounded-sm font-medium 
										hover:bg-white hover:text-red-500 transition-colors'>
											Удалить комментарий
										</button>
									)}
								</div>
								<div className='text-end text-gray-400'>
									Создан{' '}
									<>{new Date(comment.comment.created_at).toUTCString()}</>
								</div>
							</div>
						</div>
					))}
				</section>
			</main>
		</Layout>
	);
}
