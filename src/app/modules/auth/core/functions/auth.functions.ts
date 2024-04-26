const AUTH_LOCAL_STORAGE_KEY =
  import.meta.env.VITE_AUTH_LOCAL_STORAGE_KEY || "accessToken";
const getAuth = (): string | undefined => {
  if (!localStorage) {
    return;
  }

  const lsValue: string | null =
    localStorage.getItem(AUTH_LOCAL_STORAGE_KEY) ??
    sessionStorage.getItem(AUTH_LOCAL_STORAGE_KEY);

  if (!lsValue) {
    return;
  }

  try {
    const auth: string = lsValue as string;
    if (auth) {
      // You can easily check auth_token expiration also
      return auth;
    }
  } catch (error) {
    console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
  }
};

const setAuth = (auth: string, rememberMe: boolean = true) => {
  if (!localStorage) {
    return;
  }

  try {
    if (rememberMe) {
      localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, auth);
    } else {
      sessionStorage.setItem(AUTH_LOCAL_STORAGE_KEY, auth);
    }
  } catch (error) {
    console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
  }
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("AUTH (LOCAL|SESSION) STORAGE REMOVE ERROR", error);
  }
};

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = "application/json";
  axios.interceptors.request.use(
    (config: { headers: { Authorization: string } }) => {
      const accessToken = getAuth();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (err: any) => Promise.reject(err)
  );
}

export { getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY };
