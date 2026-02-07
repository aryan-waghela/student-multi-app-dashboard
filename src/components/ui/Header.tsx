import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container } from "../ui";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { logoutThunk } from "../../redux/features/authSlice";

type NavItems = {
  id: number;
  name: string;
  path: string;
};

const Header = () => {
  const navList: NavItems[] = [
    {
      id: 1,
      name: "Todo",
      path: "/todo",
    },
    {
      id: 2,
      name: "Daily Planner",
      path: "/daily-planner",
    },
    {
      id: 3,
      name: "Motivation",
      path: "/motivation",
    },
    {
      id: 4,
      name: "Pomodoro Timer",
      path: "/pomodoro-timer",
    },
    {
      id: 5,
      name: "Daily Goals",
      path: "/daily-goals",
    },
  ];

  const { userStatus } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (userStatus) {
      return await dispatch(logoutThunk());
    }

    return navigate("/login");
  };

  return (
    <header className="pt-4 mb-12">
      <nav className="py-4 px-8 w-fit mx-auto bg-orange-50 rounded-full">
        <Container>
          <div className="flex items-center justify-between select-none">
            <Link to="/" className="text-2xl font-bold">
              Acadly<span className="text-red-600">.</span>
            </Link>
            <ul className="flex gap-4 font-semibold">
              {navList.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `${isActive ? "bg-orange-200 text-black" : "bg-transparent text-gray-700"} px-4 py-2 rounded-full hover:bg-orange-200 hover:text-black ease-in duration-200 `
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <button
              onClick={handleClick}
              className="bg-orange-700 px-6 py-2 text-orange-50 rounded-full font-semibold cursor-pointer"
            >
              {userStatus ? "Logout" : "Login"}
            </button>
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default Header;
