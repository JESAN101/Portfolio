import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
      default: "",
    },

    coverPublicId: {
      type: String,
      default: "",
    },

    galleryImages: [
      {
        url: String,
        publicId: String,
      },
    ],

    technologies: [
      {
        type: String,
      },
    ],

    githubUrl: {
      type: String,
      default: "",
    },

    liveUrl: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: [
        "Web",
        "Mobile",
        "Desktop",
        "UI/UX",
        "Other",
      ],
      default: "Web",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    published: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.index({ featured: 1 });
projectSchema.index({ published: 1 });
projectSchema.index({ order: 1 });
projectSchema.index({ category: 1, published: 1 });
projectSchema.index({
  title: "text",
  shortDescription: "text",
  description: "text",
  technologies: "text",
});

export default mongoose.model("Project", projectSchema);