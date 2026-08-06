import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Admin from "../models/Admin.js";

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const exists = await Admin.findOne({
      email: "admin@portfolio.com",
    });

    if (exists) {
      console.log("Admin already exists");
      process.exit();
    }

    await Admin.create({
      name: "Administrator",
      email: "admin@portfolio.com",
      password: "admin12345",
    });

    console.log("✅ Admin Created");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createAdmin();