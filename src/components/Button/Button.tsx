import React, { FC, ReactNode } from "react";

interface ButtonProps {
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  disabled,
  type = "button",
  loading = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`flex disabled:opacity-70 items-center justify-center truncate ${
        className || ""
      }`}
    >
      {loading ? "Yükleniyor..." : children}
    </button>
  );
};

export default Button;
