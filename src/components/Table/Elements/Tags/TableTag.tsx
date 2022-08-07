import { FC, ReactNode } from 'react';

interface TableTagProps {
  children: ReactNode;
}

const TableTag: FC<TableTagProps> = ({ children }) => {
  return (
    <table className="min-w-full divide-y divide-slate-400">{children}</table>
  );
};

export default TableTag;
