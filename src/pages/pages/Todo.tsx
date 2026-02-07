import { Container, TodoCard } from "../../components/ui";
import { TodoForm } from "../../components/utils";
import {
  deleteTodoThunk,
  updateTodoThunk,
} from "../../redux/features/todoSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import type { TodoRow } from "../../appwrite/todoService";
import { useState } from "react";

const Todo = () => {
  const { todos } = useAppSelector((store) => store.todo);
  const dispatch = useAppDispatch();

  const [editingTodo, setEditingTodo] = useState<TodoRow | null>(null);

  const toggleCompleted = async (todo: TodoRow) => {
    try {
      await dispatch(
        updateTodoThunk({
          rowId: todo.$id,
          data: { ...todo, isCompleted: !todo.isCompleted },
        }),
      ).unwrap();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const deleteCard = async (id: string): Promise<void> => {
    try {
      await dispatch(deleteTodoThunk(id));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <Container>
      <div className="flex gap-8">
        <TodoForm
          todo={
            editingTodo
              ? {
                  task: editingTodo.title,
                  description: editingTodo.content,
                  isImportant: editingTodo.isImportant,
                }
              : undefined
          }
          rowId={editingTodo?.$id}
          onFinishEdit={() => setEditingTodo(null)}
        />
        <div className="flex flex-col gap-4 w-3/5">
          {todos.map((todo) => (
            <TodoCard
              key={todo.$id}
              title={todo.title}
              content={todo.content}
              isImportant={todo.isImportant}
              isCompleted={todo.isCompleted}
              toggleCompleted={() => toggleCompleted(todo)}
              onEdit={() => setEditingTodo(todo)}
              onDelete={() => deleteCard(todo.$id)}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Todo;
