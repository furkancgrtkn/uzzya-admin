import { FC } from "react";

interface BadgeProps {
  text: string;
  type: "warning" | "success";
}

const Badge: FC<BadgeProps> = ({ type, text }) => {
  if (type === "success")
    return (
      <span className="bg-brand-green-primaryLight select-none border border-brand-green-primary text-brand-green-primary text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
        {text}
      </span>
    );
  if (type === "warning")
    return (
      <span className="bg-brand-red-primaryLight select-none border border-brand-red-primary text-brand-red-primary text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
        {text}
      </span>
    );
  return null;
};

export default Badge;
