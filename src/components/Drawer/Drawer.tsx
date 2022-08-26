import React, { ReactNode } from "react";
import { Transition } from "@headlessui/react";

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
    <Transition
      className={"fixed overflow-hidden z-20 bg-black bg-opacity-50 inset-0"}
      as="div"
      show={isOpen}
    >
      <Transition.Child
        enter="transition-transform duration-300"
        enterFrom="translate-x-[100%]"
        enterTo="translate-x-[0px]"
        leave="transition-transform duration-300"
        leaveFrom="translate-x-[0px]"
        leaveTo="translate-x-[100%]"
        as="div"
        className="w-screen max-w-2xl right-0 absolute overflow-y-auto bg-white h-full shadow-2xl"
      >
        {children}
      </Transition.Child>
      <div
        className=" w-screen h-full "
        onClick={() => {
          onClose();
        }}
      ></div>
    </Transition>
  );
}
