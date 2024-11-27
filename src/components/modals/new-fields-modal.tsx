"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setLoading,
  setSelectedGame,
  setSelectedRawgGame,
} from "@/store/slices/app";
import { Field, Fields, Game } from "@/types";
import {
  Crosshair,
  DiamondPlus,
  Gamepad2,
  LogOut,
  Pickaxe,
  Skull,
  Trash2,
  WandSparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { addField, removeField, updateIndicator } from "@/store/slices/game";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { api } from "../../../convex/_generated/api";
import { IconPicker } from "../icon-picker";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewFieldsModal = ({ open, onOpenChange }: Props) => {
  // const router = useRouter();
  const { user: session } = useAppSelector((state) => state.auth);
  const createGame = useMutation(api.game.createGame);
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("Zap");
  const [defaultValue, setDefaultValue] = useState("0");

  const { selectedRawgGame } = useAppSelector((state) => state.app);
  const { fields, indicator } = useAppSelector((state) => state.game);
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (open) {
          // Reset
          dispatch(setSelectedRawgGame(null));
          dispatch(setSelectedGame(null));
          dispatch(setLoading(false));
        }
        onOpenChange(!open);
      }}
    >
      <DialogContent className="w-full max-w-3xl p-6 overflow-hidden rounded-lg bg-neutral-900  text-white border-neutral-700">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center text-3xl font-semibold">
            <Zap /> Add Metrics for Tracking
          </DialogTitle>
          <DialogDescription className="text-white text-xl">
            <span className="block mb-2">
              Add the metrics you want to track for the leaderboard.
            </span>
            <span className="text-neutral-400 text-base font-bold">
              You cannot change the metrics once you save the game.
            </span>
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6">
          {/* Name Input */}
          <div>
            <Label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Metric Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-label="Metric Name"
              className="w-full bg-white/10 border-white/20 text-white placeholder-white/50 rounded-md focus:outline-none focus:ring-2"
            />
          </div>

          {/* Default Value Input */}

          <div>
            <Label
              htmlFor="defaultValue"
              className="block text-sm font-medium mb-2"
            >
              Default Value
            </Label>
            <Input
              id="defaultValue"
              type="number"
              inputMode="numeric"
              placeholder="0"
              value={defaultValue}
              onChange={(e) => setDefaultValue(e.target.value)}
              required
              aria-label="Default Value"
              className="w-full bg-white/10 border-white/20 text-white placeholder-white/50 rounded-md focus:outline-none focus:ring-2"
            />
          </div>

          <div>
            <IconPicker icon={icon} setIcon={setIcon} />
          </div>
        </form>

        {/* Footer Section with Add Button */}
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              const field: Field = {
                id: uuidv4(),
                title: name.trim(),
                name: name.toLowerCase().replace(" ", "-"),
                defaultValue: defaultValue.trim(),
                icon,
              };

              // Default the first field as the key metric indicator
              if (fields?.length === 0) {
                dispatch(updateIndicator(field.name));
              }

              dispatch(addField(field));

              setName("");
              setDefaultValue("0");
            }}
          >
            Add Field
          </Button>
        </DialogFooter>

        {/* Fields Table */}
        <SimpleFieldList />

        {/* Save Fields Button */}
        {fields && fields.length > 0 && (
          <Button
            type="button"
            variant="secondary"
            className="w-fit ml-auto"
            onClick={async () => {
              const game: Game = {
                id: uuidv4(),
                name: selectedRawgGame?.name as string,
                indicator: indicator as string,
                image: selectedRawgGame?.background_image as string,
                user: session?.email as string,
                fields: fields as Fields,
              };

              await createGame({ game });

              dispatch(setSelectedRawgGame(null));
              dispatch(setSelectedGame(null));
              onOpenChange(!open);
              dispatch(setLoading(false));
              toast("Game saved successfully!");

              // if (!selectedRawgGame) {
              //   return;
              // }

              // const { success, message, data } = await addGame({
              //   name: selectedRawgGame?.name,
              //   image: selectedRawgGame?.background_image,
              //   fields,
              // });

              // toast(message);

              // if (!success) {
              //   dispatch(setLoading(false));
              //   return;
              // }

              // if (success && data) {
              //   // Serialize the data to avoid non-serializable value was detected in the state
              //   const payload = JSON.parse(JSON.stringify(data));
              //   dispatch(setSelectedGame(payload));
              //   dispatch(setSelectedRawgGame(null));
              //   dispatch(setLoading(false));
              //   onOpenChange(false);

              //   const session = {
              //     id: "9233bdcc-edf1-4bc6-a75d-3b8a3aa9386f",
              //   };

              //   router.push(`/session/${session.id}`);
              // }
            }}
          >
            Save Game{" "}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

const SimpleFieldList = () => {
  const dispatch = useAppDispatch();
  const { fields, indicator } = useAppSelector((state) => state.game);

  const renderIcon = (icon: string) => {
    switch (icon) {
      case "Zap":
        return <Zap />;
      case "Skull":
        return <Skull />;
      case "Crosshair":
        return <Crosshair />;
      case "DiamondPlus":
        return <DiamondPlus />;
      case "Gamepad2":
        return <Gamepad2 />;
      case "WandSparkles":
        return <WandSparkles />;
      case "Pickaxe":
        return <Pickaxe />;
      case "LogOut":
        return <LogOut />;
      default:
        return null;
    }
  };

  return (
    <div>
      <ul className="space-y-4 bg-neutral-800">
        {fields &&
          fields.map((field) => (
            <li
              key={field.id}
              className="flex items-center justify-between border-b border-white p-2 px-4"
            >
              <div className="flex items-center gap-4">
                <div>{field.title}</div>
                <div>{renderIcon(field.icon)}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    className="bg-white"
                    id="indicator"
                    defaultChecked={indicator === field.name}
                    checked={indicator === field.name}
                    onClick={() => {
                      dispatch(updateIndicator(field.name));
                    }}
                  />
                  <label
                    htmlFor="indicator"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Key Metric Indicator
                  </label>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    dispatch(removeField(field.id));
                  }}
                  aria-label="Delete Field"
                  className="text-white cursor-pointer"
                >
                  <Trash2 />
                </Button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SimpleFieldList;
