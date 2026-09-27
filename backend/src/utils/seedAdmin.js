import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = process.env.ADMIN_EMAIL || "admin@jobhub.com";
    const password = process.env.ADMIN_PASSWORD || "Admin@123";

    const existing = await User.findOne({ email });
    if (existing) {
      existing.role = "admin";
      existing.password = password;
      await existing.save();
      console.log(`Admin updated: ${email}`);
    } else {
      await User.create({
        name: "JobHub Admin",
        email,
        password,
        role: "admin"
      });
      console.log(`Admin created: ${email}`);
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    await mongoose.disconnect();
  }
};

run();
