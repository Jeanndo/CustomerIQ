export type AuthUser = {
  id: number;
  email: string;
  full_name: string;
  role: "owner" | "manager" | "analyst" | "admin" | string;
  company_id: number;
};

export type AuthCompany = {
  id: number;
  name: string;
  slug: string;
};

export type AuthSession = {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
  user: AuthUser;
  company: AuthCompany;
};

export type RegisterPayload = {
  full_name: string;
  email: string;
  password: string;
  company_name: string;
  industry?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};
