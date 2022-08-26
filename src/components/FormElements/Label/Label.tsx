import { FC, ReactNode } from "react";

interface LabelProps {
  children: ReactNode;
  htmlFor?: string;
  small?: boolean;
  className?: string;
}
const Label: FC<LabelProps> = ({ children, small, className, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${
        small ? "text-xs" : "text-sm"
      } font-normal text-brand-black-primary ${className || ""}`}
    >
      {children}
    </label>
  );
};

export default Label;
