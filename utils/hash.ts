import { hash, compare } from "../deps.ts";

export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await compare(password, hashedPassword);
};