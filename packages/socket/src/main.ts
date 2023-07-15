import fastifyWebsocket from "@fastify/websocket";
import fastify from "fastify";

import { env } from "./config/env";

const envToLogger = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
} as const;

function server() {
  const app = fastify({
    logger: envToLogger[env.NODE_ENV],
  });

  void app.register(fastifyWebsocket, {
    options: {
      maxPayload: 1048576,
    },
  });

  // eslint-disable-next-line @typescript-eslint/require-await
  void app.register(async function (fast) {
    fast.get(
      "/socket",
      { websocket: true },
      (connection /* SocketStream */, req /* FastifyRequest */) => {
        req.log.info("socket connection");

        connection.socket.on("open", () => {
          // message.toString() === 'hi from client'
          req.log.info("a client connected");
          connection.socket.send("hi from server");
        });
        connection.socket.on("close", () => {
          // The connection has been closed
          req.log.info("a client disconnected");
          connection.socket.send("closed");
        });
        connection.socket.on("message", (message, isBinary) => {
          try {
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            const data = isBinary ? message : message.toString();

            if (typeof data === "string") {
              connection.socket.send(`you sent: ${data}`);

              return;
            }
            throw new Error("Expected string");
          } catch (err) {
            const error = err as Error;

            connection.socket.send(`error: ${error.message}`);
          }
        });
      },
    );
  });

  app.get("/health", async (req, res) => {
    req.log.info("health check");

    return res.status(200).send("OK");
  });

  return app;
}

export function start() {
  const app = server();

  // eslint-disable-next-line no-console
  console.log("attempting to start server");
  app.listen({ port: env.SERVER_PORT, host: "0.0.0.0" }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    // eslint-disable-next-line no-console
    console.log(`Server listening at: ${address}`);
  });
}
