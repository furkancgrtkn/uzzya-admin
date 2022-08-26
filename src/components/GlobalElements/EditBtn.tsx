import { FC } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";

interface EditBtnProps {
  onClick: () => void;
}

const EditBtn: FC<EditBtnProps> = ({ onClick }) => {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={`mr-2 flex disabled:opacity-70 disabled:cursor-not-allowed hover:bg-brand-yellow-primaryLight items-center justify-center w-7 h-7 ml-auto text-xs leading-none rounded whitespace-nowrap text-brand-yellow-primary border border-brand-yellow-primary`}
    >
      <PencilIcon className={`w-3.5 h-3.5`} />
    </button>
  );
};

export default EditBtn;
