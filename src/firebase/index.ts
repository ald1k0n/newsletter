import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	collection,
	getDocs,
	getDoc,
	where,
	query,
	setDoc,
	doc,
	deleteDoc,
	updateDoc,
} from 'firebase/firestore/lite';

import {
	FIREBASE_KEY,
	FIREBASE_APP_ID,
	FIREBASE_DOMAIN,
	FIREBASE_SENDER_ID,
} from '@/config';

const firebaseConfig = {
	apiKey: FIREBASE_KEY,
	authDomain: FIREBASE_DOMAIN,
	projectId: 'newsletter-9d7fa',
	storageBucket: 'newsletter-9d7fa.appspot.com',
	messagingSenderId: FIREBASE_SENDER_ID,
	appId: FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const commentsRef = collection(db, 'comments');

export async function getAllCommentsByID(id: number) {
	const q = query(commentsRef, where('news_id', '==', id));
	const commentsSnapshot = (await getDocs(q).catch(console.error)) as any;

	const comments: any = [];
	commentsSnapshot.forEach((d: any) => comments.push({ ...d, id: d.id }));

	return comments;
}

export async function addComment(
	news_id: number,
	username: string,
	text: string
) {
	const newComment = doc(commentsRef);
	const data = {
		news_id,
		username,
		text,
		created_at: Date.now(),
	};

	await setDoc(newComment, data).catch(console.error);
}

export async function deleteComment(commentId: string) {
	const commentDocRef = doc(commentsRef, commentId);
	await deleteDoc(commentDocRef).catch(console.error);
}

export async function editComment(commentId: string, text: string) {
	const commentDocRef = doc(commentsRef, commentId);
	const commentSnapshot = await getDoc(commentDocRef);
	if (commentSnapshot.exists())
		await updateDoc(commentDocRef, { text }).catch(console.error);
}
