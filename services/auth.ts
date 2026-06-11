import { api } from "@/lib/api";
import type { AuthSession, LoginPayload, RegisterPayload } from "@/types/auth";

export function persistSession(session: AuthSession) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("access_token", session.access_token);
  window.localStorage.setItem("refresh_token", session.refresh_token);
  window.localStorage.setItem("auth_user", JSON.stringify(session.user));
  window.localStorage.setItem("auth_company", JSON.stringify(session.company));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("access_token");
  window.localStorage.removeItem("refresh_token");
  window.localStorage.removeItem("auth_user");
  window.localStorage.removeItem("auth_company");
}

export async function register(payload: RegisterPayload) {
  const { data } = await api.post<AuthSession>("/api/auth/register", payload);
  persistSession(data);
  return data;
}

export async function login(payload: LoginPayload) {
  const { data } = await api.post<AuthSession>("/api/auth/login", payload);
  persistSession(data);
  return data;
}

export async function getMe() {
  const { data } = await api.get<AuthSession>("/api/auth/me");
  persistSession(data);
  return data;
}
