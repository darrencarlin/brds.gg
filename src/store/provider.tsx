"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from ".";
import { AppState, initialilzeApp } from "./slices/app";

export default function StoreProvider({
  appState,
  children,
}: {
  appState: AppState;
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(initialilzeApp(appState));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
