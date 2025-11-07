import mongoose from "mongoose";
import SubCategory from "./subcategory";

const SectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    idindex: {
      type: String,
    },
      featureImage: {
      type: String,

    },
    lectures: [
      {
        idindex: {
          type: String,
        },
        title: {
          type: String,
          required: true,
        },
        slug: {
          type: String,
          default: "",
        },
        content: {
          type: String,
          default: "",
        },
        videourl: {
          type: String,
          default: "",
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ArticlesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    featureImage: {
      type: String,
      
    },
     category: {
        type: mongoose.Schema.Types.ObjectId,
          ref: "SubCategory", // Reference to the Subcategory collection
          required: true,
    },
      // subcategoryId: {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: "SubCategory", // Reference to the Subcategory collection
      //     required: true,
      //   },
    imageAlt: {
      type: String,
      default: "Article feature image",
    },
    sections: [SectionSchema],
  },
  {
    timestamps: true,
  }
);

// Add text index for similar article search
ArticlesSchema.index({
  title: "text",
  "sections.title": "text",
  "sections.content": "text",
});

export default mongoose.models.Articles ||
  mongoose.model("Articles", ArticlesSchema);
