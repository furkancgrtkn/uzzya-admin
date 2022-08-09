import { FC, ReactNode, useRef, useState } from "react";
import { faClose, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOnClickOutside } from "usehooks-ts";
import ErrorMessage from "../ErrorMessage";
import Label from "../Label";

interface MultipleSelectProps {
  options: {
    value: string;
    filterValue?: string;
    label: ReactNode;
  }[];
  selecteds: string[];
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (val: string | []) => void;
  error?: string;
  label: string;
}

const MultipleSelect: FC<MultipleSelectProps> = ({
  error,
  onChange,
  disabled,
  selecteds,
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

      {selecteds.length > 0 && (
        <button
          type="button"
          className={`absolute z-20 w-[14px] h-[14px] right-3 ${
            label ? "top-[28px]" : "top-[7px]"
          } transfrom`}
          onClick={() => {
            onChange([]);
          }}
        >
          <FontAwesomeIcon
            icon={faClose}
            className={`w-[14px] h-[14px] text-slate-500`}
          />
        </button>
      )}
      <div
        onClick={() => {
          setOpen(disabled ? false : !open);
          setOptionState(options);
        }}
        className="relative cursor-pointer z-10 flex items-center justify-between w-full h-[38px] px-3 text-sm font-normal bg-white border rounded text-slate-800 border-slate-400  focus:ring-transparent focus:border-slate-400"
      >
        {selecteds.length > 0 ? (
          <div className="overflow-x-auto flex whitespace-nowrap mr-5">
            {options.map((e) => {
              if (selecteds.includes(e.value)) {
                return (
                  <span className="bg-slate-200 rounded mr-1.5 px-1 py-0.5">
                    {e.label}
                  </span>
                );
              }
              return null;
            })}
          </div>
        ) : (
          <span className="text-slate-400">
            {disabled ? "Disabled" : "Select options"}
          </span>
        )}

        {selecteds.length === 0 && (
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`w-3 h-3 text-slate-500 transform transition-transform duration-200 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        )}
      </div>

      <ErrorMessage error={error} />

      {open && (
        <div
          className={`absolute left-0 z-20 w-full pb-4 text-sm origin-top max-h-64 animate-enterMultipleSelect text-slate-800 ${
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
              className="w-full px-2 py-1.5 text-xs border border-b-0 rounded-t border-slate-400"
            />
          </div>

          <div
            className={`h-full overflow-y-scroll origin-top bg-white border rounded-b border-slate-400 max-h-60`}
          >
            {optionsState.length === 0 ? (
              <div className={`px-2 py-2 text-xs select-none`}>
                No options available
              </div>
            ) : (
              optionsState.map((option) => (
                <div
                  onClick={() => {
                    setOptionState(options);
                    onChange(option.value);
                  }}
                  className={`px-3 py-2 select-none cursor-pointer lg:hover:bg-slate-100 ${
                    selecteds.includes(option.value)
                      ? "bg-slate-100 bg-opacity-70"
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

export default MultipleSelect;
