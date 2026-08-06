import mongoose from "mongoose";

const socialSchema = new mongoose.Schema(
  {
    github: {
      type: String,
      default: "",
      trim: true,
    },
    linkedin: {
      type: String,
      default: "",
      trim: true,
    },
    twitter: {
      type: String,
      default: "",
      trim: true,
    },
    instagram: {
      type: String,
      default: "",
      trim: true,
    },
    facebook: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const profileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    shortBio: {
      type: String,
      default: "",
      trim: true,
    },

    about: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      default: "",
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    availableForWork: {
      type: Boolean,
      default: true,
    },

    socials: {
      type: socialSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Profile", profileSchema);