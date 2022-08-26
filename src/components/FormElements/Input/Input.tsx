import { FC, InputHTMLAttributes, useRef } from "react";
import ErrorMessage from "../ErrorMessage";

export interface InputProps {
  label?: string;
  wrapperClass?: string;
  className?: string;
  props?: InputHTMLAttributes<HTMLInputElement>;
  error?: string;
}

const Input: FC<InputProps> = ({
  wrapperClass,
  className,
  props,
  label,
  error,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col">
      <div className={`flex w-full relative flex-col ${wrapperClass || ""}`}>
        <input
          className={`text-sm h-[42px] w-full peer placeholder-transparent font-normal border text-brand-black-primary rounded border-brand-black-secondaryLight focus:border-brand-palette-primary ${
            className || ""
          }`}
          type="text"
          ref={ref}
          id={`${props?.name}-input-id`}
          {...props}
        />
        {label && (
          <label
            htmlFor={`${props?.name}-input-id`}
            className="absolute left-2 bg-white !leading-none px-1 transform -translate-y-1/2 top-0 text-brand-black-primary text-xs transition-all peer-placeholder-shown:text-sm cursor-text peer-placeholder-shown:text-brand-black-secondary peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:text-brand-palette-primary peer-focus:text-xs"
          >
            {label}
          </label>
        )}
      </div>
      <ErrorMessage error={error} />
    </div>
  );
};

export default Input;
