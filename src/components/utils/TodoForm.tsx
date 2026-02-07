import { useForm, type SubmitHandler } from "react-hook-form";
import { TodoFormInput } from "../utils";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import {
  createTodoThunk,
  updateTodoThunk,
} from "../../redux/features/todoSlice";
import { useEffect } from "react";

export type TodoFormInputs = {
  task: string;
  description: string;
  isImportant: boolean;
};

interface TodoFormProps {
  todo?: Partial<TodoFormInputs>;
  rowId?: string;
  onFinishEdit?: () => void;
}

const TodoForm = ({ todo, rowId, onFinishEdit }: TodoFormProps) => {
  const { register, handleSubmit, control, reset } = useForm<TodoFormInputs>({
    defaultValues: {
      task: todo?.task || "",
      description: todo?.description || "",
      isImportant: todo?.isImportant || false,
    },
  });

  const dispatch = useAppDispatch();

  const { userData } = useAppSelector((state) => state.auth);

  const submitForm: SubmitHandler<TodoFormInputs> = async (
    data,
  ): Promise<void> => {
    if (!userData) return;

    console.log(data);

    if (todo && rowId) {
      try {
        await dispatch(
          updateTodoThunk({
            rowId,
            data: {
              title: data.task,
              content: data.description,
              isImportant: data.isImportant,
            },
          }),
        ).unwrap();
        onFinishEdit?.();
        return;
      } catch (error) {
        console.log(error);
        reset();
        throw error;
      }
    }

    try {
      await dispatch(
        createTodoThunk({
          title: data.task,
          content: data.description,
          isImportant: data.isImportant,
          isCompleted: false,
          userId: userData.$id,
        }),
      ).unwrap();
      reset();
      return;
    } catch (error) {
      console.log(error);
      reset();
      return;
    }
  };

  useEffect(() => {
    if (todo) {
      reset({
        task: todo?.task || "",
        description: todo?.description || "",
        isImportant: todo?.isImportant || false,
      });
    } else {
      reset({
        task: "",
        description: "",
        isImportant: false,
      });
    }
  }, [todo, reset]);

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="bg-amber-800 rounded-md w-2/5 p-4 flex flex-col gap-8"
    >
      <div className="flex flex-col gap-4">
        <TodoFormInput
          name="task"
          control={control}
          placeholder="Enter Task..."
        />
        <TodoFormInput
          name="description"
          control={control}
          placeholder="Description..."
          multiline
          className="h-100"
        />
        <div className="flex items-center gap-2 text-xl text-orange-50 font-semibold">
          <div className="relative w-6 h-6">
            <input
              type="checkbox"
              id="important-task"
              className="peer w-full h-full outline-none appearance-none bg-orange-50 border-none checked:bg-red-500 rounded cursor-pointer"
              {...register("isImportant")}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg pointer-events-none opacity-0 peer-checked:opacity-100">
              !
            </span>
          </div>
          <label htmlFor="important-task" className="cursor-pointer">
            Important
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="bg-amber-400 px-8 py-2 text-xl font-semibold text-amber-950 rounded-lg self-center hover:bg-amber-300"
      >
        {todo ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TodoForm;
