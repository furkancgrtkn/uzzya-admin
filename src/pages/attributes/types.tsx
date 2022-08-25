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
import { LinkTabs } from "src/components/Tabs";
import { AttributeTypeType } from "src/hooks/api/attributes/types";
import useAttributeTypes from "src/hooks/api/attributes/useAttributeTypes";
import { UpsertAttributeType } from "src/views/forms";
const AttributeTypes = () => {
  const [editRow, setEditRow] = useState<string | number>();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const {
    data: attributeTypes,
    isError: isAttributeTypesError,
    reFetch: attributeTypesReFetch,
  } = useAttributeTypes();

  const columns: DataTableProps<AttributeTypeType>["columns"] = [
    {
      key: "title",
      cell: (row) => <>{row.title}</>,
      header: () => "Title",
      width: "120px",
      maxWidth: "120px",
      sticky: "left",
    },
    {
      key: "actions",
      cell: (row) => (
        <div className={"ml-auto flex w-min"}>
          <button
            onClick={() => {
              setEditRow(row.id);
              setDrawerOpen(true);
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

  if (isAttributeTypesError) {
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
                setDrawerOpen(true);
              }}
            >
              <PlusCircleIcon className="w-4 h-4 mr-2" />
              <span className="text-sm">Ana Özellik Oluştur</span>
            </Button>
          </>
        }
      />
      <div className="px-4 mt-2">
        <LinkTabs
          tabsData={[
            { id: 1, label: "Özellikler", href: "/attributes" },
            { id: 2, label: "Özellik Tipleri", href: "/attributes/types" },
          ]}
        />
      </div>
      <div className="p-4">
        {attributeTypes ? (
          <DataTable rows={attributeTypes} columns={columns} />
        ) : (
          <Loading />
        )}
      </div>

      <Drawer
        isOpen={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setEditRow(undefined);
        }}
      >
        <UpsertAttributeType
          attributeType={attributeTypes?.find((e) => e.id === editRow)}
          setRows={() => {
            attributeTypesReFetch().then(() => {
              setDrawerOpen(false);
              setEditRow(undefined);
            });
          }}
        />
      </Drawer>
    </>
  );
};

export default AttributeTypes;

AttributeTypes.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>;
};
