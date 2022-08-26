import { FC } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";

interface ViewBtnProps {
  onClick: () => void;
}

const ViewBtn: FC<ViewBtnProps> = ({ onClick }) => {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={`flex disabled:opacity-70 disabled:cursor-not-allowed hover:bg-brand-yellow-primaryLight items-center justify-center w-7 h-7 ml-auto text-xs leading-none rounded whitespace-nowrap text-brand-yellow-primary border border-brand-yellow-primary`}
    >
      <EyeIcon className={`w-3.5 h-3.5`} />
    </button>
  );
};

export default ViewBtn;
