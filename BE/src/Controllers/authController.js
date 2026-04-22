export const login = (req, res) => {
  const { username, password } = req.query;

  if (username === "root" && password === "root") {
    return res.json({
      success: true,
      message: "Login successful",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
};