"use client";

import { BASE_URL } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateSessions } from "@/store/slices/sessions";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { SessionAnalytics } from "../session-analytics";

export const SessionResults = () => {
  const [copied, setCopied] = useState(false);
  const dispatch = useAppDispatch();
  const { user: session } = useAppSelector((state) => state.auth);

  const getSessionsById = useQuery(api.sessions.getSessionsById, {
    email: session?.email || "",
  });

  useEffect(() => {
    if (!getSessionsById) return;
    dispatch(updateSessions(getSessionsById));
  });

  if (getSessionsById?.length === 0)
    return <p className="text-2xl font-semibold">No sessions found</p>;

  return (
    <div>
      <SessionAnalytics sessions={getSessionsById} />
      <h3 className="mb-2 text-2xl font-bold">Share Results</h3>
      <div>
        <button
          onClick={() => {
            setCopied(true);
            navigator.clipboard.writeText(`${BASE_URL}share/${session?.email}`);

            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg"
        >
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
};
