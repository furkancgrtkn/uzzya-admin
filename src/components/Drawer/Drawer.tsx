import React, { ReactNode } from "react";

export default function Drawer({
  children,
  isOpen,
  setIsOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
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
          " w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl "
        }
      >
        {children}
      </div>
      <div
        className=" w-screen h-full "
        onClick={() => {
          setIsOpen(false);
        }}
      ></div>
    </div>
  );
}
