import { FetchListParams } from "@base/enums/api.interface";
import api from "@base/helpers/enhencers/Interceptor";
import {
  IAdminCreateRequest,
  IAdminResponseP,
  IAdminUpdatePasswordRequest,
  IAdminUpdateRequest,
} from "../models/admin.interface";
import { PageableResponseModel } from "@app/core/models/app.interfaces";

const API_URL = import.meta.env.VITE_API_URL;
const PREFIX = "bank";

// Get Pageable Admins
export function fetchAdmins({
  skip,
  take,
  sort,
  filter,
}: FetchListParams): Promise<PageableResponseModel<IAdminResponseP>> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}`, {
    params: {
      skip,
      take,
      sort,
      filter,
    },
  });
}

// Add Admin
export function addAdmin(data: IAdminCreateRequest): Promise<any> {
  return api.post(`${API_URL}/api/backoffice/${PREFIX}`, data);
}

// Get Single Admin
export function getAdmin(id: number): Promise<IAdminResponseP> {
  return api.get(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Update Admin
export function updateAdmin({
  id,
  data,
}: {
  id: number;
  data: IAdminUpdateRequest;
}): Promise<any> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}`, data);
}

// Delete Admin
export function deleteAdmin(id: number): Promise<any> {
  return api.delete(`${API_URL}/api/backoffice/${PREFIX}/${id}`);
}

// Update Admin's Password
export function updateAdminPassword({
  id,
  data,
}: {
  id: number;
  data: IAdminUpdatePasswordRequest;
}): Promise<any> {
  return api.put(`${API_URL}/api/backoffice/${PREFIX}/${id}/password`, data);
}
