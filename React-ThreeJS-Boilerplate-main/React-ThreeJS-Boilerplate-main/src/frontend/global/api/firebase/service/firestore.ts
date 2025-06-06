import { doc, getDoc } from 'firebase/firestore';
import { addDoc, collection, deleteDoc, getDocs, updateDoc } from 'firebase/firestore';

import { GetFirestore } from '../../../../../core/middleware/firebase/service/firestore';

// เพิ่ม todo
export const AddTodo = async (todo: { text: string }) => {
  const todosCol = collection(GetFirestore(), 'todos');
  return await addDoc(todosCol, todo);
};

// อ่าน todo ทั้งหมด
export const GetTodos = async () => {
  const todosCol = collection(GetFirestore(), 'todos');
  const snapshot = await getDocs(todosCol);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ลบ todo
export const DeleteTodo = async (id: string) => {
  const todoDoc = doc(GetFirestore(), 'todos', id);
  return await deleteDoc(todoDoc);
};

// อัปเดต todo
export const UpdateUserTodo = async (userId: string, todos: string[]) => {
  const userDoc = doc(GetFirestore(), 'User', userId);
  await updateDoc(userDoc, { todo: todos });
};

export const GetUserTodos = async (userId: string) => {
  const userDoc = doc(GetFirestore(), 'User', userId);
  const snapshot = await getDoc(userDoc);
  const data = snapshot.data();
  // console.log(user.data());
  // ตรวจสอบว่ามีข้อมูลหรือไม่
  if (data) {
    return {
      name: data.name ?? '',
      todo: data.todo ?? [],
    };
  }
  // ถ้าไม่มีข้อมูล
  return {
    name: '',
    todo: [],

    // const user = await getDocs(userCollection);

    // console.log(user);
    // const snapshot = await getDoc(userDoc);
    // const data = snapshot.data();

    // return data && data.todo ? data.todo : [];
  };
};
