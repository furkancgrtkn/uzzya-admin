import React, { FC, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import axiosInstance from "src/utils/axiosInstance";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
interface TrashBtnProps {
  endPoint: string;
  onSuccess: () => void;
}

const TrashBtn: FC<TrashBtnProps> = ({ onSuccess, endPoint }) => {
  const customSwal = MySwal.mixin({
    customClass: {
      confirmButton:
        "px-3 mx-1 py-1 text-sm bg-brand-red text-white rounded-md",
      cancelButton: "px-3 mx-1 py-1 text-sm bg-slate-500 text-white rounded-md",
    },
    buttonsStyling: false,
  });
  const [loadingDelete, setLoadingDelete] = useState(false);
  return (
    <button
      disabled={loadingDelete}
      onClick={() => {
        customSwal
          .fire({
            html: '<div><h4 class="text-xl mb-1">Are You Sure ?</h4><p class="text-sm">You wont be able to revert this!</p></div>',
            showCancelButton: true,
            showClass: {
              popup: "animate-enter",
            },
            hideClass: {
              popup: "animate-leave",
            },
            width: 300,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              setLoadingDelete(true);
              axiosInstance
                .delete(endPoint)
                .then(() => {
                  onSuccess();
                  toast.success("Başarıyla silindi.");
                })
                .catch((err) => {
                  console.log(err);
                  toast.error("Hata");
                })
                .finally(() => setLoadingDelete(false));
            }
          });
      }}
      className="flex disabled:opacity-70 disabled:cursor-not-allowed items-center w-7 h-7 justify-center ml-auto text-xs leading-none rounded whitespace-nowrap text-brand-red-primary border border-brand-red-primary hover:bg-brand-red-primaryLight"
    >
      <TrashIcon className={`w-3.5 h-3.5`} />
    </button>
  );
};

export default TrashBtn;
