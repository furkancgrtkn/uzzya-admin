import { FC, ReactNode } from 'react';

interface ColProps {
  children?: ReactNode;
  rawClassName?: string;
}

const Col: FC<ColProps> = ({ children, rawClassName }) => {
  return (
    <td
      className={
        rawClassName ||
        'px-4 py-2 text-sm font-medium text-slate-800 whitespace-nowrap'
      }
    >
      {children || null}
    </td>
  );
};

export default Col;
