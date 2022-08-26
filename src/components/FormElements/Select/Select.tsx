import { FC, ReactNode, useRef, useState } from "react";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useOnClickOutside } from "usehooks-ts";
import ErrorMessage from "../ErrorMessage";

interface SelectProps {
  options: {
    value: string;
    filterValue?: string;
    label: ReactNode;
  }[];
  selected: string;
  multiple?: boolean;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (val: string | undefined) => void;
  error?: string;
  filter?: boolean;
  label: string;
}

const Select: FC<SelectProps> = ({
  error,
  onChange,
  disabled,
  selected,
  label,
  filter,
  options,
}) => {
  const [open, setOpen] = useState(false);
  const [optionsState, setOptionState] = useState(options);

  const selectRef = useRef(null);
  const handleClickOutside = () => {
    setOpen(false);
    setOptionState(options);
  };
  useOnClickOutside(selectRef, handleClickOutside);

  return (
    <div
      ref={selectRef}
      className={`select-none relative flex flex-col w-full ${
        disabled ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {selected && (
        <button
          type="button"
          className={`absolute z-20 w-[14px] h-[14px] right-3 top-[14px] transfrom`}
          onClick={() => {
            onChange(undefined);
          }}
        >
          <XMarkIcon
            className={`w-[14px] stroke-2 h-[14px] ${
              open ? "text-brand-palette-primary" : "text-brand-black-secondary"
            }`}
          />
        </button>
      )}
      <div
        onClick={() => {
          setOpen(disabled ? false : !open);
          setOptionState(options);
        }}
        className={`relative cursor-pointer z-10 flex items-center justify-between w-full h-[42px] px-3 text-sm font-normal bg-white border rounded text-brand-black-primary ${
          open
            ? "border-brand-palette-primary"
            : "border-brand-black-secondaryLight"
        }`}
      >
        {options?.filter((option: any) => option.value === selected)[0]?.label}
        <span
          className={`absolute  transform -translate-y-1/2 left-2 !leading-none transition-all px-1 bg-white ${
            options?.filter((option: any) => option.value === selected)[0]
              ?.label || open
              ? `text-xs ${
                  open
                    ? "text-brand-palette-primary"
                    : "text-brand-black-primary"
                } top-0`
              : "text-brand-black-secondary top-1/2"
          }`}
        >
          {disabled ? "Disabled" : label}
        </span>
        {!selected && (
          <ChevronDownIcon
            className={`w-3.5 h-3.5 ml-auto stroke-2 transform transition-transform duration-200 ${
              open
                ? "rotate-180 text-brand-palette-primary "
                : "rotate-0 text-brand-black-secondary "
            }`}
          />
        )}
      </div>

      <ErrorMessage error={error} />

      {open && (
        <div
          className={`absolute left-0 z-20 w-full pb-4 text-sm origin-top max-h-64 animate-enterSelect text-brand-black-primary top-12`}
        >
          {filter && (
            <div className="w-full">
              <input
                onChange={(e) => {
                  setOptionState(
                    options.filter((option) =>
                      option.filterValue
                        ?.toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    )
                  );
                }}
                placeholder="Search"
                className="w-full px-3 py-1.5 text-xs border border-b-0 rounded-t border-brand-black-secondaryLight"
              />
            </div>
          )}

          <div
            className={`h-full overflow-y-scroll origin-top bg-white border ${
              filter ? "rounded-b" : "rounded"
            } border-brand-black-secondaryLight max-h-60`}
          >
            {optionsState.length === 0 ? (
              <div className={`px-3 py-2 text-xs select-none`}>
                No options available
              </div>
            ) : (
              optionsState.map((option) => (
                <div
                  onClick={() => {
                    setOpen(false);
                    setOptionState(options);
                    onChange(option.value);
                  }}
                  className={`px-3 py-2 select-none cursor-pointer lg:hover:bg-brand-palette-primary/5 ${
                    option.value === selected
                      ? "bg-brand-palette-primary/5"
                      : ""
                  }`}
                  key={option.value}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
