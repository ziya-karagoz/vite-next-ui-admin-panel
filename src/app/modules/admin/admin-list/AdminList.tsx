import React from "react";
import { FetchStatus } from "@base/enums/api.enum";
import { fetchAdmins } from "../core/api/admin.request";
import { IAdminResponseP } from "../core/models/admin.interface";
import Loader from "@base/layout/components/loader/Loader";
import { PageableResponseModel } from "@app/core/models/app.interfaces";

import DynamoTable from "@base/components/common/dynamo-table/DynamoTable";
import { useSearchParams } from "react-router-dom";

const AdminList = () => {
  const [adminListResponse, setAdminListResponse] = React.useState<
    PageableResponseModel<IAdminResponseP> | undefined
  >();
  const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
    FetchStatus.IDLE
  );

  const [searchParams] = useSearchParams();
  const skip = parseInt(searchParams.get("skip") ?? "1");
  const take = parseInt(searchParams.get("take") ?? "2");
  const sort = searchParams.get("sort") ?? "";
  const filter = searchParams.get("filter") ?? "[]";

  React.useEffect(() => {
    setFetchStatus(FetchStatus.LOADING);
    fetchAdmins({skip, take, sort, filter})
      .then((res) => {
        setFetchStatus(FetchStatus.SUCCEEDED);
        setAdminListResponse(res);
      })
      .catch(() => {
        setFetchStatus(FetchStatus.FAILED);
      });
  }, [skip, take, sort, filter]);

 

  const columns = [
    {
      key: "first_name",
      label: "NAME",
    },
    {
      key: "last_name",
      label: "SURNAME",
    },
    {
      key: "email",
      label: "email",
    },
  ];

  if (fetchStatus === FetchStatus.IDLE) return <Loader isComponent />;

  return (
    adminListResponse && <DynamoTable  title="Yöneticiler" meta={adminListResponse?.meta} columns={columns} rows={adminListResponse.items} loadStatus={fetchStatus}/>
  );
};

export default AdminList;
