import React from "react";
import { FetchStatus } from "@base/enums/api.enum";
import { fetchAdmins } from "../core/api/admin.request";
import { IAdminResponseP } from "../core/models/admin.interface";
import Loader from "@base/layout/components/loader/Loader";
import { PageableResponseModel } from "@app/core/models/app.interfaces";

import DynamoTable from "@base/components/common/dynamo-table/DynamoTable";
import { useSearchParams } from "react-router-dom";
import {
  EFilterType,
  IColumn,
} from "@base/components/common/dynamo-table/types/dynamo-table.types";
import { Icon } from "@iconify/react/dist/iconify.js";

const AdminList = () => {
  const [adminListResponse, setAdminListResponse] = React.useState<
    PageableResponseModel<IAdminResponseP> | undefined
  >();
  const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
    FetchStatus.IDLE
  );

  const [searchParams] = useSearchParams();
  const skip = parseInt(searchParams.get("skip") ?? "1");
  const take = parseInt(searchParams.get("take") ?? "10");
  const sort = searchParams.get("sort") ?? undefined;
  const filter = searchParams.get("filter") ?? "[]";

  React.useEffect(() => {
    setFetchStatus(FetchStatus.LOADING);
    fetchAdmins({ skip, take, sort, filter })
      .then((res) => {
        setFetchStatus(FetchStatus.SUCCEEDED);
        setAdminListResponse(res);
      })
      .catch(() => {
        setFetchStatus(FetchStatus.FAILED);
      });
  }, [skip, take, sort, filter]);

  const columns: IColumn[] = [
    {
      key: "id",
      label: "ID",
      filterType: EFilterType.NUMBER,
      filterConfig: {
        numberFilterAdornment: "₺",
      },
    },
    {
      key: "first_name",
      label: "NAME",
      filterType: EFilterType.SELECT,
    },
    {
      key: "last_name",
      label: "SURNAME",
      filterType: EFilterType.SELECT,
    },
    {
      key: "account_status",
      label: "ACCOUNT STATUS",
      filterType: EFilterType.STATIC_SELECT,
    },

    {
      key: "created_at",
      label: "CREATED AT",
      filterType: EFilterType.DATE,
    },
  ];

  if (fetchStatus === FetchStatus.IDLE) return <Loader isComponent />;

  return (
    adminListResponse && (
      <DynamoTable
        filterPath="admin"
        title="Yöneticiler"
        meta={adminListResponse?.meta}
        columns={columns}
        rows={adminListResponse.items}
        loadStatus={fetchStatus}
        searchColumns={[
          { id: "first_name", type: "string" },
          { id: "last_name", type: "string" },
        ]}
      />
    )
  );
};

export default AdminList;
