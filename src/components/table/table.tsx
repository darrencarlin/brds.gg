import { cn } from "@/lib/utils";
import { ReactNode, TableHTMLAttributes } from "react";

interface Props extends TableHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  className?: string;
}

export const Table = ({ children, className }: Props) => {
  const classname = cn(
    "border border-gray-700 bg-neutral-900 w-full table-auto overflow-scroll",
    className
  );

  return (
    <div className="overflow-x-scroll hide-scrollbar">
      <table className={classname}>{children}</table>
    </div>
  );
};
