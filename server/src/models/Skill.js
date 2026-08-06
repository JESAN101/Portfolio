import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    proficiency: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    icon: {
      type: String,
      default: "",
    },

    iconPublicId: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: [
        "Frontend",
        "Backend",
        "Database",
        "DevOps",
        "Design",
        "Tools",
        "Other",
      ],
      default: "Other",
    },

    order: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

skillSchema.index({ category: 1, isActive: 1, order: 1 });

export default mongoose.model("Skill", skillSchema);
