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
import { LinkTabs } from "src/components/Tabs";
import useAttributes from "src/hooks/api/attributes/useAttributes";
import useAttributeTypes from "src/hooks/api/attributes/useAttributeTypes";
import { UpsertAttribute } from "src/views/forms";
const Attributes = () => {
  const [attributeRows, setAttributeRows] = useState<
    DataTableProps["rows"] | null
  >();
  const [editAttributeRow, setEditAttributeRow] = useState<string | number>();

  const [attributeDrawerOpen, setAttributeDrawerOpen] =
    useState<boolean>(false);

  const { data: attributeTypes, isError: isAttributeTypesError } =
    useAttributeTypes();
  const {
    data: attributes,
    isError: isAttributesError,
    reFetch: attributesReFetch,
  } = useAttributes();

  const attributeCols = [
    {
      name: "Özellik Adı",
      row: "value",
    },
    {
      name: "Özellik Tipi",
      row: "type",
    },
  ];

  useEffect(() => {
    if (attributes) {
      setAttributeRows(
        attributes.map((e) => {
          return [
            {
              render: e.value,
              selector: "value",
            },
            {
              render: e.attribute_type.title,
              selector: "type",
            },
            {
              data: {
                deleteEndpoint: `/attribute/type/delete/${e.id}`,
                rowId: e.id,
              },
              selector: "jsonData",
            },
          ];
        })
      );
    }
  }, [attributes]);

  if (isAttributeTypesError || isAttributesError) {
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
                setEditAttributeRow(undefined);
                setAttributeDrawerOpen(true);
              }}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="w-4 h-4 mr-2 text-slate-700"
              />
              <span className="text-slate-800">Özellik Oluştur</span>
            </Button>
          </>
        }
        title={"Özellikler"}
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
        {attributes && attributeRows ? (
          <DataTable
            onClickEdit={(e) => {
              setEditAttributeRow(e);
              setAttributeDrawerOpen(true);
            }}
            className="mt-2"
            rows={attributeRows}
            cols={attributeCols}
          />
        ) : (
          <Loading />
        )}
      </div>

      {attributeTypes && (
        <Drawer
          isOpen={attributeDrawerOpen}
          onClose={() => {
            setAttributeDrawerOpen(false);
            setEditAttributeRow(undefined);
          }}
        >
          <UpsertAttribute
            attribute={attributes?.find((e) => e.id === editAttributeRow)}
            attributeTypes={attributeTypes}
            setRows={() => {
              attributesReFetch().then(() => {
                setAttributeDrawerOpen(false);
                setEditAttributeRow(undefined);
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
