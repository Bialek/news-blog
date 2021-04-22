export const ROLE_ADMIN = "ROLE_ADMIN";
export const ROLE_MODERATOR = "ROLE_MODERATOR";

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : process.env.BASE_URL;
export const STORAGE_TOKEN_KEY = "token";
