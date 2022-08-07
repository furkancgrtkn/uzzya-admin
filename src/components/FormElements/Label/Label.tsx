import { FC, ReactNode } from 'react';

interface LabelProps {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}
const Label: FC<LabelProps> = ({ children, className, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-normal text-slate-800 ${className || ''}`}>
      {children}
    </label>
  );
};

export default Label;
