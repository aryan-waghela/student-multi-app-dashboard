import { useEffect, type PropsWithChildren } from "react";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "../ui";

interface AuthLayoutProps extends PropsWithChildren {
  authentication?: boolean;
}

const AuthLayout = ({ children, authentication = true }: AuthLayoutProps) => {
  const { userStatus } = useAppSelector((store) => store.auth);

  const isAllowed: boolean = userStatus === authentication;

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (!isAllowed) {
      if (authentication)
        navigate("/login", {
          state: { from: location.pathname },
          replace: true,
        });
      else navigate("/", { replace: true });
    }
  }, [authentication, navigate, isAllowed, userStatus, location]);

  if (!isAllowed)
    return (
      <Container className="h-full flex items-center justify-center">
        <h2 className="mx-auto w-fit text-6xl font-bold text-gray-700 select-none ">
          Loading...
        </h2>
      </Container>
    );

  return <>{children}</>;
};

export default AuthLayout;
