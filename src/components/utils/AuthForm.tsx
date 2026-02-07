import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import loginSvg from "../../assets/login.svg";
import signupSvg from "../../assets/sign-up.svg";
import { Container } from "../ui";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiEyeFill, RiEyeOffFill } from "@remixicon/react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { loginThunk, signupThunk } from "../../redux/features/authSlice";

interface AuthFormProps {
  type?: "login" | "signup";
}

const signupSchema = z.object({
  firstName: z
    .string("Name must be a string")
    .min(3, "name be of 3 chars atleast"),
  lastName: z
    .string("Name must be a string")
    .min(3, "name be of 3 chars atleast"),
  email: z.email("Invalid email"),
  password: z
    .string()
    .regex(
      /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g,
      "Invalid Password",
    ),
});

const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z
    .string()
    .regex(
      /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g,
      "Invalid Password",
    ),
});

type SignupData = z.infer<typeof signupSchema>;
type LoginData = z.infer<typeof loginSchema>;

type FormData = SignupData | LoginData;

const AuthForm = ({ type = "login" }: AuthFormProps) => {
  const schema = type === "login" ? loginSchema : signupSchema;
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || "/";

  const handleAuthSubmit: SubmitHandler<FormData> = async (data) => {
    if (type === "login") {
      const loginData = data as LoginData;
      try {
        await dispatch(
          loginThunk({
            email: loginData.email,
            password: loginData.password,
          }),
        ).unwrap();
        reset();
        navigate(from, { replace: true });
      } catch (error) {
        setError("root", {
          message: typeof error === "string" ? error : "Failed to log in user",
        });
      }
    } else if (type === "signup") {
      const signupData = data as SignupData;
      try {
        await dispatch(
          signupThunk({
            email: signupData.email,
            password: signupData.password,
            name: `${signupData.firstName} ${signupData.lastName}`,
          }),
        ).unwrap();
        reset();
        navigate(from, { replace: true });
      } catch (error) {
        setError("root", {
          message: typeof error === "string" ? error : "Failed to Sign up user",
        });
      }
    }

    return;
  };

  useEffect(() => {
    reset();
  }, [type, reset]);

  return (
    <Container>
      <div className="w-[50%] mx-auto flex flex-col gap-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center justify-center w-16 p-4 overflow-hidden rounded-full aspect-square bg-amber-100">
            <img
              src={type === "login" ? loginSvg : signupSvg}
              alt="login"
              className="object-cover object-center opacity-80"
            />
          </div>
          <h2 className="text-4xl font-bold">
            {type === "login" ? "Login to your account" : "Create an account"}
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(handleAuthSubmit)}
          className="flex flex-col items-center gap-8"
        >
          {type === "signup" && (
            <div className="flex w-full gap-8">
              <label
                htmlFor="first-name"
                className="relative flex-1 p-4 text-xl border border-gray-400 rounded-lg hover:border-gray-700"
              >
                <input
                  id="first-name"
                  type="text"
                  placeholder=""
                  className="w-full bg-transparent border-none outline-none peer"
                  {...register("firstName")}
                />
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white px-1 text-gray-500 transition-all duration-200 peer-focus:top-0 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-orange-700 peer-[:not(:placeholder-shown)]:top-0
              peer-[:not(:placeholder-shown)]:font-semibold
              peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-orange-700"
                >
                  First Name
                </span>
                <p className="absolute left-0 right-0 text-sm text-red-500 translate-y-1/2 -bottom-3">
                  {(errors as FieldErrors<SignupData>).firstName?.message || ""}
                </p>
              </label>
              <label
                htmlFor="last-name"
                className="relative flex-1 p-4 text-xl border border-gray-400 rounded-lg hover:border-gray-700"
              >
                <input
                  id="last-name"
                  type="text"
                  placeholder=""
                  className="w-full bg-transparent border-none outline-none peer"
                  {...register("lastName")}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 bg-white px-1 text-gray-500 transition-all duration-200 peer-focus:top-0 peer-focus:text-sm peer-focus:font-semibold peer-[:not(:placeholder-shown)]:font-semibold peer-focus:text-orange-700 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-orange-700">
                  Last Name
                </span>
                <p className="absolute left-0 right-0 text-sm text-red-500 translate-y-1/2 -bottom-3">
                  {(errors as FieldErrors<SignupData>).lastName?.message || ""}
                </p>
              </label>
            </div>
          )}
          <div className="flex flex-col w-full gap-8">
            <label
              htmlFor="email"
              className="relative flex-1 p-4 text-xl border border-gray-400 rounded-lg hover:border-gray-700"
            >
              <input
                id="email"
                type="text"
                placeholder=""
                className="w-full bg-transparent border-none outline-none peer"
                {...register("email")}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 bg-white px-1 text-gray-500 transition-all duration-200 peer-focus:top-0 peer-focus:text-sm peer-focus:font-semibold peer-[:not(:placeholder-shown)]:font-semibold peer-focus:text-orange-700 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-orange-700">
                Email
              </span>
              <p className="absolute left-0 right-0 text-sm text-red-500 translate-y-1/2 -bottom-3">
                {errors.email ? errors.email.message : ""}
              </p>
            </label>
            <label
              htmlFor="password"
              className="relative flex-1 p-4 text-xl border border-gray-400 rounded-lg hover:border-gray-700"
            >
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder=""
                className="w-full bg-transparent border-none outline-none peer"
                {...register("password")}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 bg-white px-1 text-gray-500 transition-all duration-200 peer-focus:top-0 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-orange-700 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-orange-700 peer-[:not(:placeholder-shown)]:font-semibold">
                Password
              </span>
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="flex items-center justify-center gap-2 absolute right-4 top-1/2 -translate-y-1/2 bg-white px-1 text-gray-500 transition-all duration-200 peer-focus:top-0 peer-focus:text-sm peer-focus:font-semibold peer-focus:text-orange-700 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-orange-700 peer-[:not(:placeholder-shown)]:font-semibold cursor-pointer"
              >
                {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
              </button>
              <p className="absolute left-0 right-0 text-sm text-red-500 translate-y-1/2 -bottom-3">
                {errors.password ? errors.password.message : ""}
              </p>
            </label>
          </div>
          <p className="text-lg text-red-500">
            {errors.root ? errors.root.message : ""}
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 text-xl font-semibold text-white bg-orange-600 rounded-lg cursor-pointer active:bg-orange-500 disabled:bg-orange-400 disabled:cursor-not-allowed"
          >
            {type === "login" && !isSubmitting
              ? "Login"
              : type === "signup" && !isSubmitting
                ? "signup"
                : "submitting"}
          </button>
        </form>
      </div>
      <p className="mx-auto mt-8 text-lg font-semibold w-fit">
        {type === "login"
          ? "Don't have an account? "
          : "Already have an account? "}
        <span className="text-orange-700">
          <Link to={type === "login" ? "/signup" : "/login"}>
            {type === "login" ? "Register" : "Sign In"}
          </Link>
        </span>
      </p>
    </Container>
  );
};

export default AuthForm;
