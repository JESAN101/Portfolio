import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";
import { AppError } from "../utils/AppError.js";
import { sendError } from "../utils/sendError.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin || !admin.isActive) {
      throw new AppError("Invalid email or password", 401);
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        avatar: admin.avatar,
        role: admin.role,
      },
    });
  } catch (error) {
    return sendError(res, error);
  }
};

export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    admin: req.admin,
  });
};

export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      throw new AppError("Current and new password are required", 400);
    }

    if (newPassword.length < 8) {
      throw new AppError("New password must be at least 8 characters", 400);
    }

    if (!/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      throw new AppError(
        "New password must contain at least one uppercase letter, one lowercase letter, and one number",
        400
      );
    }

    const admin = await Admin.findById(req.admin.id || req.admin._id).select("+password");

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      throw new AppError("Current password is incorrect", 401);
    }

    if (await admin.comparePassword(newPassword)) {
      throw new AppError("New password must be different from the current password", 400);
    }

    admin.password = newPassword; // re-hashed by the pre("save") hook on the model
    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return sendError(res, error);
  }
};