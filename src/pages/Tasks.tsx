import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Clock, 
  Trophy, 
  BookOpen,
  Droplets,
  Zap,
  Leaf,
  Recycle,
  Globe
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { usePoints } from '@/contexts/PointsContext';
import { toast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  estimatedTime: string;
  isCompleted: boolean;
  icon: any;
}

const Tasks = () => {
  const { user } = useAuth();
  const { addPoints } = usePoints();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Water Conservation Quiz',
      description: 'Test your knowledge about water saving techniques and learn new ways to preserve this precious resource.',
      category: 'Water',
      difficulty: 'easy',
      points: 50,
      estimatedTime: '10 min',
      isCompleted: true,
      icon: Droplets,
    },
    {
      id: '2',
      title: 'Create an Energy Efficiency Plan',
      description: 'Design a comprehensive plan to reduce energy consumption in your home or school.',
      category: 'Energy',
      difficulty: 'hard',
      points: 150,
      estimatedTime: '45 min',
      isCompleted: false,
      icon: Zap,
    },
    {
      id: '3',
      title: 'Plastic Pollution Research Project',
      description: 'Research the impact of plastic pollution on marine life and propose solutions.',
      category: 'Pollution',
      difficulty: 'medium',
      points: 100,
      estimatedTime: '30 min',
      isCompleted: false,
      icon: Recycle,
    },
    {
      id: '4',
      title: 'Local Biodiversity Survey',
      description: 'Document and analyze the plant and animal species in your local area.',
      category: 'Biodiversity',
      difficulty: 'medium',
      points: 120,
      estimatedTime: '60 min',
      isCompleted: false,
      icon: Leaf,
    },
    {
      id: '5',
      title: 'Climate Change Impact Analysis',
      description: 'Study climate change effects in your region and suggest adaptation strategies.',
      category: 'Climate',
      difficulty: 'hard',
      points: 180,
      estimatedTime: '90 min',
      isCompleted: false,
      icon: Globe,
    },
    {
      id: '6',
      title: 'Green Transportation Challenge',
      description: 'Track and optimize your daily transportation to reduce carbon footprint.',
      category: 'Transportation',
      difficulty: 'easy',
      points: 75,
      estimatedTime: '20 min',
      isCompleted: true,
      icon: Leaf,
    },
  ];

  const categories = ['all', 'Water', 'Energy', 'Pollution', 'Biodiversity', 'Climate', 'Transportation'];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStartTask = (task: Task) => {
    if (task.isCompleted) {
      toast({
        title: "Already completed",
        description: "You've already completed this task!",
        variant: "default",
      });
      return;
    }

    // Mock task completion
    toast({
      title: "Task started!",
      description: `You've started "${task.title}". Good luck! 🌱`,
    });
    
    // Simulate task completion after a delay
    setTimeout(() => {
      addPoints(task.points);
      toast({
        title: "Task completed!",
        description: `Great job! You earned ${task.points} points.`,
      });
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success/10 text-success border-success/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'hard': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Environmental Tasks 🎯</h1>
          <p className="text-muted-foreground mt-2">
            Complete challenges to earn points and learn about environmental issues
          </p>
        </div>
        {user?.role === 'educator' && (
          <Button className="bg-gradient-primary hover:opacity-90">
            Create New Task
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              className={`cursor-pointer transition-colors capitalize ${
                selectedCategory === category 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-accent'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => {
          const IconComponent = task.icon;
          return (
            <Card key={task.id} className={`task-card ${task.isCompleted ? 'opacity-75' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <IconComponent className="h-6 w-6 text-primary" />
                  <Badge className={getDifficultyColor(task.difficulty)}>
                    {task.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{task.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{task.description}</p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {task.estimatedTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    {task.points} pts
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {task.category}
                  </Badge>
                  
                  <Button 
                    size="sm"
                    onClick={() => handleStartTask(task)}
                    className={task.isCompleted 
                      ? "bg-success/20 text-success hover:bg-success/30" 
                      : "bg-gradient-primary hover:opacity-90"
                    }
                    disabled={task.isCompleted}
                  >
                    {task.isCompleted ? 'Completed ✓' : 'Start Task'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Tasks;