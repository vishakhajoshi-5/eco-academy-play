import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Trophy, 
  Clock, 
  Star,
  Target,
  CheckCircle2,
  Award,
  Flame,
  Users,
  TrendingUp
} from 'lucide-react';
import { usePoints } from '@/contexts/PointsContext';
import { toast } from '@/hooks/use-toast';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'team' | 'global';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  bonusPoints?: number;
  startDate: Date;
  endDate: Date;
  participants: number;
  maxParticipants?: number;
  progress: number;
  maxProgress: number;
  isJoined: boolean;
  isCompleted: boolean;
  category: string;
  icon: string;
}

const WeeklyChallenges = () => {
  const { addPoints } = usePoints();
  const [joiningChallenge, setJoiningChallenge] = useState<string | null>(null);

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Water Warrior Week',
      description: 'Complete 5 water conservation tasks and track your daily water usage',
      type: 'individual',
      difficulty: 'easy',
      points: 200,
      bonusPoints: 50,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-21'),
      participants: 234,
      progress: 2,
      maxProgress: 5,
      isJoined: true,
      isCompleted: false,
      category: 'Water Conservation',
      icon: '💧',
    },
    {
      id: '2',
      title: 'Team Green Energy',
      description: 'Work with your classmates to create renewable energy solutions',
      type: 'team',
      difficulty: 'medium',
      points: 300,
      bonusPoints: 100,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-21'),
      participants: 48,
      maxParticipants: 60,
      progress: 1,
      maxProgress: 3,
      isJoined: true,
      isCompleted: false,
      category: 'Renewable Energy',
      icon: '⚡',
    },
    {
      id: '3',
      title: 'Global Climate Action',
      description: 'Join learners worldwide in documenting climate change impacts',
      type: 'global',
      difficulty: 'hard',
      points: 500,
      bonusPoints: 200,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-28'),
      participants: 1247,
      progress: 0,
      maxProgress: 1,
      isJoined: false,
      isCompleted: false,
      category: 'Climate Change',
      icon: '🌍',
    },
    {
      id: '4',
      title: 'Plastic-Free Challenge',
      description: 'Document alternatives to single-use plastics in your daily life',
      type: 'individual',
      difficulty: 'medium',
      points: 250,
      bonusPoints: 75,
      startDate: new Date('2024-01-22'),
      endDate: new Date('2024-01-28'),
      participants: 0,
      progress: 0,
      maxProgress: 7,
      isJoined: false,
      isCompleted: false,
      category: 'Waste Reduction',
      icon: '♻️',
    },
    {
      id: '5',
      title: 'Biodiversity Explorers',
      description: 'Create a comprehensive local ecosystem survey',
      type: 'team',
      difficulty: 'hard',
      points: 400,
      bonusPoints: 150,
      startDate: new Date('2024-01-22'),
      endDate: new Date('2024-02-05'),
      participants: 12,
      maxParticipants: 30,
      progress: 0,
      maxProgress: 4,
      isJoined: false,
      isCompleted: false,
      category: 'Biodiversity',
      icon: '🦋',
    },
  ];

  const activeChallenges = challenges.filter(c => 
    new Date() >= c.startDate && new Date() <= c.endDate
  );
  const upcomingChallenges = challenges.filter(c => 
    new Date() < c.startDate
  );
  const joinedChallenges = challenges.filter(c => c.isJoined);

  const handleJoinChallenge = (challenge: Challenge) => {
    if (challenge.isJoined) {
      toast({
        title: "Already joined",
        description: "You're already participating in this challenge!",
      });
      return;
    }

    setJoiningChallenge(challenge.id);
    
    setTimeout(() => {
      toast({
        title: "Challenge joined!",
        description: `You've joined "${challenge.title}". Good luck! 🌱`,
      });
      setJoiningChallenge(null);
    }, 1000);
  };

  const handleCompleteTask = (challenge: Challenge) => {
    if (challenge.progress >= challenge.maxProgress) {
      const totalPoints = challenge.points + (challenge.bonusPoints || 0);
      addPoints(totalPoints);
      toast({
        title: "Challenge completed!",
        description: `Congratulations! You earned ${totalPoints} points.`,
      });
    } else {
      toast({
        title: "Task completed!",
        description: `Progress updated: ${challenge.progress + 1}/${challenge.maxProgress}`,
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success/10 text-success border-success/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'hard': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'individual': return <Target className="h-4 w-4" />;
      case 'team': return <Users className="h-4 w-4" />;
      case 'global': return <TrendingUp className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'individual': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'team': return 'bg-purple-500/10 text-purple-700 border-purple-500/20';
      case 'global': return 'bg-green-500/10 text-green-700 border-green-500/20';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Weekly Challenges 📅</h1>
          <p className="text-muted-foreground mt-2">
            Join challenges to earn bonus points and compete with others
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{joinedChallenges.length}</div>
          <div className="text-sm text-muted-foreground">Active Challenges</div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="task-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <Trophy className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-lg font-bold">{activeChallenges.length}</div>
                <div className="text-xs text-muted-foreground">Active This Week</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="task-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold">{challenges.filter(c => c.isCompleted).length}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="task-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold">{upcomingChallenges.length}</div>
                <div className="text-xs text-muted-foreground">Coming Soon</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="task-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold">
                  {challenges.reduce((sum, c) => sum + (c.isCompleted ? c.points : 0), 0)}
                </div>
                <div className="text-xs text-muted-foreground">Points Earned</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Challenges */}
      {activeChallenges.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Flame className="h-6 w-6 text-primary" />
            Active Challenges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeChallenges.map((challenge) => (
              <Card key={challenge.id} className={`task-card ${challenge.isJoined ? 'border-primary/30' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl">{challenge.icon}</div>
                    <div className="flex gap-2">
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                      <Badge className={getTypeColor(challenge.type)}>
                        {getTypeIcon(challenge.type)}
                        {challenge.type}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{challenge.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  
                  {challenge.isJoined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{challenge.progress}/{challenge.maxProgress}</span>
                      </div>
                      <Progress value={(challenge.progress / challenge.maxProgress) * 100} className="h-2" />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {Math.ceil((challenge.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {challenge.participants.toLocaleString()} participants
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        {challenge.points} pts
                        {challenge.bonusPoints && (
                          <span className="text-warning"> +{challenge.bonusPoints} bonus</span>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {challenge.category}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      {challenge.isJoined ? (
                        <Button 
                          size="sm"
                          onClick={() => handleCompleteTask(challenge)}
                          className="bg-gradient-primary hover:opacity-90"
                          disabled={challenge.progress >= challenge.maxProgress}
                        >
                          {challenge.progress >= challenge.maxProgress ? 'Completed ✓' : 'Complete Task'}
                        </Button>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => handleJoinChallenge(challenge)}
                          className="bg-gradient-primary hover:opacity-90"
                          disabled={joiningChallenge === challenge.id}
                        >
                          {joiningChallenge === challenge.id ? 'Joining...' : 'Join Challenge'}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Challenges */}
      {upcomingChallenges.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            Coming Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingChallenges.map((challenge) => (
              <Card key={challenge.id} className="task-card opacity-80">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl">{challenge.icon}</div>
                    <div className="flex gap-2">
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                      <Badge className={getTypeColor(challenge.type)}>
                        {getTypeIcon(challenge.type)}
                        {challenge.type}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{challenge.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Starts {challenge.startDate.toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">
                      {challenge.points} pts
                      {challenge.bonusPoints && (
                        <span className="text-warning"> +{challenge.bonusPoints} bonus</span>
                      )}
                    </div>
                    
                    <Badge variant="outline" className="text-xs">
                      {challenge.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Challenge Leaderboard */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            This Week's Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Emma Thompson', points: 450, challenges: 3 },
              { name: 'Alex Chen', points: 420, challenges: 3 },
              { name: 'Maya Rodriguez', points: 380, challenges: 2 },
            ].map((performer, index) => (
              <div key={performer.name} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === 0 ? 'badge-gold' : index === 1 ? 'badge-silver' : 'badge-bronze'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{performer.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {performer.challenges} challenges active
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">{performer.points} pts</div>
                  <div className="text-xs text-muted-foreground">this week</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyChallenges;