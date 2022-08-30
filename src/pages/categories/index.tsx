/* eslint-disable @next/next/no-img-element */
import { ReactElement, useState } from "react";
import Drawer from "src/components/Drawer";
import { CreateBtn, EditBtn, TrashBtn } from "src/components/GlobalElements";
import Default from "src/components/Layout/Default";
import Loading from "src/components/Loading";
import PageHeader from "src/components/PageHeader";
import DataTable, { DataTableProps } from "src/components/Table/DataTable";
import useAttributeTypes from "src/hooks/api/attributes/useAttributeTypes";
import { Category } from "src/hooks/api/category/types";
import useCategories from "src/hooks/api/category/useCategories";
import { UpsertCategory } from "src/views/forms";

const Categories = () => {
  const [editRow, setEditRow] = useState<string | number>();
  const [createOpen, setCreateOpen] = useState<boolean>(false);

  const { data: categories, isError, reFetch } = useCategories();
  const { data: attributeTypes, isError: isAttributeTypesError } =
    useAttributeTypes();

  const columns: DataTableProps<Category>["columns"] = [
    {
      key: "title",
      cell: (row) => (
        <div className="flex items-center">
          <img
            src={`${process.env.NEXT_APP_API_URL}/${row.image}`}
            className="w-8 h-8 object-cover rounded mr-2"
            alt={row.title}
          />
          <div className="flex justify-center flex-col">
            <span className="leading-none">{row.title}</span>
            <span className="text-xs">{row?.slug}</span>
          </div>
        </div>
      ),
      header: () => "Kategori",
    },
    {
      key: "child",
      cell: (row) => <>{row.children.length}</>,
      header: () => "Alt Kategori Sayısı",
    },
    {
      key: "parent",
      cell: (row) => <>{row?.parent?.title || "-"}</>,
      header: () => "Üst Kategori",
    },
    {
      key: "filters",
      cell: (row) => (
        <>
          {row.filters.map((e) => {
            return (
              <span
                className="text-xs mr-1 px-1.5 rounded border border-brand-black-secondaryLight py-0.5"
                key={e.attribute_type.id}
              >
                {e.attribute_type.title}
              </span>
            );
          })}
        </>
      ),
      header: () => "Filtreler",
    },
    {
      key: "actions",
      cell: (row) => (
        <div className={"ml-auto flex w-min"}>
          <EditBtn
            onClick={() => {
              setEditRow(row.id);
              setCreateOpen(true);
            }}
          />
          <TrashBtn
            endPoint={`/admin/category/delete/${row.id}`}
            onSuccess={() => {}}
          />
        </div>
      ),
      header: () => null,
    },
  ];
  if (isError || isAttributeTypesError) {
    return <div>Error</div>;
  }
  return (
    <>
      <PageHeader
        actions={
          <CreateBtn
            onClick={() => {
              setEditRow(undefined);
              setCreateOpen(true);
            }}
            label="Kategori Oluştur"
          />
        }
      />
      <div className="p-3">
        {categories ? (
          <DataTable rows={categories} columns={columns} />
        ) : (
          <Loading />
        )}
      </div>

      {categories && attributeTypes && (
        <Drawer
          isOpen={createOpen}
          onClose={() => {
            setEditRow(undefined);
            setCreateOpen(false);
          }}
        >
          <UpsertCategory
            attributeTypes={attributeTypes}
            categories={categories}
            category={categories?.find((e) => e.id === editRow)}
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

export default Categories;

Categories.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>;
};
