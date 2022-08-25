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
      key: "user",
      cell: (row) => (
        <div className="flex justify-center flex-col">
          <span className="leading-none">
            {row.user.profile.name} {row.user.profile.surname}
          </span>
          <span className="text-xs mt-0.5">{row.user.email}</span>
          <span className="text-xs">{row.user.profile.phone}</span>
        </div>
      ),
      header: () => "Müşteri",
    },
    {
      key: "address",
      cell: (row) => (
        <div className="flex justify-center text-xs flex-col">
          <span>
            {row.shipping.address}, {row.shipping.post_code}
          </span>
          <span>
            {row.shipping.city}, {row.shipping.country}
          </span>
        </div>
      ),
      header: () => "Adres",
    },
    {
      key: "status",
      cell: (row) => <>{row.status}</>,
      header: () => "Durum",
    },
    {
      key: "paid_price",
      cell: (row) => <>{row.payment.iyzicoJson.paidPrice} ₺</>,
      header: () => "Tutar",
    },
    {
      key: "rate",
      cell: (row) =>
        row.comment ? (
          <div className="flex flex-col text-xs">
            <span>{row.comment}</span>
            <span>{row.rate}</span>
          </div>
        ) : (
          "-"
        ),
      header: () => "Değerlendirme",
    },
    {
      key: "paid_price",
      cell: (row) => (
        <>{new Date(row.updated_at).toLocaleDateString("tr-TR")} </>
      ),
      header: () => "Güncellenme Tarihi ",
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
      <div className="p-3">
        {orders ? <DataTable rows={orders} columns={columns} /> : <Loading />}
      </div>
    </>
  );
};

export default Orders;

Orders.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>;
};
