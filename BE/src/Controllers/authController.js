import bcrypt from "bcrypt";
import { supabase } from "../supabase.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
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


export const signup = async(req,res) => {
    try {
        const {username, password, email} = req.body;

        if(!username || !password || !email){
            return res.status(400).json({
                success: false,
                message:"Username, password and email are required!"
            });
        }

        if(password.length < 4){
            return res.status(400).json({
                success: false,
                message:"Password must be 4 signs or more!"
            });
        }

        const {data:existingUser, error: existingUserError} = await supabase
        .from("users")
        .select("id")
        .eq("username",username)
        .maybeSingle();

        if (existingUserError){
            console.error("Check existing user error:",existingUserError);
            return res.status(500).json({
                success: false,
                message: "Database error while checking for user!"
            });
        }

        if (existingUser){
            console.error("User already exists: ",existingUser);
            return res.status(409).json({
                success: false,
                message:"User already exists. Try logging in instead!"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const { data: newUser, error: insertError} = await supabase
        .from("users")
        .insert([
            {
                username,
                password: hashedPassword,
                email,
            },
        ])
        .select("id, username")
        .single();

        if(insertError){
            return res.status(500).json({
                success: false,
                message:"Failed to create user!",
            });
        }

        return res.status(201).json({
            success: true,
            message: "Successfully created new user!",
            user: newUser,
        });
    } catch(err){
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};