/* eslint-disable @next/next/no-img-element */
import { ReactElement, useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "src/components/Loading";
import PageHeader from "src/components/PageHeader";
import DataTable, { DataTableProps } from "src/components/Table/DataTable";
import { useRouter } from "next/router";
import useCategories from "src/hooks/api/category/useCategories";
import Default from "src/components/Layout/Default";
import Button from "src/components/Button";
import Drawer from "src/components/Drawer";
import { CreateCategory, EditCategory } from "src/views/forms";

const Categories = () => {
  const [rows, setRows] = useState<DataTableProps["rows"] | null>();
  const [editRow, setEditRow] = useState<string | number>();
  const [createOpen, setCreateOpen] = useState<boolean>(false);

  const { data: categories, isError, reFetch } = useCategories();

  const cols = [
    {
      name: "Kategori",
      row: "title",
    },
    {
      name: "Slug",
      row: "slug",
    },
    {
      name: "Üst Kategori",
      row: "parent",
    },
    {
      name: "Alt Kategori",
      row: "child",
    },
    {
      name: "Görseller",
      row: "images",
    },
  ];

  useEffect(() => {
    if (categories) {
      setRows(
        categories.map((e) => {
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
              render: e?.parent?.title || "-",
              selector: "parent",
            },
            {
              render: e?.children?.length || "-",
              selector: "child",
            },
            {
              render: (
                <a
                  target={"_blank"}
                  href={`${process.env.NEXT_APP_API_URL}/${e.image}`}
                  rel="noreferrer"
                >
                  <img
                    className="min-w-[32px] border border-slate-400 rounded overflow-hidden w-8 h-8 object-cover"
                    src={`${process.env.NEXT_APP_API_URL}/${e.image}`}
                    alt=""
                  />
                </a>
              ),
              selector: "images",
            },
            {
              data: {
                deleteEndpoint: `/category/delete/${e.id}`,
                editLink: `/categories/edit/${e.slug}`,
                deleteId: e.id,
              },
              selector: "jsonData",
            },
          ];
        })
      );
    }
  }, [categories]);

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
              onClick={() => setCreateOpen(true)}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="w-4 h-4 mr-2 text-slate-700"
              />
              <span className="text-slate-800">Kategori Oluştur</span>
            </Button>
          </>
        }
        title={"Kategoriler"}
      />
      <div className="p-4">
        {categories && rows ? (
          <DataTable
            setEditRow={setEditRow}
            className="mt-2"
            rows={rows}
            cols={cols}
          />
        ) : (
          <Loading />
        )}
      </div>

      {categories && (
        <Drawer
          isOpen={!!editRow}
          setIsOpen={(e) => {
            if (!e) {
              setEditRow(undefined);
            }
          }}
        >
          <EditCategory
            categories={categories}
            category={categories?.find((e) => e.id === editRow)}
            setRows={() => {
              reFetch().then(() => {
                setEditRow(undefined);
              });
            }}
          />
        </Drawer>
      )}

      {categories && (
        <Drawer
          isOpen={createOpen}
          setIsOpen={(e) => {
            if (!e) {
              setCreateOpen(false);
            }
          }}
        >
          <CreateCategory
            categories={categories}
            setRows={() => {
              reFetch().then(() => {
                setCreateOpen(false);
              });
            }}
          />
        </Drawer>
      )}
    </>
  );
};

export default Categories;

Categories.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>;
};
