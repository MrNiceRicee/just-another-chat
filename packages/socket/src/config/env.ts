import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    SERVER_PORT: z.coerce.number().min(0).max(65535),
  },
  runtimeEnvStrict: {
    SERVER_PORT: process.env.PORT,
  },
});
