import { Outlet } from "react-router-dom";
import { Header } from "./components/ui";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="h-full flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
