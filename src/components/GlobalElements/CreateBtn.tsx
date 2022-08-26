import { FC } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Button from "../Button";

interface CreateBtnProps {
  onClick: () => void;
  label: string;
}

const CreateBtn: FC<CreateBtnProps> = ({ onClick, label }) => {
  return (
    <Button
      className="w-full py-1.5 rounded my-auto h-min px-4 border border-brand-palette-primary text-brand-palette-primary"
      onClick={() => {
        onClick();
      }}
    >
      <PlusCircleIcon className="w-4 h-4 mr-2" />
      <span className="text-sm">{label}</span>
    </Button>
  );
};

export default CreateBtn;
