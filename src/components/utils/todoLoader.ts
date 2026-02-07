import { checkAuthThunk } from "../../redux/features/authSlice";
import { listTodosThunk } from "../../redux/features/todoSlice";
import { store } from "../../redux/store/store";

export const todoLoader = async (): Promise<null> => {
  try {
    await store.dispatch(checkAuthThunk()).unwrap();
    const status = store.getState().auth.userStatus;
    if (!status) return null;

    await store.dispatch(listTodosThunk()).unwrap();
    return null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
