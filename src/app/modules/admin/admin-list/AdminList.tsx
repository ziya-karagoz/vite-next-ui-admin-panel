import React from "react";
import { FetchStatus } from "@base/enums/api.enum";
import { fetchAdmins } from "../core/api/admin.request";
import { IAdminResponseP } from "../core/models/admin.interface";
import Loader from "@base/layout/components/loader/Loader";
import { PageableResponseModel } from "@app/core/models/app.interfaces";

import DynamoTable from "@base/components/common/dynamo-table/DynamoTable";
import { useSearchParams } from "react-router-dom";
import {
  EColumnType,
  EFilterType,
  IColumn,
} from "@base/components/common/dynamo-table/types/dynamo-table.types";

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
      type: EColumnType.OPERATIONS,
      label: "İşlemler",
    },
    {
      key: "image",
      label: "",
      type: EColumnType.PROFILE,
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
      type: EColumnType.CHIP,
      filterOptions: [
        {
          value: true,
          name: "active",
          label: "Active",
        },
        {
          value: false,
          name: "passive",
          label: "Inactive",
        },
      ],
      columnConfig: {
        chip: {
          color: {
            true: "success",
            false: "danger",
          },
          text: {
            true: "Active",
            false: "Inactive",
          },
        },
      },
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
        filterPath="customer"
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
