import { FC, ReactNode, useRef, useState } from "react";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useOnClickOutside } from "usehooks-ts";
import ErrorMessage from "../ErrorMessage";
import Label from "../Label";

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
  label: string;
}

const Select: FC<SelectProps> = ({
  error,
  onChange,
  disabled,
  selected,
  label,
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
      <Label className="mb-0.5" htmlFor="parent_id">
        {label}
      </Label>

      {selected && (
        <button
          type="button"
          className={`absolute z-20 w-[14px] h-[14px] right-3 ${
            label ? "top-[34px]" : "top-[7px]"
          } transfrom`}
          onClick={() => {
            onChange(undefined);
          }}
        >
          <XMarkIcon
            className={`w-[14px] stroke-2 h-[14px] text-brand-black-secondaryLight`}
          />
        </button>
      )}
      <div
        onClick={() => {
          setOpen(disabled ? false : !open);
          setOptionState(options);
        }}
        className="relative cursor-pointer z-10 flex items-center justify-between w-full h-[38px] px-3 text-sm font-normal bg-white border rounded text-brand-black-primary border-brand-black-secondaryLight  focus:ring-transparent focus:border-brand-black-secondaryLight"
      >
        {options?.filter((option: any) => option.value === selected)[0]
          ?.label || (
          <span className="text-brand-black-secondaryLight">
            {disabled ? "Disabled" : "Select an option"}
          </span>
        )}

        {!selected && (
          <ChevronDownIcon
            className={`w-3 h-3 text-brand-black-secondaryLight transform transition-transform duration-200 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        )}
      </div>

      <ErrorMessage error={error} />

      {open && (
        <div
          className={`absolute left-0 z-20 w-full pb-4 text-sm origin-top max-h-64 animate-enterSelect text-brand-black-primary ${
            label ? "top-[66px]" : "top-11"
          }`}
        >
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

          <div
            className={`h-full overflow-y-scroll origin-top bg-white border rounded-b border-brand-black-secondaryLight max-h-60`}
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
