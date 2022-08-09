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
import useAttributeTypes from "src/hooks/api/attributes/useAttributeTypes";
import { UpsertAttributeType } from "src/views/forms";
const AttributeTypes = () => {
  const [attributeTypeRows, setAttributeTypeRows] = useState<
    DataTableProps["rows"] | null
  >();
  const [editAttributeTypeRow, setEditAttributeTypeRow] = useState<
    string | number
  >();
  const [attributeTypeDrawerOpen, setAttributeTypeDrawerOpen] =
    useState<boolean>(false);

  const {
    data: attributeTypes,
    isError: isAttributeTypesError,
    reFetch: attributeTypesReFetch,
  } = useAttributeTypes();

  const attributeTypeCols = [
    {
      name: "Ana Özellik Adı",
      row: "title",
    },
  ];

  useEffect(() => {
    if (attributeTypes) {
      setAttributeTypeRows(
        attributeTypes.map((e) => {
          return [
            {
              render: e.title,
              selector: "title",
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
  }, [attributeTypes]);

  if (isAttributeTypesError) {
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
                setEditAttributeTypeRow(undefined);
                setAttributeTypeDrawerOpen(true);
              }}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="w-4 h-4 mr-2 text-slate-700"
              />
              <span className="text-slate-800">Ana Özellik Oluştur</span>
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
        {attributeTypes && attributeTypeRows ? (
          <DataTable
            onClickEdit={(e) => {
              setEditAttributeTypeRow(e);
              setAttributeTypeDrawerOpen(true);
            }}
            className="mt-2"
            rows={attributeTypeRows}
            cols={attributeTypeCols}
          />
        ) : (
          <Loading />
        )}
      </div>

      <Drawer
        isOpen={attributeTypeDrawerOpen}
        onClose={() => {
          setAttributeTypeDrawerOpen(false);
          setEditAttributeTypeRow(undefined);
        }}
      >
        <UpsertAttributeType
          attributeType={attributeTypes?.find(
            (e) => e.id === editAttributeTypeRow
          )}
          setRows={() => {
            attributeTypesReFetch().then(() => {
              setAttributeTypeDrawerOpen(false);
              setEditAttributeTypeRow(undefined);
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
