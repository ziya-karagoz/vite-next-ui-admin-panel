import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../core/contexts/AuthContext";
import { ILoginRequest } from "../core/models/auth.interfaces";
import { fetchCurrentUser, login } from "../core/api/auth.requests";
import { swal } from "@base/components/common/swal/SwalAlert";
import { Button, Card, CardBody, Input } from "@nextui-org/react";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  //password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { saveAuth, setCurrentUser } = useAuth();
  const navigate = useNavigate();

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
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
        </div>

        <Card className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <CardBody>
          <h2 className="mb-4 text-center text-2xl font-bold leading-9 tracking-tight ">
            Sign in to your account
          </h2>
            <form className="space-y-6" action="#" method="POST">
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                errorMessage={formik.touched.email && formik.errors.email}
              />

              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                errorMessage={formik.touched.password && formik.errors.password}
              />

              <div>
                <Button
                  type="submit"
                  variant="solid"
                  className="w-full"
                  color="primary"
                >
                  Sign in
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Login;
