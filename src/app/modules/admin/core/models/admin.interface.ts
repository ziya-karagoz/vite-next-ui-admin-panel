export interface IAdminResponseP {
  account_status: boolean;
  created_at: string;
  email: string;
  first_name: string;
  id: number;
  image?: string;
  last_name: string;
  phone: string;
  phone_code: string;
}

export interface IAdminCreateRequest {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  image: string | null;
  phone: string;
  phone_code: string;
  password: string;
  password_confirm: string;
  account_status: boolean;
}

export interface IAdminUpdateRequest {
  first_name?: string;
  last_name?: string;
  image: string | null;
  email?: string;
  phone?: string;
  phone_code?: string;
  account_status?: boolean;
}

export interface IAdminUpdatePasswordRequest {
  password: string;
  password_confirm: string;
}
