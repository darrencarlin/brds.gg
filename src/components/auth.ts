"use client";

import { useAppDispatch } from "@/store/hooks";
import { updateSession } from "@/store/slices/auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const Auth = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      dispatch(updateSession(session));
    }
  }, [dispatch, session]);

  return null;
};
