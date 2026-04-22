const loginApi = `${import.meta.env.VITE_BACKEND_URL_HUB}/api/auth/login`;

export const postLogin = async (payload: {
  username: string;
  password: string;
}) => {
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