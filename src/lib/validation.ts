import { z } from 'zod';

// Profile validation schema
export const profileUpdateSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(1, { message: "Name cannot be empty" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Name can only contain letters, spaces, hyphens and apostrophes" }),
});

// Password validation schema
export const passwordUpdateSchema = z.object({
  currentPassword: z.string().min(1, { message: "Current password is required" }),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, { 
      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" 
    }),
  confirmPassword: z.string().min(1, { message: "Password confirmation is required" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// File upload validation
export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  
  if (file.size > maxSize) {
    return { isValid: false, error: 'Image must be smaller than 5MB' };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Only JPEG, PNG, WebP and GIF images are allowed' };
  }
  
  return { isValid: true };
};

// User preferences validation schema
export const userPreferencesSchema = z.object({
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    achievements: z.boolean(),
    reminders: z.boolean(),
  }),
  display: z.object({
    theme: z.enum(['light', 'dark', 'system']),
    language: z.string().min(2).max(5),
    animations: z.boolean(),
    accessibility: z.boolean(),
  }),
  learning: z.object({
    difficulty: z.enum(['easy', 'medium', 'hard']),
    reminders: z.boolean(),
    progress_tracking: z.boolean(),
    gamification: z.boolean(),
  }),
  privacy: z.object({
    profile_visibility: z.enum(['public', 'private']),
    progress_sharing: z.boolean(),
    leaderboard_participation: z.boolean(),
    data_collection: z.boolean(),
  }),
});

// Sanitize input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// Validate and sanitize profile name
export const validateAndSanitizeProfileName = (name: string): { isValid: boolean; sanitizedName?: string; error?: string } => {
  try {
    const sanitizedName = sanitizeInput(name);
    const validatedData = profileUpdateSchema.parse({ full_name: sanitizedName });
    return { isValid: true, sanitizedName: validatedData.full_name };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { isValid: false, error: error.issues[0].message };
      }
      return { isValid: false, error: 'Invalid input' };
    }
};