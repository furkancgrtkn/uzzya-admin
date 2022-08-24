import { Column, Table } from "@tanstack/react-table";

export default function ColFilter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);
  return <></>;
  //   return typeof firstValue === "number" ? (
  //     <div className="flex space-x-2">
  //       <input
  //         type="number"
  //         value={((column.getFilterValue() as any)?.[0] ?? "") as string}
  //         onChange={(e) =>
  //           column.setFilterValue((old: any) => [e.target.value, old?.[1]])
  //         }
  //         placeholder={`Min`}
  //         className="text-xs mt-1 w-full placeholder:text-brand-black-secondary font-normal border text-brand-black-primary rounded border-brand-black-secondary focus:ring-transparent focus:border-brand-black-secondary"
  //       />
  //       <input
  //         type="number"
  //         value={((column.getFilterValue() as any)?.[1] ?? "") as string}
  //         onChange={(e) =>
  //           column.setFilterValue((old: any) => [old?.[0], e.target.value])
  //         }
  //         placeholder={`Max`}
  //         className="text-xs mt-1 w-full placeholder:text-brand-black-secondary font-normal border text-brand-black-primary rounded border-brand-black-secondary focus:ring-transparent focus:border-brand-black-secondary"
  //       />
  //     </div>
  //   ) : (
  //     <input
  //       type="text"
  //       value={(column.getFilterValue() ?? "") as string}
  //       onChange={(e) => column.setFilterValue(e.target.value)}
  //       placeholder={`Search...`}
  //       className="text-xs mt-1 w-full placeholder:text-brand-black-secondary font-normal border text-brand-black-primary rounded border-brand-black-secondary focus:ring-transparent focus:border-brand-black-secondary"
  //     />
  //   );
}
