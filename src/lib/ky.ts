import { ls } from "@/lib/helpers";
import ky from "ky";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const api = ky.create({
  prefixUrl: `${BASE_URL}/api`,
  hooks: {
    beforeRequest: [
      async (request) => {
        request.headers.set("Authorization", `Bearer ${ls.get("token")}`);
      },
    ],
  },
});
