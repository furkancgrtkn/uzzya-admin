/* eslint-disable @next/next/no-img-element */
import { ReactElement, useEffect, useState } from "react";
import { PlusCircleIcon, EyeIcon } from "@heroicons/react/24/outline";
import Button from "src/components/Button";
import Drawer from "src/components/Drawer";
import Default from "src/components/Layout/Default";
import Loading from "src/components/Loading";
import PageHeader from "src/components/PageHeader";
import DataTable, { DataTableProps } from "src/components/Table/DataTable";
import { TrashBtn } from "src/components/Table/Elements";
import { ProductType } from "src/hooks/api/products/types";
import useProducts from "src/hooks/api/products/useProducts";
import { UpsertProduct } from "src/views/forms";

const Products = () => {
  const [editRow, setEditRow] = useState<string | number>();
  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const [productData, setProductData] = useState<ProductType[] | undefined>();
  const { data: products, isError, reFetch } = useProducts();

  const columns: DataTableProps<ProductType>["columns"] = [
    {
      key: "title",
      cell: (row) => <>{row.title}</>,
      header: () => "Title",
      width: "120px",
      maxWidth: "120px",
      sticky: "left",
    },
    {
      key: "barcode",
      cell: (row) => <>{row?.barcode}</>,
      header: () => "Barkod",
    },
    {
      key: "category",
      cell: (row) => <>{row.category.title}</>,
      header: () => "Kategori",
    },
    {
      key: "discounted_price",
      cell: (row) => <>{row.discounted_price} ₺</>,
      header: () => "İndirimli Fiyat",
    },
    {
      key: "price",
      cell: (row) => <>{row.price} ₺</>,
      header: () => "Fiyat",
    },
    {
      key: "stock",
      cell: (row) => <>{row.stock}</>,
      header: () => "Stok",
    },
    {
      key: "brand",
      cell: (row) => <>{row.brand}</>,
      header: () => "Marka",
    },
    {
      key: "actions",
      cell: (row: ProductType) => (
        <div className={"ml-auto flex w-min"}>
          <button
            onClick={() => {
              setEditRow(row.id);
              setCreateOpen(true);
            }}
            className={`mr-2 flex disabled:opacity-70 disabled:cursor-not-allowed hover:bg-brand-yellow-primaryLight items-center justify-center w-7 h-7 ml-auto text-xs leading-none rounded whitespace-nowrap text-brand-yellow-primary border border-brand-yellow-primary`}
          >
            <EyeIcon className={`w-3.5 h-3.5`} />
          </button>
          <TrashBtn
            endPoint={`/product/delete/${row.id}`}
            onSuccess={() => {}}
          />
        </div>
      ),
      header: () => null,
    },
  ];

  useEffect(() => {
    if (products) {
      setProductData(products);
    }
  }, [products]);

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <>
      <PageHeader
        actions={
          <>
            <Button
              className="w-full py-1.5 rounded my-auto h-min px-4 border border-brand-palette-primary text-brand-palette-primary"
              onClick={() => {
                setEditRow(undefined);
                setCreateOpen(true);
              }}
            >
              <PlusCircleIcon className="w-4 h-4 mr-2" />
              <span className="text-sm">Ürün Oluştur</span>
            </Button>
          </>
        }
      />
      <div className="p-3">
        {productData ? (
          <DataTable rows={productData} columns={columns} />
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
            onSuccess={() => {
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
