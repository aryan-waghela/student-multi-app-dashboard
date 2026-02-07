import { Outlet } from "react-router-dom";
import { Header } from "./components/ui";
import { useAppDispatch } from "./redux/hooks/hooks";
import { useEffect } from "react";
import { checkAuthThunk } from "./redux/features/authSlice";

const Layout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      dispatch(checkAuthThunk()).unwrap();
    } catch (error) {
      console.log(
        error instanceof Error ? error.message : "Error in checkAuthThunk",
      );
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
