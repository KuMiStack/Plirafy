const loginApi = `${import.meta.env.VITE_BACKEND_URL_HUB}/api/auth/login`;

export type LoginResponse = {
  success: boolean;
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

export const postLogin = async (payload: {
  username: string;
  password: string;
}): Promise<LoginResponse> => {
  const res = await fetch(loginApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }
  return res.json();
};
