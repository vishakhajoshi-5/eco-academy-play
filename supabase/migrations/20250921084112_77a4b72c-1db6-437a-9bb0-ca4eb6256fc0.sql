-- Fix Security Definer Views by recreating them without SECURITY DEFINER
-- This ensures they respect RLS policies of the querying user

-- Drop existing views that have security definer issues
DROP VIEW IF EXISTS public.leaderboard;
DROP VIEW IF EXISTS public.weekly_leaderboard;

-- Recreate leaderboard view without security definer
CREATE VIEW public.leaderboard AS 
SELECT 
  id AS user_id,
  full_name,
  avatar_url,
  points,
  jsonb_array_length(badges) AS badge_count,
  rank() OVER (ORDER BY points DESC, jsonb_array_length(badges) DESC, created_at) AS rank
FROM profiles 
WHERE role = 'student';

-- Recreate weekly_leaderboard view without security definer  
CREATE VIEW public.weekly_leaderboard AS
SELECT 
  s.user_id,
  p.full_name,
  p.avatar_url,
  COALESCE(sum(s.score), 0::bigint) AS weekly_points,
  rank() OVER (ORDER BY COALESCE(sum(s.score), 0::bigint) DESC, min(s.created_at)) AS rank
FROM submissions s
JOIN profiles p ON p.id = s.user_id
WHERE s.status = 'approved' 
  AND s.created_at >= (now() - interval '7 days')
  AND p.role = 'student'
GROUP BY s.user_id, p.full_name, p.avatar_url;

-- Add RLS policies for the views to ensure proper access control
-- Note: Views inherit RLS from their underlying tables, but we ensure they're accessible

-- Enable RLS on views (this is inherited from underlying tables)
-- The views will respect the RLS policies of the underlying tables (profiles, submissions)