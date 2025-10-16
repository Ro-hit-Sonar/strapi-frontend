// Authentication API functions for Strapi integration

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export interface StrapiUser {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  jwt: string;
  user: StrapiUser;
}

export interface LoginData {
  identifier: string; // email or username
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

// Login user
export async function login(data: LoginData): Promise<AuthResponse> {
  const response = await fetch(`${STRAPI_URL}/api/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
}

// Register new user
export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }

  return response.json();
}

// Get current user from token
export async function getMe(token: string): Promise<StrapiUser> {
  const response = await fetch(`${STRAPI_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get user data");
  }

  return response.json();
}

// Logout (client-side only - clear token)
export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("auth-user");
  }
}

// Store auth data in localStorage
export function setAuthData(authResponse: AuthResponse): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth-token", authResponse.jwt);
    localStorage.setItem("auth-user", JSON.stringify(authResponse.user));
  }
}

// Get stored auth data
export function getAuthData(): {
  token: string | null;
  user: StrapiUser | null;
} {
  if (typeof window === "undefined") {
    return { token: null, user: null };
  }

  const token = localStorage.getItem("auth-token");
  const userStr = localStorage.getItem("auth-user");

  let user: StrapiUser | null = null;
  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  return { token, user };
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  const { token } = getAuthData();
  return !!token;
}
