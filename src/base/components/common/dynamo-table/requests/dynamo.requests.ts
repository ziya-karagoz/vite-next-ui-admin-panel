import api from "../../../../helpers/enhencers/Interceptor";
import { IColumnFilterParams, IFilterResponse } from "../types/dynamo-table.types";


const baseUrl = import.meta.env.VITE_API_URL;

export function fetchColumnFilter(
  params: IColumnFilterParams
): Promise<IFilterResponse> {
  return new Promise((resolve, reject) => {
    api
      .get(`${baseUrl}/api/backoffice/${params.path}`, {
        params: Object.fromEntries(
          Object.entries(params).filter(([key]) => key !== "path")
        ),
      })
      .then((response: any) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
