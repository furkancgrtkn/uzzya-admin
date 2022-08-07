import { FC } from 'react';
import Header from '../Typography/Header';

interface PageHeaderProps {
  title: string;

  className?: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title, className }) => {
  return (
    <div
      className={`flex w-full border-b border-slate-400 pb-2 mb-6 ${
        className || ''
      }`}>
      <Header variant="h3">{title}</Header>
    </div>
  );
};

export default PageHeader;
