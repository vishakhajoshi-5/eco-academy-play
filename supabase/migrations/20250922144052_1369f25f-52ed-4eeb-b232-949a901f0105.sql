-- Comprehensive fix for all security definer and search path issues

-- Drop existing views completely to ensure clean recreation
DROP VIEW IF EXISTS public.leaderboard CASCADE;
DROP VIEW IF EXISTS public.weekly_leaderboard CASCADE;

-- Drop and recreate the function with proper security settings
DROP FUNCTION IF EXISTS public.update_points_after_submission() CASCADE;

-- Create secure function with proper search path
CREATE OR REPLACE FUNCTION public.update_points_after_submission()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'approved' THEN
    UPDATE public.profiles 
    SET points = points + NEW.score 
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS trigger_update_points_after_submission ON public.submissions;
CREATE TRIGGER trigger_update_points_after_submission
  AFTER INSERT OR UPDATE ON public.submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_points_after_submission();

-- Recreate leaderboard view with explicit security invoker behavior
CREATE OR REPLACE VIEW public.leaderboard 
WITH (security_invoker = true)
AS 
SELECT 
  id AS user_id,
  full_name,
  avatar_url,
  points,
  jsonb_array_length(badges) AS badge_count,
  rank() OVER (ORDER BY points DESC, jsonb_array_length(badges) DESC, created_at) AS rank
FROM public.profiles 
WHERE role = 'student';

-- Recreate weekly_leaderboard view with explicit security invoker behavior
CREATE OR REPLACE VIEW public.weekly_leaderboard 
WITH (security_invoker = true)
AS
SELECT 
  s.user_id,
  p.full_name,
  p.avatar_url,
  COALESCE(SUM(s.score), 0::bigint) AS weekly_points,
  rank() OVER (ORDER BY COALESCE(SUM(s.score), 0::bigint) DESC, MIN(s.created_at)) AS rank
FROM public.submissions s
JOIN public.profiles p ON p.id = s.user_id
WHERE s.status = 'approved' 
  AND s.created_at >= (NOW() - INTERVAL '7 days')
  AND p.role = 'student'
GROUP BY s.user_id, p.full_name, p.avatar_url;

-- Ensure proper permissions
GRANT SELECT ON public.leaderboard TO authenticated;
GRANT SELECT ON public.weekly_leaderboard TO authenticated;