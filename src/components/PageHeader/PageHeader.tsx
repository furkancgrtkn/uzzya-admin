import { FC, ReactNode } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
interface PageHeaderProps {
  actions?: ReactNode;
  className?: string;
}

const PageHeader: FC<PageHeaderProps> = ({ className, actions }) => {
  return (
    <div
      className={`flex px-2 bg-white border-brand-black-secondaryLight w-full h-[50px] items-center justify-between border-b ${
        className || ""
      }`}
    >
      <div className="relative">
        <MagnifyingGlassIcon className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-brand-black-secondary/90" />
        <input
          className={`text-[13px] w-[200px] pl-8 py-1 text-brand-black-secondary font-normal border rounded border-brand-black-secondaryLight  focus:ring-transparent focus:border-brand-black-secondaryLight`}
          type="text"
        />
      </div>
      {actions && <div className="h-full flex">{actions}</div>}
    </div>
  );
};

export default PageHeader;
