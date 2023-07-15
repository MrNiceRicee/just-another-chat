import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    SERVER_PORT: z.coerce.number().min(0).max(65535),
    NODE_ENV: z.enum(["development", "production", "test"]),
  },
  runtimeEnvStrict: {
    SERVER_PORT: process.env.SERVER_PORT,
    NODE_ENV: process.env.NODE_ENV,
  },
});
