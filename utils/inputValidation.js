import { z } from "zod";

// Define the schema for each input field
export const userInputValidation = z.object({
  email: z.string().email("Invalid email address."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[\W_]/,
      "Password must contain at least one special character (e.g., !, @, #)."
    ),

  firstName: z
    .string()
    .min(1, "First name is required.")
    .max(50, "First name must be at most 50 characters long."),

  lastName: z
    .string()
    .min(1, "Last name is required.")
    .max(50, "Last name must be at most 50 characters long."),

  country: z
    .string()
    .min(2, "Country name must be at least 2 characters long.")
    .max(100, "Country name must be at most 100 characters long."),

  state: z
    .string()
    .min(2, "State name must be at least 2 characters long.")
    .max(100, "State name must be at most 100 characters long."),
});

export const userLoginInputValidation = z.object({
  email: z.string().email("Invalid email address."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[\W_]/,
      "Password must contain at least one special character (e.g., !, @, #)."
    ),
});

export const createCourseValidation = z.object({
  title: z.string().min(1, "Title is required").trim(),
  description: z.string().min(1, "Description is required").trim(),
  price: z.number().min(0, "Price must be at least 0").positive(),
  imageUrl: z.string().url().optional(), // Assuming the URL is optional
  creatorId: z
    .string()
    .min(1, "Creator ID is required"),
});

export const updateCourseValidation = z.object({
  title: z.string().min(1, "Title is required").trim(),
  description: z.string().min(1, "Description is required").trim(),
  price: z.number().min(0, "Price must be at least 0").positive(),
  imageUrl: z.string().url().optional(), // Assuming the URL is optional
  creatorId: z
    .string()
    .min(1, "Creator ID is required"),
  _id: z
    .string()
    .min(1, "Document ID is required"),
});

export const coursePurchaseValidation = z.object({
  courseId: z
    .string()
    .min(1, "Course ID is required"),
  userId: z
    .string()
    .min(1, "UserId ID is required"),
});

export const myPurchasedCoursesValidation = z.object({
  userId: z
    .string()
    .min(1, "UserId ID is required"),
});



