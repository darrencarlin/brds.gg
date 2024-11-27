import { cn } from "@/lib/utils";
import { Crosshair, DiamondPlus, Gamepad2, Skull, Syringe } from "lucide-react";

interface Props {
  name: string;
}

export const Icon = ({ name }: Props) => {
  const classname = cn("mx-auto h-5 w-5 text-gray-300", {});
  switch (name) {
    case "Skull":
      return <Crosshair className={classname} />;
    case "Crosshair":
      return <Skull className={classname} />;
    case "Syringe":
      return <Syringe className={classname} />;
    case "Gamepad2":
      return <Gamepad2 className={classname} />;
    case "DiamondPlus":
      return <DiamondPlus className={classname} />;
    default:
      return null;
  }
};
