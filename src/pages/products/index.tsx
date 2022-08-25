/* eslint-disable @next/next/no-img-element */
import { ReactElement, useEffect, useState } from "react";
import { PlusCircleIcon, PencilIcon } from "@heroicons/react/24/outline";
import Badge from "src/components/Badge";
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
      cell: (row) => (
        <div className="flex items-center">
          <img
            src={`${process.env.NEXT_APP_API_URL}/${row.thumbnail}`}
            className="w-8 h-8 object-cover rounded mr-2"
            alt={row.title}
          />
          <div className="flex justify-center flex-col">
            <span className="leading-none">{row.title}</span>
            <span className="text-xs">{row?.barcode}</span>
          </div>
        </div>
      ),
      header: () => "Ürün",
    },
    {
      key: "category",
      cell: (row) => <>{row.category.title}</>,
      header: () => "Kategori",
    },
    {
      key: "price",
      cell: (row) => (
        <div className="flex flex-col justify-center !leading-none">
          <span className="text-xs opacity-40 line-through">{row.price} ₺</span>
          {row.discounted_price} ₺
        </div>
      ),
      header: () => "Fiyat",
    },
    {
      key: "stock",
      cell: (row) => <>{row.stock} Adet</>,
      header: () => "Stok",
    },
    {
      key: "brand",
      cell: (row) => <>{row.brand}</>,
      header: () => "Marka",
    },
    {
      key: "published",
      cell: (row) => (
        <>
          <Badge
            text={row.published ? "Yayında" : "Arşivde"}
            type={row.published ? "success" : "warning"}
          />
        </>
      ),
      header: () => "Durum",
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
            <PencilIcon className={`w-3.5 h-3.5`} />
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
              className="w-full hover:bg-brand-palette-primaryLight py-1.5 rounded my-auto h-min px-4 border border-brand-palette-primary text-brand-palette-primary"
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
