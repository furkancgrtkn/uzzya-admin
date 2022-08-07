import { FC, ReactNode } from 'react';

interface HeadRowTagProps {
  children: ReactNode;
}

const HeadRowTag: FC<HeadRowTagProps> = ({ children }) => {
  return (
    <thead className="bg-opacity-50 bg-slate-100">
      <tr>{children}</tr>
    </thead>
  );
};

export default HeadRowTag;
