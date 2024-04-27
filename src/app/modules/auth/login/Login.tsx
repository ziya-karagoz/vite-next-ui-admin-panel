import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../core/contexts/AuthContext";
import { ILoginRequest } from "../core/models/auth.interfaces";
import { fetchCurrentUser, login } from "../core/api/auth.requests";
import { swal } from "@base/components/common/swal/SwalAlert";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  //password: Yup.string().required("Password is required"),
});


const Login = () => {
  const { saveAuth, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async ({ email, password, rememberMe }: ILoginRequest) => {

    const { accessToken } = await login(email, password).catch((error) => {
      swal.fire({
        title: "Hata",
        text: error.response?.data?.message || "Bir hata oluştu. Lütfen tekrar deneyin.",
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
      <Helmet>
        <title> Konutkonfor Admin | Login </title>
      </Helmet>
      <section className="bg-gray-50 h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-red-900"
          >
            <svg className="w-12 h-12 me-2" width="142" height="142" viewBox="0 0 142 142" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_547_588)">
                <path d="M69.2 72L58 60.7H38.5L70.9 97.7L129.8 13.7V0L69.2 72Z" fill="#7F2629" />
                <path d="M111.5 56.7C113.3 61.5 114.3 66.6 114.3 72C114.3 96 94.9 115.5 70.8 115.5C46.8 115.5 27.2999 96 27.2999 72C27.2999 48 46.8 28.5 70.8 28.5C77.5 28.5 83.8 30 89.4 32.7L106.6 12.2C96.2 5.99999 84 2.39999 70.8 2.39999C32.4 2.39999 1.19995 33.6 1.19995 72.1C1.19995 110.6 32.4 141.8 70.9 141.8C109.4 141.8 140.6 110.6 140.6 72.1C140.6 57.5 136.1 44 128.4 32.8L111.5 56.7Z" fill="#E61111" />
              </g>
              <defs>
                <clipPath id="clip0_547_588">
                  <rect width="141.7" height="141.7" fill="white" />
                </clipPath>
              </defs>
            </svg>

            Konutkonfor
          </a>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Hesabına Giriş Yap
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Eposta adresin
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5"
                    placeholder="name@company.com"
                  />
                  {
                    formik.touched.email && formik.errors.email ? (
                      <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
                    ) : null
                  }
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Şifren
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 pr-10"
                  />
                  {
                    formik.touched.password && formik.errors.password ? (
                      <p className="mt-2 text-sm text-red-600">{formik.errors.password}</p>
                    ) : null
                  }

                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        name="rememberMe"
                        checked={formik.values.rememberMe}
                        onChange={formik.handleChange}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-red-300 accent-red-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500"
                      >
                        Beni Hatırla
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-600 hover:underline"
                  >
                    Şifreni mi unuttun?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none disabled:bg-red-400 focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  disabled={!formik.isValid}
                >
                  Giriş Yap
                </button>
                <p className="text-sm font-light text-gray-500">
                  Hesabın yok mu?{" "}
                  <a
                    href="#"
                    className="font-medium text-gray-600 hover:underline"
                  >
                    Kayıt ol
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
