import { FC, ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}
const Header: FC<HeaderProps> = ({ children, variant, className }) => {
  if (variant === "h1") {
    return (
      <h1
        className={`text-3xl font-bold md:text-4xl text-brand-black-primary ${
          className || ""
        }`}
      >
        {children}
      </h1>
    );
  }
  if (variant === "h2") {
    return (
      <h2
        className={`text-2xl font-bold md:text-3xl text-brand-black-primary ${
          className || ""
        }`}
      >
        {children}
      </h2>
    );
  }
  if (variant === "h3") {
    return (
      <h3
        className={`text-xl font-bold md:text-2xl text-brand-black-primary ${
          className || ""
        }`}
      >
        {children}
      </h3>
    );
  }
  if (variant === "h4") {
    return (
      <h4
        className={`text-lg font-bold md:text-xl text-brand-black-primary ${
          className || ""
        }`}
      >
        {children}
      </h4>
    );
  }
  if (variant === "h5") {
    return (
      <h5
        className={`text-base font-bold md:text-lg text-brand-black-primary ${
          className || ""
        }`}
      >
        {children}
      </h5>
    );
  }
  if (variant === "h6") {
    return (
      <h6
        className={`text-sm font-bold md:text-base text-brand-black-primary ${
          className || ""
        }`}
      >
        {children}
      </h6>
    );
  }

  return null;
};

export default Header;
