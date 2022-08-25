import { FC } from "react";

interface ErrorMessageProps {
  error?: string;
}
const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
  return error ? (
    <span className={`text-xs mt-1 font-normal text-brand-red-primary`}>
      {error}
    </span>
  ) : null;
};

export default ErrorMessage;
