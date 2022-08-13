/* eslint-disable @next/next/no-img-element */
import { ReactElement, useEffect, useState } from "react";
import Default from "src/components/Layout/Default";
import Loading from "src/components/Loading";
import PageHeader from "src/components/PageHeader";
import DataTable, { DataTableProps } from "src/components/Table/DataTable";
import useOrders from "src/hooks/api/order/useOrders";

const Orders = () => {
  const [rows, setRows] = useState<DataTableProps["rows"] | null>();

  const { data: orders, isError } = useOrders();

  const cols = [
    {
      name: "Email",
      row: "email",
    },
    {
      name: "Durum",
      row: "status",
    },
    {
      name: "Tarih",
      row: "updated_at",
    },
    {
      name: "Yorum/Puan",
      row: "comment",
    },
    {
      name: "Tutar",
      row: "paid",
    },
  ];

  useEffect(() => {
    if (orders) {
      setRows(
        orders.map((e) => {
          return [
            {
              render: e.email,
              selector: "email",
            },
            {
              render: e.status.toString(),
              selector: "status",
            },
            {
              render: e.updated_at.toString(),
              selector: "updated_at",
            },
            {
              render: e.comment ? e.comment + " " + e.rate : "-",
              selector: "comment",
            },
            {
              render: e.payment.iyzicoJson.paidPrice + " TRY",
              selector: "paid",
            },
            {
              data: {
                deleteEndpoint: `/category/delete/${e.id}`,
                rowId: e.id.toString(),
              },
              selector: "jsonData",
            },
          ];
        })
      );
    }
  }, [orders]);

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <>
      <PageHeader className="pl-4" title={"Siparişler"} />
      <div className="p-4">
        {orders && rows ? (
          <DataTable
            onClickEdit={() => {}}
            className="mt-2"
            rows={rows}
            cols={cols}
          />
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default Orders;

Orders.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>;
};
