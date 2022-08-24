/* eslint-disable @next/next/no-img-element */
import { ReactElement, useEffect, useState } from "react";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createColumnHelper } from "@tanstack/react-table";
import Button from "src/components/Button";
import Drawer from "src/components/Drawer";
import Default from "src/components/Layout/Default";
import Loading from "src/components/Loading";
import PageHeader from "src/components/PageHeader";
import DataTable, { DataTableProps } from "src/components/Table/DataTable";
import { TrashBtn } from "src/components/Table/Elements";
import IndeterminateCheckbox from "src/components/Table/utils/IndeterminateCheckbox";
import { ProductType } from "src/hooks/api/products/types";
import useProducts from "src/hooks/api/products/useProducts";
import { UpsertProduct } from "src/views/forms";

const Products = () => {
  const [editRow, setEditRow] = useState<string | number>();
  const [createOpen, setCreateOpen] = useState<boolean>(false);

  const { data: products, isError, reFetch } = useProducts();

  const columnHelper = createColumnHelper<ProductType>();

  const columns = [
    columnHelper.display({
      id: "select",
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    }),
    columnHelper.accessor("title", {
      header: () => <span>BAŞLIK</span>,
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("price", {
      header: () => <span>FİYAT</span>,
      cell: (info) => info.renderValue(),
    }),
  ];

  // const cols = [
  //   {
  //     name: "Ürün Adı",
  //     row: "title",
  //     visible: true,
  //   },
  //   {
  //     name: "Slug",
  //     row: "slug",
  //     visible: true,
  //   },
  //   {
  //     name: "Kategori",
  //     row: "category",
  //     visible: true,
  //   },
  //   {
  //     name: "Görseller",
  //     row: "images",
  //     visible: true,
  //   },
  //   {
  //     name: "Row Options",
  //     row: "options",
  //     visible: false,
  //   },
  // ];

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <>
      <PageHeader
        className="pl-4"
        actions={
          <>
            <Button
              className="w-full px-4 border-l hover:bg-slate-100"
              onClick={() => {
                setEditRow(undefined);
                setCreateOpen(true);
              }}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="w-4 h-4 mr-2 text-slate-700"
              />
              <span className="text-slate-800">Ürün Oluştur</span>
            </Button>
          </>
        }
        title={"Ürünler"}
      />
      <div className="p-4">
        {products ? (
          <DataTable className="mt-2" data={products} columns={columns} />
        ) : (
          <Loading />
        )}
      </div>

      {products && (
        <Drawer
          isOpen={createOpen}
          onClose={() => {
            setEditRow(undefined);
            setCreateOpen(false);
          }}
        >
          <UpsertProduct
            product={products.find((e) => e.id === editRow)}
            setRows={() => {
              reFetch().then(() => {
                setEditRow(undefined);
                setCreateOpen(false);
              });
            }}
          />
        </Drawer>
      )}
    </>
  );
};

export default Products;

Products.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>;
};
