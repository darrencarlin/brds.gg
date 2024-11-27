"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { SessionAnalytics } from "../session-analytics";

interface Props {
  email: string;
}

export const ShareSessions = ({ email }: Props) => {
  const sessions = useQuery(api.sessions.getSessionsById, {
    email: decodeURIComponent(email),
  });

  console.log(sessions);

  if (!sessions) return null;

  return (
    <div className="mb-4">
      <SessionAnalytics sessions={sessions} />
    </div>
  );
};
