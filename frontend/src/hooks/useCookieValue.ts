import { useRef } from "react";

function get(key: string) {
  const target = `; ${document.cookie}`;
  const parts = target.split(`; ${key}=`);
  if (parts.length === 2) return parts[1].split(";")[0];
  return null;
}

export default function useCookieValue(key: string) {
  const value = useRef(get(key));
  return value.current;
}
