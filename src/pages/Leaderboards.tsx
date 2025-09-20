import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Medal, 
  Crown,
  TrendingUp,
  Calendar,
  Award,
  Star,
  Flame,
  Target
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { usePoints } from '@/contexts/PointsContext';

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  level: number;
  badges: number;
  streak: number;
  avatar?: string;
  isCurrentUser?: boolean;
  weeklyPoints?: number;
  completedTasks?: number;
}

const Leaderboards = () => {
  const { user } = useAuth();
  const { points, level, badges, streak } = usePoints();
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'all-time'>('weekly');

  const leaderboardData: LeaderboardEntry[] = [
    {
      id: '1',
      name: 'Emma Thompson',
      points: 2850,
      level: 6,
      badges: 15,
      streak: 21,
      weeklyPoints: 450,
      completedTasks: 34,
    },
    {
      id: '2',
      name: 'Alex Chen',
      points: 2680,
      level: 6,
      badges: 13,
      streak: 18,
      weeklyPoints: 420,
      completedTasks: 31,
    },
    {
      id: '3',
      name: 'Maya Rodriguez',
      points: 2450,
      level: 5,
      badges: 12,
      streak: 15,
      weeklyPoints: 380,
      completedTasks: 29,
    },
    {
      id: '4',
      name: 'David Johnson',
      points: 2340,
      level: 5,
      badges: 11,
      streak: 12,
      weeklyPoints: 360,
      completedTasks: 27,
    },
    {
      id: '5',
      name: user?.name || 'Your Name',
      points: points,
      level: level,
      badges: badges.length,
      streak: streak,
      weeklyPoints: 320,
      completedTasks: 24,
      isCurrentUser: true,
    },
    {
      id: '6',
      name: 'Sophie Williams',
      points: 2180,
      level: 5,
      badges: 10,
      streak: 9,
      weeklyPoints: 300,
      completedTasks: 23,
    },
    {
      id: '7',
      name: 'James Brown',
      points: 2090,
      level: 4,
      badges: 9,
      streak: 7,
      weeklyPoints: 280,
      completedTasks: 21,
    },
  ];

  const currentUserRank = leaderboardData.findIndex(entry => entry.isCurrentUser) + 1;
  const timeframes = ['weekly', 'monthly', 'all-time'] as const;

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Medal className="h-5 w-5 text-orange-600" />;
      default: return <span className="font-bold text-muted-foreground">#{position}</span>;
    }
  };

  const getRankBadgeColor = (position: number) => {
    switch (position) {
      case 1: return 'badge-gold';
      case 2: return 'badge-silver';
      case 3: return 'badge-bronze';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leaderboards 🏆</h1>
          <p className="text-muted-foreground mt-2">
            See how you rank against other eco learners
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">#{currentUserRank}</div>
          <div className="text-sm text-muted-foreground">Your Rank</div>
        </div>
      </div>

      {/* User Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="task-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <Star className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-lg font-bold">{points.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Points</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="task-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-orange-500 rounded-full flex items-center justify-center">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold">{streak}</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="task-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold">{badges.length}</div>
                <div className="text-xs text-muted-foreground">Badges</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="task-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-teal-500 rounded-full flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold">Level {level}</div>
                <div className="text-xs text-muted-foreground">Current Level</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeframe Selection */}
      <div className="flex gap-2">
        {timeframes.map((tf) => (
          <Badge
            key={tf}
            variant={timeframe === tf ? "default" : "secondary"}
            className={`cursor-pointer transition-colors capitalize ${
              timeframe === tf 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-accent'
            }`}
            onClick={() => setTimeframe(tf)}
          >
            {tf.replace('-', ' ')}
          </Badge>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Leaderboard */}
        <div className="lg:col-span-2">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} Rankings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {leaderboardData.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                    entry.isCurrentUser 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'bg-background/50 hover:bg-background/70'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRankBadgeColor(index + 1)}`}>
                      {index < 3 ? (
                        getRankIcon(index + 1)
                      ) : (
                        <span className="font-bold text-sm">#{index + 1}</span>
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                          {entry.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm flex items-center gap-2">
                          {entry.name}
                          {entry.isCurrentUser && (
                            <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                              You
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Level {entry.level} • {entry.badges} badges
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <div className="font-bold text-sm">{entry.points.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">
                      +{entry.weeklyPoints} this week
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Side Stats */}
        <div className="space-y-6">
          {/* Weekly Progress */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Weekly Goal</span>
                  <span>320/500 pts</span>
                </div>
                <Progress value={64} className="h-2" />
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rank Change</span>
                  <span className="text-success font-medium">↑ +2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tasks This Week</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Streak</span>
                  <span className="font-medium">{streak} days 🔥</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievement Highlights */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-4 w-4" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {badges.slice(-3).map((badge) => (
                <div key={badge.id} className="flex items-center gap-3 p-2 bg-background/30 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center badge-${badge.type}`}>
                    {badge.icon}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{badge.name}</div>
                    <div className="text-xs text-muted-foreground">{badge.description}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Challenge */}
          <Card className="card-gradient border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                This Week's Challenge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Complete 5 Water Conservation Tasks</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>2/5 tasks</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                <div className="text-xs text-muted-foreground">
                  Reward: 200 bonus points + Special Badge
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboards;