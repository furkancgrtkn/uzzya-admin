import { FC } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import Button from "src/components/Button";

interface FormHeaderProps {
  loading: boolean;
  title: string;
}

const FormHeader: FC<FormHeaderProps> = ({ title, loading }) => {
  return (
    <div className="flex sticky top-0 bg-white py-2 px-4 border-b border-brand-black-secondaryLight items-center justify-between">
      <h1 className="text-brand-black-primary font-semibold">{title}</h1>
      <Button
        loading={loading}
        type="submit"
        className="font-medium w-8 h-8 rounded text-sm text-brand-palette-primary border hover:bg-brand-palette-primaryLight border-brand-palette-primary"
      >
        <CheckIcon className="w-4 h-4 stroke-2" />
      </Button>
    </div>
  );
};

export default FormHeader;
