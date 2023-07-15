import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    PORT: z.coerce.number().min(0).max(65535),
    SERVER_HOST: z.string(),
    NODE_ENV: z.enum(["development", "production", "test"]),
  },
  runtimeEnvStrict: {
    PORT: process.env.PORT,
    SERVER_HOST: process.env.SERVER_HOST,
    NODE_ENV: process.env.NODE_ENV,
  },
});
