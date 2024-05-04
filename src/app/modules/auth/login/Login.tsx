import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../core/contexts/AuthContext";
import { ILoginRequest } from "../core/models/auth.interfaces";
import { fetchCurrentUser, login } from "../core/api/auth.requests";
import { swal } from "@base/components/common/swal/SwalAlert";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import AppLogo from "@app/core/components/AppLogo";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { saveAuth, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const handleLogin = async ({
    email,
    password,
    rememberMe,
  }: ILoginRequest) => {
    const { accessToken } = await login(email, password).catch((error) => {
      swal.fire({
        title: "Hata",
        text:
          error.response?.data?.message ||
          "Bir hata oluştu. Lütfen tekrar deneyin.",
        icon: "error",
      });
      throw error;
    });
    saveAuth(accessToken, rememberMe);
    const user = await fetchCurrentUser();
    setCurrentUser(user);
    navigate("/anasayfa");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <div className="flex min-h-screen w-full justify-around items-center px-6 gap-2 py-12 lg:px-8">
      <Card className="mt-10 w-full md:w-6/12 lg:w-5/12">
        <CardBody className="p-10">
          <div className="flex justify-start items-center mb-4">
            <AppLogo className="w-8 h-8" />{" "}
            <span className="text-lg font-bold ml-2">Splintern Co.</span>
          </div>
          <h1 className="text-2xl font-bold mb-1.5">Sign in to your account</h1>
          <span className="text-sm  mb-6">
            Start your website in seconds. Don’t have an account?{" "}
            <Link
              href="/kayit-ol"
              className="text-primary font-semibold text-sm"
            >
              Sign up
            </Link>
          </span>
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Input
                type="email"
                label="Email"
                name="email"
                variant="flat"
                size="sm"
                value={formik.values.email}
                onChange={formik.handleChange}
                isInvalid={!!formik.touched.email && !!formik.errors.email}
                errorMessage={formik.errors.email}
              />

              <Input
                type={isVisible ? "text" : "password"}
                label="Password"
                className="animation-wiggle"
                name="password"
                variant="flat"
                size="sm"
                value={formik.values.password}
                onChange={formik.handleChange}
                isInvalid={!!formik.touched.password && !!formik.errors.password}
                errorMessage={formik.errors.password}
                endContent={
                  <button
                    className="focus:outline-none hover:animate-wiggle"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <Icon
                        icon="heroicons:eye-slash-16-solid"
                        width="1.2rem"
                        height="1.2rem"
                        className="text-2xl text-default-400 pointer-events-none"
                      />
                    ) : (
                      <Icon
                        icon="heroicons:eye-16-solid"
                        width="1.2rem"
                        height="1.2rem"
                        className="text-2xl text-default-400 pointer-events-none"
                      />
                    )}
                  </button>
                }
              />
            </div>

            {/* Or Divider */}
            <div className="flex items-center justify-between">
              <div className="w-full h-0.5 bg-default-200 dark:bg-default-100"></div>
              <span className="text-gray-500 text-base mx-4">or</span>
              <div className="w-full h-0.5 bg-default-200 dark:bg-default-100"></div>
            </div>

            {/* Sign in with google, and apple */}
            <Button
              variant="bordered"
              color="default"
              className="w-full"
              startContent={
                <Icon
                  icon="flat-color-icons:google"
                  width="1.2rem"
                  height="1.2rem"
                />
              }
            >
              Sign in with Google
            </Button>
            <Button
              variant="bordered"
              color="default"
              className="w-full"
              startContent={
                <Icon icon="logos:apple" width="1.2rem" height="1.2rem" />
              }
            >
              Sign in with Apple
            </Button>

            {/* Remember me and forgot password with between */}
            <div className="flex justify-between items-center">
              <Checkbox
                name="rememberMe"
                isSelected={formik.values.rememberMe}
                onChange={formik.handleChange}
              >
                Remember me
              </Checkbox>
              <Link
                href="/sifremi-unuttum"
                className="text-primary text-sm font-semibold"
              >
                Forgot password?
              </Link>
            </div>

            <div>
              <Button
                type="submit"
                variant="solid"
                className="w-full"
                color="primary"
              >
                Sign into your account
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
      <section className="hidden md:block md:w-4/12">
        <img
          className="object-contain md:object-scale-down"
          src="/icons/illustrations/1.svg"
          alt="login"
        />
      </section>
    </div>
  );
};

export default Login;
