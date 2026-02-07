import { Controller, type Control, type Path } from "react-hook-form";
import type { TodoFormInputs } from "./TodoForm";

interface TodoFormInputProps {
  control: Control<TodoFormInputs>;
  placeholder: string;
  name: Exclude<Path<TodoFormInputs>, "isImportant">;
  className?: string;
  multiline?: boolean;
}

const TodoFormInput = ({
  control,
  placeholder,
  name,
  className = "",
  multiline,
}: TodoFormInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-2">
          {!multiline ? (
            <input
              type="text"
              className={`bg-orange-50 p-2 text-xl font-semibold rounded outline-none ${className}`}
              placeholder={placeholder}
              {...field}
            />
          ) : (
            <textarea
              className={`bg-orange-50 p-2 text-xl font-semibold rounded outline-none ${className} resize-none scroll-auto
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-amber-300
                [&::-webkit-scrollbar-thumb]:rounded-full
              hover:[&::-webkit-scrollbar-thumb]:bg-amber-400`}
              placeholder={placeholder}
              {...field}
            />
          )}
          {error && (
            <p className="text-yellow-300 capitalize font-semibold">
              {error.message}
            </p>
          )}
        </div>
      )}
      rules={{
        required: `${name} is required !`,
      }}
    />
  );
};

export default TodoFormInput;
