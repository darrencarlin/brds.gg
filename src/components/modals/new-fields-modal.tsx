"use client";

import { addGame } from "@/actions/game";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setLoading,
  setSelectedGame,
  setSelectedRawgGame,
} from "@/store/slices/app";
import { Field, Fields } from "@/types";
import { Delete, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewFieldsModal = ({ open, onOpenChange }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [fields, setFields] = useState<Fields>([]);
  const [name, setName] = useState("");
  const [type, setType] = useState<Field["type"]>("number");
  const [defaultValue, setDefaultValue] = useState("0");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const { selectedRawgGame } = useAppSelector((state) => state.app);
  const getDefaultValue = (value: string | number | boolean | undefined) => {
    if (String(value) === "true") return "True";
    if (String(value) === "false") return "False";
    return value;
  };

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
      <DialogContent className="w-full min-w-[80vw] min-h-[80vh] max-w-3xl p-6 overflow-hidden rounded-lg  text-white border-neutral-700">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center text-3xl font-semibold">
            <Zap /> Add Metrics for Tracking
          </DialogTitle>
          <DialogDescription className="text-white text-xl">
            Add the metrics you want to track for the leaderboard.
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
              placeholder="Enter Metric Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-label="Metric Name"
              className="w-full bg-white/10 border-white/20 text-white placeholder-white/50 rounded-md focus:outline-none focus:ring-2"
            />
          </div>

          {/* Type Selection */}
          <div>
            <Label className="block text-sm font-medium mb-2">Type</Label>
            <RadioGroup
              value={type}
              className="mt-2 flex gap-6"
              onValueChange={(value) => {
                setType(value as Field["type"]);
              }}
            >
              <div className="flex items-center">
                <RadioGroupItem value="number" id="r1" />
                <Label htmlFor="r1" className="ml-2">
                  Number
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="boolean" id="r2" />
                <Label htmlFor="r2" className="ml-2">
                  Boolean
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Default Value Input */}
          {type === "number" && (
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
                placeholder="0"
                value={defaultValue}
                onChange={(e) => setDefaultValue(e.target.value)}
                required
                aria-label="Default Value"
                className="w-full bg-white/10 border-white/20 text-white placeholder-white/50 rounded-md focus:outline-none focus:ring-2"
              />
            </div>
          )}

          {type === "boolean" && (
            <div>
              <Label className="block text-sm font-medium mb-2">
                Default Value
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder="Select True/False"
                    className="w-full bg-white/10 border-white/20 text-white placeholder-white/50 rounded-md focus:outline-none focus:ring-2"
                  />
                </SelectTrigger>
                <SelectContent className="w-full bg-white/10 border-white/20 text-white placeholder-white/50 rounded-md focus:outline-none focus:ring-2">
                  <SelectItem
                    value="true"
                    className="w-full bg-white/10 border-white/20 text-white placeholder-white/50 rounded-md focus:outline-none focus:ring-2"
                  >
                    True
                  </SelectItem>
                  <SelectItem
                    value="false"
                    className="w-full bg-white/10 border-white/20 text-white placeholder-white/50 rounded-md focus:outline-none focus:ring-2"
                  >
                    False
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </form>

        {/* Footer Section with Add Button */}
        <DialogFooter className="mt-8">
          <Button
            type="button"
            onClick={() => {
              const field = {
                id: name.toLowerCase().replace(" ", "-"),
                name: name.trim(),
                type,
                defaultValue:
                  type === "boolean" ? defaultValue === "true" : defaultValue,
              };

              setFields([...fields, field]);
              setName("");
              setType("number");
              setDefaultValue("0");

              console.log(field);
            }}
            className="w-full sm:w-auto px-4 py-2  rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Add Field
          </Button>
        </DialogFooter>

        {/* Fields Table */}
        {fields.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-900">
                  {fields.map((field) => (
                    <th
                      key={field.id}
                      className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b "
                    >
                      <div className="flex items-center justify-between">
                        <span>{field.name}</span>
                        <button
                          onClick={() => {
                            const newFields = fields.filter(
                              (f) => f.id !== field.id
                            );
                            setFields(newFields);
                          }}
                          aria-label="Delete Field"
                        >
                          <Delete className="stroke-red-500 hover:stroke-red-700 transition-all duration-150" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <tr
                    key={field.id}
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`transition-all duration-300 ease-in-out ${
                      hoveredRow === index ? "" : ""
                    }`}
                  >
                    {fields.map((field, idx) => (
                      <td
                        key={field.id}
                        className={`px-4 py-3 text-sm border-b ${
                          idx === 0 ? "rounded-l-lg" : ""
                        } ${idx === fields.length - 1 ? "rounded-r-lg" : ""}`}
                      >
                        <div className="flex items-center">
                          <span
                            className={`inline-block w-2 h-2 mr-2 rounded-full ${
                              hoveredRow === index ? "" : ""
                            }`}
                          ></span>
                          <span
                            className={`font-medium transition-all duration-300 ease-in-out ${
                              hoveredRow === index ? "" : ""
                            }`}
                          >
                            {getDefaultValue(field.defaultValue)}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Save Fields Button */}
        <Button
          type="button"
          onClick={async () => {
            if (!selectedRawgGame) {
              return;
            }

            const { success, message, data } = await addGame({
              name: selectedRawgGame?.name,
              image: selectedRawgGame?.background_image,
              fields,
            });

            toast(message);

            if (!success) {
              dispatch(setLoading(false));
              return;
            }

            if (success && data) {
              // Serialize the data to avoid non-serializable value was detected in the state
              const payload = JSON.parse(JSON.stringify(data));
              dispatch(setSelectedGame(payload));
              dispatch(setSelectedRawgGame(null));
              dispatch(setLoading(false));
              onOpenChange(false);

              const session = {
                id: "9233bdcc-edf1-4bc6-a75d-3b8a3aa9386f",
              };

              router.push(`/session/${session.id}`);
            }
          }}
          className="w-full sm:w-auto px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Save Fields
        </Button>
      </DialogContent>
    </Dialog>
  );
};
