import { env } from "@/lib/env";
import { ls } from "@/lib/helpers";
import { signOut } from "@/services/auth-service";
import ky from "ky";

export const api = ky.create({
  prefixUrl: `${env.VITE_API_BASE_URL}/api`,
  hooks: {
    beforeRequest: [
      async (request) => {
        request.headers.set("Authorization", `Bearer ${ls.get("token")}`);
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (response.status === 401) {
          signOut();
        }
      },
    ],
  },
});
