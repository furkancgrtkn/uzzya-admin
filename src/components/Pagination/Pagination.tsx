import { FC } from "react";
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

interface PaginationProps {}

const Pagination: FC<PaginationProps> = () => {
  return (
    <div className="flex w-full justify-center mt-2 items-center gap-2">
      <button className="w-8 h-8 flex items-center justify-center rounded bg-brand-palette-primary text-white">
        <ChevronDoubleLeftIcon className="w-4 h-4" />
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded bg-brand-palette-primary text-white">
        <ChevronLeftIcon className="w-4 h-4" />
      </button>
      <div></div>
      <button className="w-8 h-8 flex items-center justify-center rounded bg-brand-palette-primary text-white">
        <ChevronRightIcon className="w-4 h-4" />
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded bg-brand-palette-primary text-white">
        <ChevronDoubleRightIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
