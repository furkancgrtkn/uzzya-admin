import React, { FC, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      className="flex disabled:opacity-70 disabled:cursor-not-allowed items-center px-2 py-[6px] ml-auto text-xs leading-none rounded whitespace-nowrap text-slate-800 bg-slate-200"
    >
      <FontAwesomeIcon icon={faTrash} className={`w-3 h-3`} />
    </button>
  );
};

export default TrashBtn;
