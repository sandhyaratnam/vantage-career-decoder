import { useEffect, useState, useCallback } from "react";

const KEY = "vantage:state:v1";

export type Application = {
  id: string;
  role: string;
  company: string;
  careerId?: string;
  status: "Saved" | "Applied" | "Interviewing" | "Offer" | "Closed";
  notes?: string;
  jd?: string;
  createdAt: number;
};

export type AppState = {
  answers: Record<string, string>;
  compareIds: string[];
  applications: Application[];
  lastJD: string;
};

const initial: AppState = {
  answers: {},
  compareIds: [],
  applications: [],
  lastJD: "",
};

function read(): AppState {
  if (typeof window === "undefined") return initial;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initial;
    return { ...initial, ...JSON.parse(raw) };
  } catch {
    return initial;
  }
}

function write(s: AppState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new CustomEvent("vantage:state"));
}

export function useAppState() {
  const [state, setState] = useState<AppState>(initial);
  useEffect(() => {
    setState(read());
    const onChange = () => setState(read());
    window.addEventListener("vantage:state", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("vantage:state", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const update = useCallback((updater: (prev: AppState) => AppState) => {
    const next = updater(read());
    write(next);
    setState(next);
  }, []);

  return { state, update };
}
