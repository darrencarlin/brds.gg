"use client";

import {
  Crosshair,
  DiamondPlus,
  Gamepad2,
  LogOut,
  Pickaxe,
  Skull,
  WandSparkles,
  Zap,
} from "lucide-react";
import { Button } from "./ui/button";

const icons = [
  "Skull",
  "Crosshair",
  "DiamondPlus",
  "Gamepad2",
  "WandSparkles",
  "Pickaxe",
  "LogOut",
];

export const IconPicker = ({
  icon,
  setIcon,
}: {
  icon: string;
  setIcon: (icon: string) => void;
}) => {
  return (
    <div>
      <p className="block text-sm font-medium mb-2">Choose Icon</p>
      <div className="flex gap-4 p-2 bg-neutral-700 rounded-md">
        {icons.map((i) => (
          <Button
            type="button"
            key={i}
            variant={icon === i ? "secondary" : "ghost"}
            onClick={() => setIcon(i)}
          >
            {i === "Zap" && <Zap className="!size-5" />}
            {i === "Skull" && <Skull className="!size-5" />}
            {i === "Crosshair" && <Crosshair className="!size-5" />}
            {i === "DiamondPlus" && <DiamondPlus className="!size-5" />}
            {i === "Gamepad2" && <Gamepad2 className="!size-5" />}
            {i === "WandSparkles" && <WandSparkles className="!size-5" />}
            {i === "Pickaxe" && <Pickaxe className="!size-5" />}
            {i === "LogOut" && <LogOut className="!size-5" />}
          </Button>
        ))}
      </div>
    </div>
  );
};
