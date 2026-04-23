import { supabase } from "../supabase.js";

export const getActivities = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Supabase getActivities error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch activities",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Activities fetched successfully",
      data,
    });
  } catch (err) {
    console.error("getActivities controller error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

export const postActivities = async (req, res) => {
  try {
    const { activityName, description, icon } = req.body || {};

    if (!activityName) {
      return res.status(400).json({
        success: false,
        message: "Activity name is required!",
      });
    }

    const { data, error } = await supabase
      .from("activities")
      .insert([
        {
          activityName,
          description,
          icon,
        },
      ])
      .select();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create activity.",
        error: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Activity created successfully!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};

export const deleteActivities = async (req, res) => {
  try {
    const { activityName } = req.query;

    if (!activityName) {
      return res.status(400).json({
        success: false,
        message: "No ActivityName found!",
      });
    }

    const { data, error } = await supabase
      .from("activities")
      .delete()
      .eq("activityName", activityName)
      .select();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete activity.",
        error: error.message,
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Couldn't find activity with selected name!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Activity deleted successfully!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const AssignActivityToUser = async (req, res) => {
  try {
    const { userId, activityId } = req.body || {};

    if (!userId || !activityId) {
      return res.status(400).json({
        success: false,
        message: "UserID and ActivityID are required!",
      });
    }

    const { data, error } = await supabase
      .from("user_activities")
      .insert([
        {
          userId,
          activityId,
        },
      ])
      .select();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to assign activity to user!",
        error: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Activity successfully assigned!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const getUserActivities = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserID is required.",
      });
    }

    const { data, error } = await supabase
      .from("user_activities")
      .select(`
        id,
        userId,
        activityId,
        created_at,
        activities (
          id,
          activityName,
          description,
          icon
        )
      `)
      .eq("userId", userId);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch activities for user.",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully found user's activities.",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};