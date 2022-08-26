/* eslint-disable @next/next/no-img-element */
import { ReactElement, useState } from "react";
import Drawer from "src/components/Drawer";
import { CreateBtn, EditBtn, TrashBtn } from "src/components/GlobalElements";
import Default from "src/components/Layout/Default";
import Loading from "src/components/Loading";
import PageHeader from "src/components/PageHeader";
import DataTable, { DataTableProps } from "src/components/Table/DataTable";
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
      header: () => "Tip",
    },
    {
      key: "actions",
      cell: (row) => (
        <div className={"ml-auto flex w-min"}>
          <EditBtn
            onClick={() => {
              setEditRow(row.id);
              setDrawerOpen(true);
            }}
          />
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
          <CreateBtn
            onClick={() => {
              setEditRow(undefined);
              setDrawerOpen(true);
            }}
            label="Tip Oluştur"
          />
        }
      />
      <div className="px-3 mt-1">
        <LinkTabs
          tabsData={[
            { id: 1, label: "Özellikler", href: "/attributes" },
            { id: 2, label: "Özellik Tipleri", href: "/attributes/types" },
          ]}
        />
      </div>
      <div className="p-3">
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
          onSuccess={() => {
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
