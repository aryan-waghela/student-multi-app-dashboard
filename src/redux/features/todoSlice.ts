import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppwriteException, type Models } from "appwrite";
import todoService, {
  type TodoModel,
  type UpdateTodo,
} from "../../appwrite/todoService";

type Todo = Models.Row & {
  title: string;
  content: string;
  isCompleted: boolean;
  isImportant: boolean;
  userId: string;
};

interface TodoInitialState {
  todos: Todo[];
  status: "idle" | "loading" | "success" | "error";
  error: string;
}

const initialState: TodoInitialState = {
  todos: [],
  status: "idle",
  error: "",
};

const ERROR = {
  FETCH: "Failed to fetch todos",
  CREATE: "Failed to create todo",
  UPDATE: "Failed to update todo",
  DELETE: "Failed to delete todo",
} as const;

const listTodosThunk = createAsyncThunk<
  Models.RowList<Todo>,
  void,
  { rejectValue: string }
>("todo/listTodosThunk", async (_, { rejectWithValue }) => {
  try {
    const response = await todoService.listTodos();
    return response as Models.RowList<Todo>;
  } catch (error) {
    return rejectWithValue(
      error instanceof AppwriteException ? error.message : ERROR.FETCH,
    );
  }
});

const createTodoThunk = createAsyncThunk<
  Todo,
  TodoModel,
  { rejectValue: string }
>("todo/createTodoThunk", async (data, { rejectWithValue }) => {
  try {
    return await todoService.createTodo(data);
  } catch (error) {
    return rejectWithValue(
      error instanceof AppwriteException ? error.message : ERROR.CREATE,
    );
  }
});

const updateTodoThunk = createAsyncThunk<
  Todo,
  { rowId: string; data: UpdateTodo },
  { rejectValue: string }
>("todo/updateTodoThunk", async ({ rowId, data }, { rejectWithValue }) => {
  try {
    return await todoService.updateTodo(rowId, data);
  } catch (error) {
    return rejectWithValue(
      error instanceof AppwriteException ? error.message : ERROR.UPDATE,
    );
  }
});

const deleteTodoThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("todo/deleteTodoThunk", async (rowId, { rejectWithValue }) => {
  try {
    await todoService.deleteTodo(rowId);
    return rowId;
  } catch (error) {
    return rejectWithValue(
      error instanceof AppwriteException ? error.message : ERROR.DELETE,
    );
  }
});

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch Todos
    builder.addCase(listTodosThunk.fulfilled, (state, action) => {
      state.error = "";
      state.todos = action.payload.rows as Todo[];
      state.status = "success";
    });

    builder.addCase(listTodosThunk.rejected, (state) => {
      state.status = "error";
      state.error = ERROR.FETCH;
    });

    // create Todo
    builder.addCase(createTodoThunk.fulfilled, (state, action) => {
      state.error = "";
      state.todos.unshift(action.payload);
      state.status = "success";
    });

    builder.addCase(createTodoThunk.rejected, (state) => {
      state.status = "error";
      state.error = ERROR.CREATE;
    });

    // Update Todo
    builder.addCase(updateTodoThunk.fulfilled, (state, action) => {
      state.error = "";
      const updatedTodo = action.payload;

      const index = state.todos.findIndex(
        (todo) => todo.$id === action.payload.$id,
      );

      if (index !== -1) {
        state.todos[index] = updatedTodo;
      }
      state.status = "success";
    });

    builder.addCase(updateTodoThunk.rejected, (state) => {
      state.status = "error";
      state.error = ERROR.UPDATE;
    });

    // Delete Todo
    builder.addCase(deleteTodoThunk.fulfilled, (state, action) => {
      state.error = "";
      const id = action.payload;

      const index = state.todos.findIndex((todo) => todo.$id === id);

      if (index !== -1) {
        state.todos.splice(index, 1);
      }

      state.status = "success";
    });

    builder.addCase(deleteTodoThunk.rejected, (state) => {
      state.status = "error";
      state.error = ERROR.DELETE;
    });

    // Global Pending
    builder.addMatcher(
      (action) =>
        action.type.startsWith("todo") && action.type.endsWith("/pending"),
      (state) => {
        state.status = "loading";
        state.error = "";
      },
    );
  },
});

export { listTodosThunk, createTodoThunk, updateTodoThunk, deleteTodoThunk };

export default todoSlice.reducer;
