export interface ILoginRequest {
    email: string;
    password: string;
    rememberMe: boolean;
  }
  
  export interface ILoginResponse {
    accessToken: string;
    user: ICurrentUser;
  }
  
  
  
  export interface ICurrentUser {
    account_status: boolean;
    created_at: string;
    deleted_at: string;
    email: string;
    first_name: string;
    id: number;
    image: string;
    last_name: string;
    phone: string;
    phone_code: string;
    signout: boolean;
    updated_at: string;
  }
  
  export type ILogoutOptions = {
    alert?: boolean;
  };
  