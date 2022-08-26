import { FC } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Button from "src/components/Button";

interface FormFooterProps {
  loading: boolean;
  onCancel: () => void;
}

const FormFooter: FC<FormFooterProps> = ({ loading, onCancel }) => {
  return (
    <div className="flex sticky z-30 bottom-0 mt-auto bg-white py-4 px-4 border-t border-brand-black-secondaryLight items-center justify-end">
      <Button
        loading={loading}
        onClick={() => onCancel()}
        type="button"
        className="font-medium px-3 py-1.5 rounded text-sm text-brand-palette-primary border border-brand-palette-primary ml-auto"
      >
        <XCircleIcon className="w-[18px] h-[18px]" />
        <span className="ml-1.5 mr-1">Vazgeç</span>
      </Button>
      <Button
        loading={loading}
        type="submit"
        className="font-medium px-3 py-1.5 ml-3 rounded text-sm bg-brand-palette-primary border border-brand-palette-primary  text-white"
      >
        <CheckCircleIcon className="w-[18px] h[18px]" />
        <span className="ml-1.5 mr-1">Kaydet</span>
      </Button>
    </div>
  );
};

export default FormFooter;
