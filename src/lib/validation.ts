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