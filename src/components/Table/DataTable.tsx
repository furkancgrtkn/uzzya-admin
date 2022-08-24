import { FC } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Paragraph from "../Typography/Paragraph";

export interface DataTableProps {
  className?: string;
  data: any;
  columns: any;
}

const DataTable: FC<DataTableProps> = ({ className, data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return data && data.length > 0 ? (
    <div
      className={`min-w-full bg-white border rounded w-full overflow-x-auto  ${
        className || ""
      }`}
    >
      <table className="w-full">
        <thead className="text-left">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="px-2 py-1 font-semibold text-sm" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className="px-2 py-0.5 text-sm" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <Paragraph variant="span">Oluşturulmuş İçerik Bulunamadı.</Paragraph>
  );
};

export default DataTable;
