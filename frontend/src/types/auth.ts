import { User } from "firebase/auth";

export type AuthSession =
  | {
      status: "authenticated";
      current: User;
    }
  | {
      status: "pending" | "unauthenticated";
    };
