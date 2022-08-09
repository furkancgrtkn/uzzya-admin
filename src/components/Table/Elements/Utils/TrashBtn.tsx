import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axiosInstance from "src/utils/axiosInstance";

const MySwal = withReactContent(Swal);
interface TrashBtnProps {
  loadingDelete: boolean;
  id: string;
  endPoint: string;
  setLoadingDelete: Dispatch<SetStateAction<boolean>>;
  setTableRows: Dispatch<
    SetStateAction<
      | {
          render?: ReactNode;
          selector: string;
          data?:
            | {
                deleteEndpoint: string;
                rowId: string;
              }
            | undefined;
        }[][]
      | undefined
    >
  >;
}

const TrashBtn: FC<TrashBtnProps> = ({
  setLoadingDelete,
  loadingDelete,
  id,
  endPoint,
  setTableRows,
}) => {
  const customSwal = MySwal.mixin({
    customClass: {
      confirmButton:
        "px-3 mx-1 py-1 text-sm bg-brand-red text-white rounded-md",
      cancelButton: "px-3 mx-1 py-1 text-sm bg-slate-500 text-white rounded-md",
    },
    buttonsStyling: false,
  });

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
                  setTableRows((prev) => {
                    return prev?.filter(
                      (row) =>
                        row.filter((e: any) => e.selector === "jsonData")[0]
                          ?.data?.rowId !== id
                    );
                  });
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
