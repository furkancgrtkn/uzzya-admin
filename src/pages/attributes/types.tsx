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
      visible: true,
    },
    {
      name: "Row Options",
      row: "options",
      visible: false,
    },
  ];

  useEffect(() => {
    if (attributeTypes) {
      setAttributeTypeRows(
        attributeTypes.map((e) => {
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
              render: (
                <div className={"ml-auto flex w-min"}>
                  <button
                    onClick={() => {
                      setEditAttributeTypeRow(e.id);
                      setAttributeTypeDrawerOpen(true);
                    }}
                    className={`mr-2 flex disabled:opacity-70 disabled:cursor-not-allowed items-center px-2 py-[6px] ml-auto text-xs leading-none rounded whitespace-nowrap text-slate-800 bg-slate-200`}
                  >
                    <FontAwesomeIcon icon={faPen} className={`w-3 h-3`} />
                  </button>
                  <TrashBtn
                    endPoint={`/attribute/type/delete/${e.id}`}
                    onSuccess={() => {
                      setAttributeTypeRows((prev) =>
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
              className="w-full px-4 border-l hover:bg-slate-100"
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
