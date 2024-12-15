// Web framework (Framework used to build the application)
export { Application, Router } from "https://deno.land/x/oak@v12.5.0/mod.ts";

// Database (Database connection to interact with PostgreSQL)
export { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

// Environment configuration (Managing environment variables)
export { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

// Types (Types used in the application, especially for handling requests)
export type { Context } from "https://deno.land/x/oak@v12.5.0/mod.ts";

// Passwords (Utilities for securely hashing and comparing passwords)
export { hash, compare } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

// JWT (Utilities for generating and verifying JSON Web Tokens)
export { create, verify, decode } from "https://deno.land/x/djwt@v3.0.2/mod.ts";