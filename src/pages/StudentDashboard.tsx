import { useAuth } from '@/contexts/AuthContext';
import { usePoints } from '@/contexts/PointsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Target, 
  Trophy, 
  Calendar,
  TrendingUp,
  Award,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { points, badges, streak, level } = usePoints();

  const currentLevelProgress = (points % 500) / 500 * 100;
  const nextLevelPoints = 500 - (points % 500);

  const recentTasks = [
    { id: 1, title: 'Water Conservation Quiz', status: 'completed', points: 50 },
    { id: 2, title: 'Plastic Pollution Research', status: 'in-progress', points: 75 },
    { id: 3, title: 'Energy Efficiency Challenge', status: 'pending', points: 100 },
  ];

  const weeklyProgress = [
    { day: 'Mon', completed: 3 },
    { day: 'Tue', completed: 2 },
    { day: 'Wed', completed: 4 },
    { day: 'Thu', completed: 1 },
    { day: 'Fri', completed: 3 },
    { day: 'Sat', completed: 0 },
    { day: 'Sun', completed: 0 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}! 🌱</h1>
          <p className="text-muted-foreground mt-2">
            Continue your eco learning journey and make a difference
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{points.toLocaleString()} points</div>
          <div className="text-sm text-muted-foreground">Level {level}</div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="task-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{streak} days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>

        <Card className="task-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">24</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="task-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{badges.length}</div>
            <p className="text-xs text-muted-foreground">Total badges</p>
          </CardContent>
        </Card>

        <Card className="task-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leaderboard</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">#12</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="card-gradient shadow-eco-medium">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Level Progress</span>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Level {level}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {level + 1}</span>
              <span>{nextLevelPoints} points to go</span>
            </div>
            <Progress value={currentLevelProgress} className="h-3" />
          </div>
          <p className="text-sm text-muted-foreground">
            Complete more tasks and challenges to level up and unlock new badges!
          </p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/dashboard/tasks">
          <Card className="task-card group">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-primary mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">New Tasks</h3>
              <p className="text-sm text-muted-foreground">Explore environmental challenges</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/story">
          <Card className="task-card group">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-primary mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Story Mode</h3>
              <p className="text-sm text-muted-foreground">Continue your eco adventure</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/leaderboards">
          <Card className="task-card group">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-primary mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Leaderboards</h3>
              <p className="text-sm text-muted-foreground">See your ranking</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/challenges">
          <Card className="task-card group">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-primary mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Challenges</h3>
              <p className="text-sm text-muted-foreground">Weekly eco challenges</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Activity & Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{task.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      variant={task.status === 'completed' ? 'default' : 'secondary'}
                      className={task.status === 'completed' ? 'bg-success/10 text-success' : ''}
                    >
                      {task.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">+{task.points} points</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Latest Badges */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Latest Badges</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {badges.map((badge) => (
              <div key={badge.id} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg badge-${badge.type}`}>
                  {badge.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{badge.name}</h4>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
                <Badge variant="secondary" className={`badge-${badge.type} text-xs`}>
                  {badge.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;