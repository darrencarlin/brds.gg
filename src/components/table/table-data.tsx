import { cn } from "@/lib/utils";
import { ReactNode, TableHTMLAttributes } from "react";

interface Props extends TableHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  className?: string;
}

export const TableData = ({ children, className }: Props) => {
  const classname = cn("p-4", className);

  return <td className={classname}>{children}</td>;
};
