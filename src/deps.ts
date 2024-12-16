// Web framework (Framework used to build the application)
export {
  Application,
  Context,
  Router,
} from "https://deno.land/x/oak@v12.5.0/mod.ts";

// Database (PostgreSQL client)
export { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

// Password hashing and comparison (Bcrypt library)
export { compare, hash } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

// JWT (JSON Web Token utilities)
export { create, decode, verify } from "https://deno.land/x/djwt@v3.0.2/mod.ts";

// Validation library (Zod for schema validation)
export { z } from "https://deno.land/x/zod@v3.20.2/mod.ts";
