/* eslint-disable @next/next/no-img-element */
import { ReactElement, useEffect, useState } from "react";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "src/components/Button";
import Drawer from "src/components/Drawer";
import Default from "src/components/Layout/Default";
import Loading from "src/components/Loading";
import PageHeader from "src/components/PageHeader";
import DataTable, { DataTableProps } from "src/components/Table/DataTable";
import { TrashBtn } from "src/components/Table/Elements";
import useCategories from "src/hooks/api/category/useCategories";
import { UpsertCategory } from "src/views/forms";

const Categories = () => {
  const [rows, setRows] = useState<DataTableProps["rows"] | null>();
  const [editRow, setEditRow] = useState<string | number>();
  const [createOpen, setCreateOpen] = useState<boolean>(false);

  const { data: categories, isError, reFetch } = useCategories();

  const cols = [
    {
      name: "Kategori",
      row: "title",
      visible: true,
    },
    {
      name: "Slug",
      row: "slug",
      visible: true,
    },
    {
      name: "Üst Kategori",
      row: "parent",
      visible: true,
    },
    {
      name: "Alt Kategori",
      row: "child",
      visible: true,
    },
    {
      name: "Görseller",
      row: "images",
      visible: true,
    },
    {
      name: "Row Options",
      row: "options",
      visible: false,
    },
  ];

  useEffect(() => {
    if (categories) {
      setRows(
        categories.map((e) => {
          return [
            {
              id: e.id,
              selector: "id",
            },
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
              render: (
                <div className={"ml-auto flex w-min"}>
                  <button
                    onClick={() => {
                      setEditRow(e.id);
                      setCreateOpen(true);
                    }}
                    className={`mr-2 flex disabled:opacity-70 disabled:cursor-not-allowed items-center px-2 py-[6px] ml-auto text-xs leading-none rounded whitespace-nowrap text-slate-800 bg-slate-200`}
                  >
                    <FontAwesomeIcon icon={faPen} className={`w-3 h-3`} />
                  </button>
                  <TrashBtn
                    endPoint={`/category/delete/${e.id}`}
                    onSuccess={() => {
                      setRows((prev) =>
                        prev?.filter(
                          (p) =>
                            p.filter((r) => r.selector === "id")[0].id !== e.id
                        )
                      );
                    }}
                  />
                </div>
              ),
              selector: "options",
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
              <span className="text-slate-800">Kategori Oluştur</span>
            </Button>
          </>
        }
        title={"Kategoriler"}
      />
      <div className="p-4">
        {categories && rows ? (
          <DataTable className="mt-2" rows={rows} cols={cols} />
        ) : (
          <Loading />
        )}
      </div>

      {categories && (
        <Drawer
          isOpen={createOpen}
          onClose={() => {
            setEditRow(undefined);
            setCreateOpen(false);
          }}
        >
          <UpsertCategory
            categories={categories}
            category={categories?.find((e) => e.id === editRow)}
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

export default Categories;

Categories.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>;
};
