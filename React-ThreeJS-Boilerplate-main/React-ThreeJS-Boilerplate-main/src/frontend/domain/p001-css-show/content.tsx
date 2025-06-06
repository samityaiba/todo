import { useEffect, useState } from 'react';

import {
  GetUserTodos,
  UpdateUserTodo,
} from '../../global/api/firebase/service/firestore';
import { IContentData } from '.';

type UserData = {
  name: string;
  todo: string[];
};

const userId = 'User2'; // เปลี่ยนเป็น user ที่ต้องการ

const Content = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [newTodo, setNewTodo] = useState<string>(''); // สำหรับ input เพิ่ม todo

  useEffect(() => {
    GetUserTodos(userId).then(setUser);
  }, []);

  const handleEdit = (idx: number, value: string) => {
    setEditIdx(idx);
    setEditValue(value);
  };

  const handleSave = async () => {
    if (user && editIdx !== null) {
      const newTodos = [...user.todo];
      newTodos[editIdx] = editValue;
      await UpdateUserTodo(userId, newTodos);
      setUser({ ...user, todo: newTodos });
      setEditIdx(null);
      setEditValue('');
    }
  };

  const handleAddTodo = async () => {
    if (user && newTodo.trim() !== '') {
      const newTodos = [...user.todo, newTodo.trim()];
      await UpdateUserTodo(userId, newTodos);
      setUser({ ...user, todo: newTodos });
      setNewTodo('');
    }
  };

  const handleDelete = async (idx: number) => {
    if (user) {
      const confirmDelete = window.confirm('คุณต้องการลบ ToDo นี้จริงหรือไม่?');
      if (!confirmDelete) return;
      const newTodos = user.todo.filter((_, i) => i !== idx);
      await UpdateUserTodo(userId, newTodos);
      setUser({ ...user, todo: newTodos });
      setEditIdx(null);
      setEditValue('');
    }
  };

  return (
    <div className="h-full w-full bg-white">
      <h2>{user?.name ?? 'Loading...'}</h2>
      <h3>Todo List</h3>
      {/* Add ToDo */}
      <div className="mb-4 flex items-center">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="เพิ่ม ToDo"
          className="border px-2 py-1 mr-2"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-400 px-3 py-1 rounded text-white"
        >
          Add ToDo
        </button>
      </div>
      {/* List */}
      {user && (
        <ul>
          {user.todo.map((item, idx) => (
            <li key={idx} className="mb-2">
              {editIdx === idx ? (
                <>
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="border px-2"
                  />
                  <button onClick={handleSave} className="ml-2 bg-green-400 px-2">
                    บันทึก
                  </button>
                  <button
                    onClick={() => setEditIdx(null)}
                    className="ml-2 bg-gray-300 px-2"
                  >
                    ยกเลิก
                  </button>
                </>
              ) : (
                <>
                  {item}
                  <button
                    onClick={() => handleEdit(idx, item)}
                    className="ml-2 bg-yellow-300 px-2"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="ml-2 bg-red-400 px-2 text-white"
                  >
                    ลบ
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Content;
