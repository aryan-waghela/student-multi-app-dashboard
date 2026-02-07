import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./Layout.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  DailyGoals,
  DailyPlanner,
  Home,
  Motivation,
  Pomodoro,
  Signin,
  Signup,
  Todo,
} from "./pages";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { checkAuthThunk } from "./redux/features/authSlice";
import AuthLayout from "./components/utils/AuthLayout.tsx";
import { todoLoader } from "./components/utils";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route
        path="todo"
        element={
          <AuthLayout>
            <Todo />
          </AuthLayout>
        }
        loader={todoLoader}
      />
      <Route
        path="daily-planner"
        element={
          <AuthLayout>
            <DailyPlanner />
          </AuthLayout>
        }
      />
      <Route
        path="motivation"
        element={
          <AuthLayout>
            <Motivation />
          </AuthLayout>
        }
      />
      <Route
        path="pomodoro-timer"
        element={
          <AuthLayout>
            <Pomodoro />
          </AuthLayout>
        }
      />
      <Route
        path="daily-goals"
        element={
          <AuthLayout>
            <DailyGoals />
          </AuthLayout>
        }
      />
      <Route
        path="login"
        element={
          <AuthLayout authentication={false}>
            <Signin />
          </AuthLayout>
        }
      />
      <Route
        path="signup"
        element={
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        }
      />
    </Route>,
  ),
);

// Dispatch auth check before initial render so refresh preserves auth state
(async () => {
  try {
    await store.dispatch(checkAuthThunk());
  } catch (e) {
    console.log(e);
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>,
  );
})();
