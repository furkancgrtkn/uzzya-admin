/* eslint-disable @next/next/no-img-element */
import { ReactElement, useEffect, useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
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
      name: "Durum",
      row: "status",
      visible: true,
    },
    {
      name: "Tarih",
      row: "updated_at",
      visible: true,
    },
    {
      name: "Tutar",
      row: "paid",
      visible: true,
    },
    {
      name: "Row Options",
      row: "options",
      visible: false,
    },
  ];

  useEffect(() => {
    if (orders) {
      setRows(
        orders.map((e) => {
          return [
            {
              render: e.status.toString(),
              selector: "status",
            },
            {
              render: new Date(e.updated_at).toLocaleDateString(),
              selector: "updated_at",
            },

            {
              render: e.payment.iyzicoJson.paidPrice + " TRY",
              selector: "paid",
            },
            {
              render: (
                <div className={"ml-auto flex w-min"}>
                  <button
                    onClick={() => router.push(`/orders/${e.id}`)}
                    className={`flex disabled:opacity-70 disabled:cursor-not-allowed items-center px-2 py-[6px] ml-auto text-xs leading-none rounded whitespace-nowrap text-slate-800 bg-slate-200`}
                  >
                    <FontAwesomeIcon icon={faEye} className={`w-3 h-3`} />
                  </button>
                </div>
              ),
              selector: "options",
            },
          ];
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);
  const router = useRouter();
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <>
      <PageHeader className="pl-4" title={"Siparişler"} />
      <div className="p-4">
        {orders && rows ? (
          <DataTable className="mt-2" rows={rows} cols={cols} />
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
