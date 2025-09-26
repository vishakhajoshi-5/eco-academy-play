import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Star, Award, Shield, Calendar, Trophy, Target } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ProfileHeaderProps {
  profile: {
    id: string;
    full_name: string;
    role: string;
    avatar_url?: string;
    points: number;
    badges: any[];
    created_at: string;
  };
  user: {
    email: string;
  };
}

const ProfileHeader = ({ profile, user }: ProfileHeaderProps) => {
  const memberSince = new Date(profile.created_at).toLocaleDateString();
  const badgeCount = Array.isArray(profile.badges) ? profile.badges.length : 0;
  const currentLevel = Math.floor(profile.points / 500) + 1;
  const pointsToNextLevel = 500 - (profile.points % 500);
  
  // Get avatar URL from Supabase Storage
  const getAvatarUrl = (avatarPath: string | null) => {
    if (!avatarPath) return null;
    const { data } = supabase.storage.from('avatars').getPublicUrl(avatarPath);
    return data.publicUrl;
  };

  const avatarUrl = getAvatarUrl(profile.avatar_url);

  return (
    <Card className="w-full">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <Avatar className="h-24 w-24 border-4 border-primary/20 shadow-eco-medium">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={profile.full_name} />}
            <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl font-bold">
              {profile.full_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-2xl">{profile.full_name}</CardTitle>
        <CardDescription className="flex items-center justify-center gap-2 text-base">
          <Shield className="h-4 w-4" />
          <span className="capitalize font-medium">{profile.role}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gradient-to-br from-success/10 to-primary/5 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Star className="h-4 w-4 text-points" />
              <span className="text-sm font-medium text-muted-foreground">Total Points</span>
            </div>
            <Badge variant="secondary" className="bg-gradient-to-r from-points/20 to-warning/20 text-lg font-bold px-3 py-1">
              {profile.points.toLocaleString()}
            </Badge>
          </div>
          
          <div className="text-center p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Trophy className="h-4 w-4 text-badge-gold" />
              <span className="text-sm font-medium text-muted-foreground">Level</span>
            </div>
            <Badge variant="secondary" className="bg-gradient-to-r from-badge-gold/20 to-badge-bronze/20 text-lg font-bold px-3 py-1">
              {currentLevel}
            </Badge>
          </div>
          
          <div className="text-center p-3 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Award className="h-4 w-4 text-badge-silver" />
              <span className="text-sm font-medium text-muted-foreground">Badges</span>
            </div>
            <Badge variant="secondary" className="bg-gradient-to-r from-badge-silver/20 to-badge-bronze/20 text-lg font-bold px-3 py-1">
              {badgeCount}
            </Badge>
          </div>
          
          <div className="text-center p-3 bg-gradient-to-br from-warning/10 to-success/10 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Target className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium text-muted-foreground">Next Level</span>
            </div>
            <Badge variant="secondary" className="bg-gradient-to-r from-warning/20 to-success/20 text-sm font-medium px-2 py-1">
              {pointsToNextLevel} pts
            </Badge>
          </div>
        </div>

        <Separator />
        
        {/* Account Info */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Account Information</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{user.email}</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Role: <span className="capitalize font-medium">{profile.role}</span></span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Member since {memberSince}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;