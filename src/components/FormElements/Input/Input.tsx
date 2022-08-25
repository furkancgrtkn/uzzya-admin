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
        className={`text-sm w-full placeholder:text-brand-black-secondaryLight font-normal border text-brand-black-primary rounded border-brand-black-secondaryLight focus:ring-transparent focus:border-brand-black-secondaryLight ${
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
