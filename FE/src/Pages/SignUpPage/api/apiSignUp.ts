const signUpApi = `${import.meta.env.VITE_BACKEND_URL_HUB}/api/auth/signup`;

export const postSignUp = async (payload: {
    username: string;
    password: string;
    email:string;
}) => {
    const res = await fetch(signUpApi, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error("Sign up failed");
    }
    return res.json();
};
