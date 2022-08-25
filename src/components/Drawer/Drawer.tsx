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
        "fixed overflow-hidden z-20 bg-black bg-opacity-50 inset-0" +
        (isOpen ? " block " : " hidden ")
      }
    >
      <div
        className={
          " w-screen max-w-2xl right-0 absolute overflow-y-scroll bg-white h-full shadow-2xl "
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
