"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateSession } from "@/store/slices/auth";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export const SignOutButton = () => {
  const dispatch = useAppDispatch();
  const { user: session } = useAppSelector((state) => state.auth);

  if (!session?.email) {
    return null;
  }

  return (
    <Button
      type="button"
      className="p-2 rounded"
      onClick={() => {
        signOut();
        dispatch(updateSession(undefined));
      }}
    >
      <LogOut />
    </Button>
  );
};
