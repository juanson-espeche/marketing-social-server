import { app } from "./app.ts";
import { ENV } from "./config/env.config.ts";
import { handleError } from "./utils/error.utils.ts";

try {
  console.log(
    `Server running on http://0.0.0.0:${ENV.APP_PORT} in ${ENV.APP_ENV} mode`,
  );
  await app.listen({ port: ENV.APP_PORT, hostname: "0.0.0.0" });
} catch (error) {
  handleError(error, "Server Initialization");
  Deno.exit(1);
}
