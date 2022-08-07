import { FC, ReactNode } from 'react';

interface HeadColProps {
  children?: ReactNode;
  className?: string;
  raw?: boolean;
}

const HeadCol: FC<HeadColProps> = ({ raw, children, className }) => {
  return (
    <th
      scope="col"
      className={`${
        raw
          ? ''
          : 'px-4 py-3 text-xs whitespace-nowrap font-semibold text-left uppercase text-slate-800'
      } ${className || ''}`}>
      {children || null}
    </th>
  );
};

export default HeadCol;
