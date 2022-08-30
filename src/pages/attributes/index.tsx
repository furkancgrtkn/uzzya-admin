/* eslint-disable @next/next/no-img-element */
import { ReactElement, useState } from "react";
import Drawer from "src/components/Drawer";
import { CreateBtn, EditBtn, TrashBtn } from "src/components/GlobalElements";
import Default from "src/components/Layout/Default";
import Loading from "src/components/Loading";
import PageHeader from "src/components/PageHeader";
import DataTable, { DataTableProps } from "src/components/Table/DataTable";
import { LinkTabs } from "src/components/Tabs";
import { AttributeType } from "src/hooks/api/attributes/types";
import useAttributes from "src/hooks/api/attributes/useAttributes";
import useAttributeTypes from "src/hooks/api/attributes/useAttributeTypes";
import { UpsertAttribute } from "src/views/forms";
const Attributes = () => {
  const [editRow, setEditRow] = useState<string | number>();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const { data: attributeTypes, isError: isAttributeTypesError } =
    useAttributeTypes();
  const {
    data: attributes,
    isError: isAttributesError,
    reFetch: attributesReFetch,
  } = useAttributes();

  const columns: DataTableProps<AttributeType>["columns"] = [
    {
      key: "title",
      cell: (row) => <>{row.value}</>,
      header: () => "Özellik",
    },
    {
      key: "type",
      cell: (row) => <>{row.attribute_type.title}</>,
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
            endPoint={`/admin/category/delete/${row.id}`}
            onSuccess={() => {}}
          />
        </div>
      ),
      header: () => null,
    },
  ];

  if (isAttributeTypesError || isAttributesError) {
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
            label="Özellik Oluştur"
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
        {attributes ? (
          <DataTable rows={attributes} columns={columns} />
        ) : (
          <Loading />
        )}
      </div>

      {attributeTypes && (
        <Drawer
          isOpen={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
            setEditRow(undefined);
          }}
        >
          <UpsertAttribute
            attribute={attributes?.find((e) => e.id === editRow)}
            attributeTypes={attributeTypes}
            onSuccess={() => {
              attributesReFetch().then(() => {
                setDrawerOpen(false);
                setEditRow(undefined);
              });
            }}
          />
        </Drawer>
      )}
    </>
  );
};

export default Attributes;

Attributes.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>;
};
