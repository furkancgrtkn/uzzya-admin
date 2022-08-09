import { FC, InputHTMLAttributes } from "react";
import ErrorMessage from "../ErrorMessage";
import Label from "../Label";

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
  return (
    <div className={`flex w-full flex-col ${wrapperClass || ""}`}>
      {label && <Label className="mb-0.5">{label}</Label>}
      <input
        className={`text-sm w-full placeholder:text-slate-400 font-normal border text-slate-800 rounded border-slate-400  focus:ring-transparent focus:border-slate-400 ${
          className || ""
        }`}
        type="text"
        {...props}
      />
      <ErrorMessage error={error} />
    </div>
  );
};

export default Input;
