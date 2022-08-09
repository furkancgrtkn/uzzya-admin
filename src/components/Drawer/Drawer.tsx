import React, { ReactNode } from "react";

export default function Drawer({
  children,
  isOpen,
  onClose,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className={
        "fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0" +
        (isOpen ? " block " : " hidden ")
      }
    >
      <div
        className={
          " w-screen max-w-lg right-0 absolute overflow-y-scroll bg-white h-full shadow-xl "
        }
      >
        {children}
      </div>
      <div
        className=" w-screen h-full "
        onClick={() => {
          onClose();
        }}
      ></div>
    </div>
  );
}
