import { create, verify, decode, config } from "../deps.ts";

const env = await config();
const keyString = env.JWT_SECRET;

if (!keyString) {
  throw new Error("JWT_SECRET is not defined in the .env file");
}

// Convert string key to CryptoKey
const encoder = new TextEncoder();
const cryptoKey = await crypto.subtle.importKey(
  "raw",
  encoder.encode(keyString),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign", "verify"]
);

export const createToken = async (payload: Record<string, unknown>) => {
  return await create({ alg: "HS256", typ: "JWT" }, payload, cryptoKey);
};

export const verifyToken = async (token: string) => {
  return await verify(token, cryptoKey);
};

export const decodeToken = (token: string) => {
  return decode(token);
};