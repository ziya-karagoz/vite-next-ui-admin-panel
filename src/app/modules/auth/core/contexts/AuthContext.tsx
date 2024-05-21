import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import * as authHelper from "@app/modules/auth/core/functions/auth.functions";
import { WithChildren } from "@base/helpers/components/WithChildren";
import { ICurrentUser, ILogoutOptions } from "../models/auth.interfaces";
import { fetchCurrentUser } from "../api/auth.requests";
import { swal } from "@base/components/common/swal/SwalAlert";
import Loader from "@base/layout/components/loader/Loader";

type AuthContextProps = {
  auth: string | undefined;
  saveAuth: (auth: string | undefined, rememberMe?: boolean) => void;
  currentUser: ICurrentUser | undefined;
  setCurrentUser: Dispatch<SetStateAction<ICurrentUser | undefined>>;
  logout: (options: ILogoutOptions) => void;
};

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => { },
  currentUser: undefined,
  setCurrentUser: () => { },
  logout: () => { },
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<string | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<ICurrentUser | undefined>();

  const saveAuth = (auth: string | undefined, rememberMe: boolean = true) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth, rememberMe);
    } else {
      authHelper.removeAuth();
    }
  };

  const logout = ({ alert }: ILogoutOptions) => {
    if (!alert) {
      saveAuth(undefined);
      setCurrentUser(undefined);
      return;
    } else {
      swal
        .fire({
          title: "Çıkış yapmak istediğinize emin misiniz?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Evet, çıkış yap",
          cancelButtonText: "Hayır, iptal et",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            saveAuth(undefined);
            setCurrentUser(undefined);
          }
        });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        saveAuth,
        currentUser,
        setCurrentUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth, logout, setCurrentUser } = useAuth();
  const didRequest = useRef(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  // We should request user by authToken (IN OUR EXAMPLE IT'S access_token) before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          const user = await fetchCurrentUser();
          if (user) {
            setCurrentUser(user);
          }
        }
      } catch (error) {
        console.error(error);
        if (!didRequest.current) {
          logout({ alert: false });
        }
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true);
    };

    if (auth) {
      requestUser();
    } else {
      logout({ alert: false });
      setShowSplashScreen(false);
    }
  }, []);

  return showSplashScreen ? <Loader /> : <>{children}</>;
};

export { AuthProvider, AuthInit, useAuth };
