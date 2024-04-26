import axios from "axios";
import api from "@base/helpers/enhencers/Interceptor";
import { ICurrentUser, ILoginResponse } from "../models/auth.interfaces";

const APP_URL = import.meta.env.VITE_API_URL;

export function login(email: string, password: string): Promise<ILoginResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post<ILoginResponse>(`${APP_URL}/api/backoffice/auth/admin/login`, {
        email,
        password,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function fetchCurrentUser(): Promise<ICurrentUser>
{
  return api.get(`${APP_URL}/api/backoffice/admin/current`);
}
