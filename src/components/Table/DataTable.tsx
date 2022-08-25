import Paragraph from "../Typography/Paragraph";

export interface DataTableProps<T> {
  className?: string;
  rows: T[];
  columns: {
    key: string;
    width?: string;
    sticky?: "left" | "right";
    maxWidth?: string;
    minWidth?: string;
    // eslint-disable-next-line no-undef, no-unused-vars
    cell: (row: T) => JSX.Element | string | null | number;
    // eslint-disable-next-line no-undef, no-unused-vars
    header: () => JSX.Element | string | null;
  }[];
}

const DataTable = <T extends object>({
  className,
  rows,
  columns,
}: DataTableProps<T>) => {
  return rows && rows.length > 0 ? (
    <div
      className={`min-w-full relative bg-white border border-brand-black-secondaryLight rounded w-full overflow-x-auto  ${
        className || ""
      }`}
    >
      <table className="w-full">
        <thead className="text-left">
          <tr>
            {columns.map((col) => (
              <th
                style={{
                  maxWidth: col.maxWidth,
                  width: col.width,
                  position: col.sticky ? "sticky" : undefined,
                  zIndex: col.sticky ? "1" : undefined,
                  left: col.sticky === "left" ? "0" : undefined,
                  right: col.sticky === "right" ? "0" : undefined,
                  minWidth: col.minWidth || "150px",
                }}
                key={col.key}
                className="px-3 py-1.5 whitespace-nowrap bg-white text-brand-black-primary/80 font-medium text-sm"
              >
                {col.header()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index + 1}>
              {columns.map((col, idx) => (
                <td
                  style={{
                    maxWidth: col.maxWidth,
                    width: col.width,
                    position: col.sticky ? "sticky" : undefined,
                    zIndex: col.sticky ? "1" : undefined,
                    left: col.sticky === "left" ? "0" : undefined,
                    right: col.sticky === "right" ? "0" : undefined,
                    minWidth: col.minWidth || "150px",
                  }}
                  key={idx * index}
                  className="px-3 border-t border-brand-black-secondaryLight bg-white py-1.5 text-sm"
                >
                  {col.cell(row)}
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
