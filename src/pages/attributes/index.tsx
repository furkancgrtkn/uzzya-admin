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
import useAttributes from "src/hooks/api/attributes/useAttributes";
import useAttributeTypes from "src/hooks/api/attributes/useAttributeTypes";
import { CreateEditAttribute, CreateEditAttributeType } from "src/views/forms";
const Categories = () => {
  const [attributeTypeRows, setAttributeTypeRows] = useState<
    DataTableProps["rows"] | null
  >();
  const [attributeRows, setAttributeRows] = useState<
    DataTableProps["rows"] | null
  >();
  const [editAttributeTypeRow, setEditAttributeTypeRow] = useState<
    string | number
  >();
  const [editAttributeRow, setEditAttributeRow] = useState<string | number>();
  const [attributeTypeDrawerOpen, setAttributeTypeDrawerOpen] =
    useState<boolean>(false);
  const [attributeDrawerOpen, setAttributeDrawerOpen] =
    useState<boolean>(false);

  const {
    data: attributeTypes,
    isError: isAttributeTypesError,
    reFetch: attributeTypesReFetch,
  } = useAttributeTypes();
  const {
    data: attributes,
    isError: isAttributesError,
    reFetch: attributesReFetch,
  } = useAttributes();

  const attributeTypeCols = [
    {
      name: "Ana Özellik Adı",
      row: "title",
    },
  ];

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

        {attributes && attributeRows ? (
          <DataTable
            onClickEdit={(e) => {
              setEditAttributeRow(e);
              setAttributeDrawerOpen(true);
            }}
            className="mt-6"
            rows={attributeRows}
            cols={attributeCols}
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
        <CreateEditAttributeType
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

      {attributeTypes && (
        <Drawer
          isOpen={attributeDrawerOpen}
          onClose={() => {
            setAttributeDrawerOpen(false);
            setEditAttributeRow(undefined);
          }}
        >
          <CreateEditAttribute
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

export default Categories;

Categories.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>;
};
