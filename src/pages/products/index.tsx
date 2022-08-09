/* eslint-disable @next/next/no-img-element */
import { ReactElement, useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "src/components/Button";
import Drawer from "src/components/Drawer";
import Default from "src/components/Layout/Default";
import Loading from "src/components/Loading";
import PageHeader from "src/components/PageHeader";
import DataTable, { DataTableProps } from "src/components/Table/DataTable";
import useProducts from "src/hooks/api/products/useProducts";
import CreateEditProduct from "src/views/forms/CreateEditProduct";

const Products = () => {
  const [rows, setRows] = useState<DataTableProps["rows"] | null>();
  const [editRow, setEditRow] = useState<string | number>();
  const [createOpen, setCreateOpen] = useState<boolean>(false);

  const { data: products, isError, reFetch } = useProducts();
  console.log(products);
  const cols = [
    {
      name: "Ürün Adı",
      row: "title",
    },
    {
      name: "Slug",
      row: "slug",
    },
    {
      name: "Kategori",
      row: "category",
    },
    {
      name: "Görseller",
      row: "images",
    },
  ];

  useEffect(() => {
    if (products) {
      setRows(
        products.map((e) => {
          return [
            {
              render: e.title,
              selector: "title",
            },
            {
              render: e.slug,
              selector: "slug",
            },
            {
              render: e?.category?.title || "-",
              selector: "category",
            },

            {
              render: (
                <a
                  target={"_blank"}
                  href={`${process.env.NEXT_APP_API_URL}/${e.thumbnail}`}
                  rel="noreferrer"
                >
                  <img
                    className="min-w-[32px] border border-slate-400 rounded overflow-hidden w-8 h-8 object-cover"
                    src={`${process.env.NEXT_APP_API_URL}/${e.thumbnail}`}
                    alt=""
                  />
                </a>
              ),
              selector: "images",
            },
            {
              data: {
                deleteEndpoint: `/product/delete/${e.id}`,
                rowId: e.id,
              },
              selector: "jsonData",
            },
          ];
        })
      );
    }
  }, [products]);

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
              className="w-full px-4 border-l border-slate-400 hover:bg-slate-100"
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
        {products && rows ? (
          <DataTable
            onClickEdit={(e) => {
              setEditRow(e);
              setCreateOpen(true);
            }}
            className="mt-2"
            rows={rows}
            cols={cols}
          />
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
          <CreateEditProduct
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
