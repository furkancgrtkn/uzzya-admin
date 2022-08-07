import { FC, ReactNode } from 'react';

interface WrapperProps {
  className?: string;
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ className, children }) => {
  return (
    <div
      className={`flex flex-col overflow-x-auto border rounded border-slate-400  ${
        className || ''
      }`}>
      {children}
    </div>
  );
};

export default Wrapper;
