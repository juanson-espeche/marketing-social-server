import { app } from "./app.ts";

const PORT = Deno.env.get("PORT") || 3000;

app.listen({ port: +PORT });
console.log(`Server running on http://localhost:${PORT}`);