import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    image: {
      type: String,
      default: "https://placehold.co/600x400",
    },
    password: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
    },
    // Additional Profile Fields
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    zipCode: {
      type: String,
      trim: true,
    },
    // Permanent Address Array
    permanentAddresses: [
      {
        addressType: {
          type: String,
          enum: ["permanent", "temporary", "office", "other"],
          default: "permanent",
        },
        province: {
          type: String,
          trim: true,
        },
        district: {
          type: String,
          trim: true,
        },
        municipality: {
          type: String,
          trim: true,
        },
        ward: {
          type: String,
          trim: true,
        },
        streetAddress: {
          type: String,
          trim: true,
        },
        city: {
          type: String,
          trim: true,
        },
        zipCode: {
          type: String,
          trim: true,
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    bio: {
      type: String,
      maxLength: 500,
    },
    // Identity Information Fields
    motherName: {
      type: String,
      trim: true,
    },
    fatherName: {
      type: String,
      trim: true,
    },
    citizenshipNumber: {
      type: String,
      trim: true,
    },
    district: {
      type: String,
      trim: true,
    },
    citizenshipFront: {
      type: String,
    },
    citizenshipBack: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    subscription: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);