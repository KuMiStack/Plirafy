import bcrypt from "bcrypt";
import { supabase } from "../supabase.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const usernameClean = username?.trim();

    if (!usernameClean || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("id, username, password, email")
      .eq("username", usernameClean)
      .maybeSingle();

    if (error) {
      console.error("Supabase login error:", error);
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login controller error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const signUp = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const usernameClean = username?.trim();
    const emailClean = email?.trim().toLowerCase();

    if (!usernameClean || !password || !emailClean) {
      return res.status(400).json({
        success: false,
        message: "Username, password and email are required!",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be 6 characters or more!",
      });
    }

    const { data: existingUser, error: existingUserError } = await supabase
      .from("users")
      .select("id")
      .eq("username", usernameClean)
      .maybeSingle();

    if (existingUserError) {
      console.error("Check existing user error:", existingUserError);
      return res.status(500).json({
        success: false,
        message: "Database error while checking for user!",
      });
    }

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists. Try logging in instead!",
      });
    }

    const { data: existingEmail, error: existingEmailError } = await supabase
      .from("users")
      .select("id")
      .eq("email", emailClean)
      .maybeSingle();

    if (existingEmailError) {
      console.error("Check existing email error:", existingEmailError);
      return res.status(500).json({
        success: false,
        message: "Database error while checking email!",
      });
    }

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exists. Try logging in instead!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          username: usernameClean,
          password: hashedPassword,
          email: emailClean,
        },
      ])
      .select("id, username, email")
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return res.status(500).json({
        success: false,
        message: "Failed to create user!",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Successfully created new user!",
      user: newUser,
    });
  } catch (err) {
    console.error("Sign up controller error:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};