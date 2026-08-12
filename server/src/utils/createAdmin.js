import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Admin from "../models/Admin.js";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@portfolio.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.argv[2];

const createAdmin = async () => {
  try {
    if (!ADMIN_PASSWORD || ADMIN_PASSWORD.length < 8) {
      console.error(
        "Admin password is required and must be at least 8 characters.\n" +
          "Set ADMIN_PASSWORD in your environment or pass it as the first argument."
      );
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);

    const exists = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() });

    if (exists) {
      console.log("Admin already exists");
      process.exit();
    }

    await Admin.create({
      name: "Administrator",
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });

    console.log("✅ Admin Created");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createAdmin();
