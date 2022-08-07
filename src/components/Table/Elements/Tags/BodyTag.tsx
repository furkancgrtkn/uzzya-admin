import { FC, ReactNode } from 'react';

interface BodyTagProps {
  children: ReactNode;
}

const BodyTag: FC<BodyTagProps> = ({ children }) => {
  return <tbody className="divide-y divide-slate-400">{children}</tbody>;
};

export default BodyTag;
