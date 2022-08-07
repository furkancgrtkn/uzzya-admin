import { ReactNode, FC } from 'react';

interface RowProps {
  children: ReactNode;
  index: number;
}

const Row: FC<RowProps> = ({ children, index }) => {
  return (
    <tr className={index % 2 === 0 ? 'bg-white' : 'bg-slate-100 bg-opacity-50'}>
      {children}
    </tr>
  );
};

export default Row;
