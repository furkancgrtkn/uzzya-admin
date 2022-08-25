/* eslint-disable @next/next/no-img-element */
import { ReactElement, useState } from "react";
import { PlusCircleIcon, EyeIcon } from "@heroicons/react/24/outline";
import Button from "src/components/Button";
import Drawer from "src/components/Drawer";
import Default from "src/components/Layout/Default";
import Loading from "src/components/Loading";
import PageHeader from "src/components/PageHeader";
import DataTable, { DataTableProps } from "src/components/Table/DataTable";
import { TrashBtn } from "src/components/Table/Elements";
import { Category } from "src/hooks/api/category/types";
import useCategories from "src/hooks/api/category/useCategories";
import { UpsertCategory } from "src/views/forms";

const Categories = () => {
  const [editRow, setEditRow] = useState<string | number>();
  const [createOpen, setCreateOpen] = useState<boolean>(false);

  const { data: categories, isError, reFetch } = useCategories();

  const columns: DataTableProps<Category>["columns"] = [
    {
      key: "title",
      cell: (row) => <>{row.title}</>,
      header: () => "Title",
      width: "120px",
      maxWidth: "120px",
      sticky: "left",
    },
    {
      key: "slug",
      cell: (row) => <>{row.slug}</>,
      header: () => "Slug",
    },
    {
      key: "parent",
      cell: (row) => <>{row?.parent?.title || "-"}</>,
      header: () => "Üst Kategori",
    },

    {
      key: "actions",
      cell: (row) => (
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
            endPoint={`/category/delete/${row.id}`}
            onSuccess={() => {}}
          />
        </div>
      ),
      header: () => null,
    },
  ];
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
              <span className="text-sm">Kategori Oluştur</span>
            </Button>
          </>
        }
      />
      <div className="p-4">
        {categories ? (
          <DataTable rows={categories} columns={columns} />
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
