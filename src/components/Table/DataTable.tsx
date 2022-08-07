import { FC, ReactNode, useState } from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Paragraph from "../Typography/Paragraph";
import {
  BodyTag,
  Col,
  HeadCol,
  HeadRowTag,
  Row,
  TableTag,
  TrashBtn,
} from "./Elements";
import Wrapper from "./Elements/Utils/Wrapper";
import { useRouter } from "next/router";

export interface DataTableProps {
  className?: string;
  rows: {
    render?: ReactNode;
    selector: string;
    data?: {
      editLink: string;
      deleteLink: string;
      deleteId: string;
    };
  }[][];
  cols: { row: string; name: string }[];
}

const DataTable: FC<DataTableProps> = ({ className, cols, rows }) => {
  const [tableRows, setTableRows] = useState<DataTableProps["rows"]>(rows);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const router = useRouter();
  return tableRows && tableRows.length > 0 ? (
    <Wrapper className={className}>
      <TableTag>
        <HeadRowTag>
          {cols.map((col) => (
            <HeadCol key={col.name}>{col.name}</HeadCol>
          ))}
          <HeadCol raw className="px-4 py-3 " />
        </HeadRowTag>
        <BodyTag>
          {tableRows.map((row, i: number) => (
            <Row key={i} index={i}>
              {cols.map((col) => (
                <Col
                  key={row.filter((r) => r.selector === col.row)[0].selector}
                >
                  {row.filter((r) => r.selector === col.row)[0].render}
                </Col>
              ))}

              {row.filter((r) => r.selector === "jsonData")[0] && (
                <Col>
                  <div className={"ml-auto flex w-min"}>
                    <button
                      onClick={() =>
                        router.push(
                          row.filter((r) => r.selector === "jsonData")[0].data
                            ?.editLink as string
                        )
                      }
                      className="flex mr-2 disabled:opacity-70 disabled:cursor-not-allowed items-center px-2 py-[6px] ml-auto text-xs leading-none rounded whitespace-nowrap text-slate-800 bg-slate-200"
                    >
                      <FontAwesomeIcon icon={faPen} className={`w-3 h-3`} />
                    </button>
                    <TrashBtn
                      endPoint={
                        row.filter((r) => r.selector === "jsonData")[0].data
                          ?.deleteLink as string
                      }
                      id={
                        row.filter((r) => r.selector === "jsonData")[0].data
                          ?.deleteId as string
                      }
                      setLoadingDelete={setLoadingDelete}
                      loadingDelete={loadingDelete}
                      setTableRows={setTableRows}
                    />
                  </div>
                </Col>
              )}
            </Row>
          ))}
        </BodyTag>
      </TableTag>
    </Wrapper>
  ) : (
    <Paragraph variant="span">Oluşturulmuş İçerik Bulunamadı.</Paragraph>
  );
};

export default DataTable;
