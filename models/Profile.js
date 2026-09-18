import mongoose from "mongoose";

const SocialLinkSchema = new mongoose.Schema(
  {
    label: { type: String, required: true }, // e.g. "github"
    url: { type: String, required: true },
  },
  { _id: false }
);

const ProfileSchema = new mongoose.Schema(
  {
    // Identity
    name: { type: String, default: "Your Name" },
    logoName: { type: String, default: "Dhukar" },
    role: { type: String, default: "Software Engineer" },
    tagline: { type: String, default: "Frontend Engineer · Team Lead" },
    bio: {
      type: String,
      default: "Write a short introduction about yourself here.",
    },
    bioSecondary: { type: String, default: "" },

    // Hero CTAs
    ctaLabel: { type: String, default: "Get in touch" },
    ctaUrl: { type: String, default: "/contact" },
    whatsappNumber: { type: String, default: "" },
    whatsappMessage: {
      type: String,
      default: "Hello, I came from your website and would like to talk.",
    },

    // Contact / meta
    email: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    location: { type: String, default: "Lagos, Nigeria" },
    utcOffset: { type: String, default: "UTC+1" },

    // Socials
    socialLinks: { type: [SocialLinkSchema], default: [] },

    // SEO
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    ogImage: { type: String, default: "" },

    // Theme
    accentColor: { type: String, default: "emerald" }, // tailwind color family name
  },
  { timestamps: true }
);

export default mongoose.models.Profile ||
  mongoose.model("Profile", ProfileSchema);
