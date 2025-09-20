import { useAuth } from '@/contexts/AuthContext';
import { usePoints } from '@/contexts/PointsContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Flame, Star } from 'lucide-react';

export const Navbar = () => {
  const { user } = useAuth();
  const { points, streak, level } = usePoints();

  if (!user) return null;

  return (
    <div className="flex items-center gap-4">
      {/* Points Display */}
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-400/30">
          <Star className="h-3 w-3 mr-1" />
          {points.toLocaleString()}
        </Badge>
        
        <Badge variant="secondary" className="bg-gradient-to-r from-red-400/20 to-orange-500/20 text-red-700 dark:text-red-300 border-red-400/30">
          <Flame className="h-3 w-3 mr-1" />
          {streak} day streak
        </Badge>
        
        <div className="text-sm font-medium text-muted-foreground">
          Level {level}
        </div>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-sm font-medium">{user.name}</div>
          <div className="text-xs text-muted-foreground capitalize">{user.role}</div>
        </div>
        <Avatar className="h-8 w-8 border-2 border-primary/20">
          <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs font-bold">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};