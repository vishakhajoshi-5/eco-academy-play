import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Award,
  CheckCircle,
  Clock,
  Flame
} from 'lucide-react';

interface ProfileProgressProps {
  profile: {
    points: number;
    badges: any[];
  };
}

const ProfileProgress = ({ profile }: ProfileProgressProps) => {
  const currentLevel = Math.floor(profile.points / 500) + 1;
  const pointsInCurrentLevel = profile.points % 500;
  const progressPercentage = (pointsInCurrentLevel / 500) * 100;
  const badgeCount = Array.isArray(profile.badges) ? profile.badges.length : 0;
  
  // Mock data for demonstration - in real app, fetch from Supabase
  const weeklyStats = {
    tasksCompleted: 12,
    pointsEarned: 340,
    streakDays: 7,
    timeSpent: 8.5, // hours
  };

  const achievements = [
    {
      id: 1,
      name: "Eco Warrior",
      description: "Completed 10 environmental tasks",
      icon: "🌱",
      type: "bronze",
      progress: 100,
      unlocked: true,
    },
    {
      id: 2,
      name: "Water Guardian",
      description: "Master water conservation",
      icon: "💧",
      type: "silver",
      progress: 80,
      unlocked: false,
    },
    {
      id: 3,
      name: "Climate Champion",
      description: "Complete climate change module",
      icon: "🌍",
      type: "gold",
      progress: 45,
      unlocked: false,
    },
    {
      id: 4,
      name: "Sustainability Master",
      description: "Achieve expert level in all modules",
      icon: "⭐",
      type: "gold",
      progress: 20,
      unlocked: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Level Progress
          </CardTitle>
          <CardDescription>
            Your journey towards becoming an environmental expert
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Level {currentLevel}</span>
            <span className="text-sm text-muted-foreground">
              {pointsInCurrentLevel}/500 points
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {500 - pointsInCurrentLevel} points to reach Level {currentLevel + 1}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            This Week's Activity
          </CardTitle>
          <CardDescription>
            Your learning progress this week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-success/10 to-primary/5 rounded-lg">
              <CheckCircle className="h-6 w-6 mx-auto mb-2 text-success" />
              <div className="text-2xl font-bold">{weeklyStats.tasksCompleted}</div>
              <div className="text-xs text-muted-foreground">Tasks Completed</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-points/10 to-warning/5 rounded-lg">
              <Target className="h-6 w-6 mx-auto mb-2 text-points" />
              <div className="text-2xl font-bold">{weeklyStats.pointsEarned}</div>
              <div className="text-xs text-muted-foreground">Points Earned</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-destructive/10 to-warning/5 rounded-lg">
              <Flame className="h-6 w-6 mx-auto mb-2 text-destructive" />
              <div className="text-2xl font-bold">{weeklyStats.streakDays}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-lg">
              <Clock className="h-6 w-6 mx-auto mb-2 text-accent-foreground" />
              <div className="text-2xl font-bold">{weeklyStats.timeSpent}h</div>
              <div className="text-xs text-muted-foreground">Study Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievement Progress
          </CardTitle>
          <CardDescription>
            Track your progress towards earning new badges
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {achievement.name}
                      {achievement.unlocked && (
                        <Badge variant="secondary" className="text-xs">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {achievement.description}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {achievement.progress}%
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      achievement.type === 'gold' ? 'border-badge-gold text-badge-gold' :
                      achievement.type === 'silver' ? 'border-badge-silver text-badge-silver' :
                      'border-badge-bronze text-badge-bronze'
                    }`}
                  >
                    {achievement.type}
                  </Badge>
                </div>
              </div>
              <Progress 
                value={achievement.progress} 
                className={`h-2 ${achievement.unlocked ? 'opacity-100' : 'opacity-60'}`}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileProgress;