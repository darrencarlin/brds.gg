"use client";

import { deleteAllData } from "@/actions/actions";
import { BASE_URL } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateSessions } from "@/store/slices/sessions";
import { useQuery } from "convex/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { SessionAnalytics } from "../session-analytics";

export const SessionResults = () => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const dispatch = useAppDispatch();
  const { user: session } = useAppSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
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
      <h3 className="mb-2 text-2xl font-bold">Share Results</h3>
      <div className="mb-4">
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
      <SessionAnalytics sessions={getSessionsById} />

      <h3 className="mt-8 mb-2 text-2xl font-bold">Delete Account</h3>
      <p className="mb-4">
        Deleting your account will remove all your data from our servers.
      </p>
      <div>
        <button
          onClick={async () => {
            setLoading(true);
            const confirm = window.confirm(
              "Are you sure you want to delete your account?"
            );

            if (!confirm) return;

            await deleteAllData();

            await signOut();

            dispatch(
              updateSessions({
                user: {
                  email: "",
                  name: "",
                  image: "",
                  id: "",
                },
                expires: "",
              })
            );

            setLoading(false);

            router.push("/");
          }}
          className="px-4 py-2 text-white bg-red-500 rounded-lg"
        >
          {loading ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
};
