/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionButton from "src/components/ActionButton";
import Loading from "src/components/Loading";
import PageHeader from "src/components/PageHeader";
import DataTable, { DataTableProps } from "src/components/Table/DataTable";
import { useRouter } from "next/router";
import useCategories from "src/hooks/api/categories/useCategories";

const Categories = () => {
  const router = useRouter();

  const { data: categories, isError } = useCategories();
  const [rows, setRows] = useState<DataTableProps["rows"] | null>();
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
        categories.map((e: any) => {
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
                  href={`${process.env.REACT_APP_API_URL}/${e.categoryImage}`}
                  rel="noreferrer"
                >
                  <img
                    className="min-w-[32px] border border-slate-400 rounded overflow-hidden w-8 h-8 object-cover"
                    src={`${process.env.REACT_APP_API_URL}/${e.categoryImage}`}
                    alt=""
                  />
                </a>
              ),
              selector: "images",
            },
            {
              data: {
                deleteLink: "/api/category/delete",
                editLink: `/kategori-duzenle/${e.slug}`,
                deleteId: e.id,
              },
              selector: "jsonData",
            },
          ];
        })
      );
    }
  }, [categories]);
  const actions = [
    {
      id: 1,
      event: () => {
        router.replace(`/categories/create`);
      },
      icon: (
        <FontAwesomeIcon
          icon={faPlus}
          className="w-4 h-4 mr-2 text-slate-800"
        />
      ),
      label: "Kategori Oluştur",
    },
  ];
  console.log(categories);
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <>
      <PageHeader title={"Kategoriler"} />
      {categories && rows ? (
        <DataTable className="mt-2" rows={rows} cols={cols} />
      ) : (
        <Loading />
      )}

      <ActionButton actions={actions} />
    </>
  );
};

export default Categories;
