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
  IConditionLogic,
} from "@base/components/common/dynamo-table/types/dynamo-table.types";
import { ERole } from "@base/enums/role.enum";
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
      type: EColumnType.OPERATIONS,
      label: "Operations",
      operations: [
        {
          name: "edit",
          icon:  <Icon icon="fluent:edit-48-filled" />,
          text: "Düzenle",
          handle: ()=>{console.log("edit")},
          role: ERole.AdminUpdate,
          conditions: [
            {
              key: "account_status",
              value: true,
              logic: IConditionLogic.EQUAL,
            }
          ]
        },
        {
          name: "delete",
          icon:  <Icon icon="ic:round-delete" />,
          text: "Sil",
          handle: ()=>{console.log("delete")},
          role: ERole.AdminDelete,
        },
        {
          name: "adminSettings",
          icon: <Icon icon="tabler:lock-filled" />,
          text: "Yönetici Ayarları",
          handle: ()=>{console.log("adminSettings")},
          role: ERole.AdminUpdate,
        },
        {
          name: "password",
          icon: <Icon icon="bx:bxs-lock-alt" />,
          text: "Şifre Güncelle",
          handle: ()=>{console.log("password")},
          role: ERole.AdminUpdate,
        },
      ],
    },
    {
      key: "image",
      label: "",
      type: EColumnType.IMAGE,
    },
    {
      key: "company_name",
      label: "Comapny",
      filterType: EFilterType.SELECT,
      customCell: (row) => (
        <div>
          {row.company_name}
          <br />
          {row.email}
        </div>
      ),
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
      config: {
        chip: {
          variant: "dot",
          size: "sm",
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
      key: "type",
      label: "ACCOUNT STATUS",
      type: EColumnType.CHIP,
      filterOptions: [
        {
          value: "individual",
          name: "individual",
          label: "Individual",
        },
        {
          value: "corporate",
          name: "corporate",
          label: "Corporate",
        },
      ],
      config: {
        chip: {
          variant: "solid",
          size: "sm",
          color: {
            individual: "warning",
            corporate: "primary",
          },
          text: {
            individual: "Individual",
            corporate: "Corporate",
          },
        },
      },
      filterType: EFilterType.STATIC_SELECT,
    },

    {
      key: "created_at",
      label: "CREATED AT",
      filterType: EFilterType.DATE,
      config: {
        date: {
          format: 'DD MMM YYYY, HH:mm',
        }
      },
      type: EColumnType.DATE,
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
          { id: "company_name", type: "string" },
        ]}
      />
    )
  );
};

export default AdminList;
