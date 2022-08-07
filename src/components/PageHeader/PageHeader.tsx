import { FC, ReactNode } from "react";
import Header from "../Typography/Header";

interface PageHeaderProps {
  title?: string;
  actions?: ReactNode;
  className?: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title, className, actions }) => {
  return (
    <div
      className={`flex w-full h-[48px] items-center ${
        title ? "justify-between" : "justify-end"
      } border-b border-slate-400 ${className || ""}`}
    >
      {title && <Header variant="h5">{title}</Header>}
      {actions && <div className="h-[47px] flex">{actions}</div>}
    </div>
  );
};

export default PageHeader;
