/* eslint-disable @next/next/no-img-element */
import { ReactElement } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Default from "src/components/Layout/Default";
import Loading from "src/components/Loading";
import DataTable, { DataTableProps } from "src/components/Table/DataTable";
import { Order } from "src/hooks/api/order/types";
import useOrders from "src/hooks/api/order/useOrders";

const Orders = () => {
  const { data: orders, isError } = useOrders();

  const columns: DataTableProps<Order>["columns"] = [
    {
      key: "title",
      cell: (row) => <>{row.status}</>,
      header: () => "Status",
      width: "120px",
      maxWidth: "120px",
      sticky: "left",
    },
    {
      key: "actions",
      cell: (row) => (
        <div className={"ml-auto flex w-min"}>
          <button
            onClick={() => {
              router.push(`/orders/${row.id}`);
            }}
            className={`flex disabled:opacity-70 disabled:cursor-not-allowed hover:bg-brand-yellow-primaryLight items-center justify-center w-7 h-7 ml-auto text-xs leading-none rounded whitespace-nowrap text-brand-yellow-primary border border-brand-yellow-primary`}
          >
            <EyeIcon className={`w-3.5 h-3.5`} />
          </button>
        </div>
      ),
      header: () => null,
    },
  ];

  const router = useRouter();
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <>
      <div className="p-4">
        {orders ? <DataTable rows={orders} columns={columns} /> : <Loading />}
      </div>
    </>
  );
};

export default Orders;

Orders.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>;
};
