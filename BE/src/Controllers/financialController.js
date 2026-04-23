import { supabase } from "../supabase.js";

export const getFinancialActivities = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required.",
      });
    }

    const { data, error } = await supabase
      .from("financial_activity")
      .select("*")
      .eq("userId", userId)
      .order("id", { ascending: true });

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch financial activities.",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched financial activities.",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};

export const createFinancialActivity = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      financialName,
      financialGoal,
      currentAmount,
      userId,
    } = req.body;

    if (
      !startDate ||
      !endDate ||
      !financialName ||
      financialGoal === undefined ||
      !userId
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing data for financial activity.",
      });
    }

    const { data, error } = await supabase
      .from("financial_activity")
      .insert([
        {
          startDate,
          endDate,
          financialName,
          financialGoal,
          currentAmount: currentAmount ?? 0,
          userId,
        },
      ])
      .select();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create financial activity.",
        error: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Financial activity created successfully.",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};

export const editFinancialActivity = async (req, res) => {
  try {
    const { id } = req.query;
    const {
      startDate,
      endDate,
      financialName,
      financialGoal,
      currentAmount,
    } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Financial activity id is required.",
      });
    }

    const updateData = {};

    if (startDate !== undefined) updateData.startDate = startDate;
    if (endDate !== undefined) updateData.endDate = endDate;
    if (financialName !== undefined) updateData.financialName = financialName;
    if (financialGoal !== undefined) updateData.financialGoal = financialGoal;
    if (currentAmount !== undefined) updateData.currentAmount = currentAmount;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update.",
      });
    }

    const { data, error } = await supabase
      .from("financial_activity")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to edit financial activity.",
        error: error.message,
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Financial activity not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Financial activity updated successfully.",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};

export const addToCurrentAmount = async (req, res) => {
  try {
    const { id } = req.query;
    const { amountToAdd } = req.body;

    if (!id || amountToAdd === undefined) {
      return res.status(400).json({
        success: false,
        message: "Id and amountToAdd are required.",
      });
    }

    const numericAmountToAdd = Number(amountToAdd);

    if (isNaN(numericAmountToAdd) || numericAmountToAdd <= 0) {
      return res.status(400).json({
        success: false,
        message: "amountToAdd must be a valid number greater than 0.",
      });
    }

    const { data: existingData, error: fetchError } = await supabase
      .from("financial_activity")
      .select("id, currentAmount")
      .eq("id", id)
      .single();

    if (fetchError) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch financial activity.",
        error: fetchError.message,
      });
    }

    if (!existingData) {
      return res.status(404).json({
        success: false,
        message: "Financial activity not found.",
      });
    }

    const newCurrentAmount =
      Number(existingData.currentAmount || 0) + numericAmountToAdd;

    const { data, error } = await supabase
      .from("financial_activity")
      .update({ currentAmount: newCurrentAmount })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to increase currentAmount.",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "currentAmount increased successfully.",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};

export const deleteFinancialActivity = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Financial activity id is required.",
      });
    }

    const { data, error } = await supabase
      .from("financial_activity")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete financial activity.",
        error: error.message,
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Financial activity not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Financial activity deleted successfully.",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};