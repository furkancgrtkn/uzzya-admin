import { FC } from "react";

interface FormHeaderProps {
  title: string;
}

const FormHeader: FC<FormHeaderProps> = ({ title }) => {
  return (
    <div className="flex sticky top-0 z-30 bg-white py-3 px-4 border-b border-brand-black-secondaryLight items-center justify-between">
      <h1 className="text-brand-black-primary font-semibold">{title}</h1>
    </div>
  );
};

export default FormHeader;
