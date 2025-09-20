import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  BookOpen, 
  Target, 
  TrendingUp,
  Award,
  Clock,
  FileText,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

const EducatorDashboard = () => {
  const studentStats = {
    totalStudents: 45,
    activeToday: 32,
    averageScore: 78,
    completedTasks: 234,
  };

  const recentSubmissions = [
    { id: 1, student: 'Alice Johnson', task: 'Climate Change Essay', score: 95, status: 'reviewed' },
    { id: 2, student: 'Bob Smith', task: 'Water Conservation Quiz', score: 88, status: 'pending' },
    { id: 3, student: 'Carol Davis', task: 'Renewable Energy Project', score: 92, status: 'reviewed' },
  ];

  const topPerformers = [
    { name: 'Alice Johnson', points: 2450, badges: 12 },
    { name: 'David Wilson', points: 2380, badges: 11 },
    { name: 'Emma Brown', points: 2340, badges: 10 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Educator Dashboard 📊</h1>
          <p className="text-muted-foreground mt-2">
            Monitor student progress and manage environmental learning
          </p>
        </div>
        <Link to="/dashboard/tasks">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors">
            Create New Task
          </Badge>
        </Link>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="task-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{studentStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Enrolled this semester</p>
          </CardContent>
        </Card>

        <Card className="task-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{studentStats.activeToday}</div>
            <p className="text-xs text-muted-foreground">Students online today</p>
          </CardContent>
        </Card>

        <Card className="task-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{studentStats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">Class performance</p>
          </CardContent>
        </Card>

        <Card className="task-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{studentStats.completedTasks}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Class Progress Overview */}
      <Card className="card-gradient shadow-eco-medium">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Class Progress Overview</span>
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              {Math.round((studentStats.activeToday / studentStats.totalStudents) * 100)}% Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Water Conservation Module</span>
                <span>92% Complete</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Renewable Energy Module</span>
                <span>76% Complete</span>
              </div>
              <Progress value={76} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Biodiversity Module</span>
                <span>45% Complete</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/dashboard/tasks">
          <Card className="task-card group">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-primary mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Manage Tasks</h3>
              <p className="text-sm text-muted-foreground">Create and edit assignments</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/submissions">
          <Card className="task-card group">
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 text-primary mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Review Submissions</h3>
              <p className="text-sm text-muted-foreground">Grade student work</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/leaderboards">
          <Card className="task-card group">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-primary mb-3 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Analytics</h3>
              <p className="text-sm text-muted-foreground">Student performance</p>
            </CardContent>
          </Card>
        </Link>

        <Card className="task-card group cursor-pointer">
          <CardContent className="p-6 text-center">
            <Award className="h-8 w-8 text-primary mb-3 mx-auto group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold mb-2">Badges</h3>
            <p className="text-sm text-muted-foreground">Manage achievements</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Submissions */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentSubmissions.map((submission) => (
              <div key={submission.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{submission.student}</h4>
                  <p className="text-xs text-muted-foreground">{submission.task}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      variant={submission.status === 'reviewed' ? 'default' : 'secondary'}
                      className={submission.status === 'reviewed' ? 'bg-success/10 text-success' : ''}
                    >
                      {submission.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{submission.score}%</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Top Performers This Week</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPerformers.map((student, index) => (
              <div key={student.name} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === 0 ? 'badge-gold' : index === 1 ? 'badge-silver' : 'badge-bronze'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{student.name}</h4>
                  <p className="text-xs text-muted-foreground">{student.points} points • {student.badges} badges</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EducatorDashboard;