export const getEnvVar = (key: string): string => {
    const value = Deno.env.get(key);
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  };
  
  export const ENV = {
    DB_USER: getEnvVar("DB_USER"),
    DB_PASSWORD: getEnvVar("DB_PASSWORD"),
    DB_NAME: getEnvVar("DB_NAME"),
    DB_HOST: getEnvVar("DB_HOST"),
    DB_PORT: Number(getEnvVar("DB_PORT")),
    JWT_SECRET: getEnvVar("JWT_SECRET"),
  };