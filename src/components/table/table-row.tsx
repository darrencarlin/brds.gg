import { cn } from "@/lib/utils";
import { ReactNode, TableHTMLAttributes } from "react";

interface Props extends TableHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  className?: string;
}

export const TableRow = ({ children, className }: Props) => {
  const classname = cn("", className);

  return <tr className={classname}>{children}</tr>;
};
