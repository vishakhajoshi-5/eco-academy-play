import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Lock, 
  Play, 
  CheckCircle2,
  Clock,
  Star,
  Award
} from 'lucide-react';
import { usePoints } from '@/contexts/PointsContext';
import { toast } from '@/hooks/use-toast';

interface Episode {
  id: string;
  title: string;
  description: string;
  chapter: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  estimatedTime: string;
  points: number;
  requiredTasks?: number;
  thumbnail: string;
}

const StoryMode = () => {
  const { addPoints, points } = usePoints();
  const [playingEpisode, setPlayingEpisode] = useState<string | null>(null);

  const episodes: Episode[] = [
    {
      id: '1',
      title: 'The Great Water Mystery',
      description: 'Join Maya as she discovers why her town is facing water shortages and learns about water conservation.',
      chapter: 1,
      isUnlocked: true,
      isCompleted: true,
      estimatedTime: '15 min',
      points: 75,
      thumbnail: '🏞️',
    },
    {
      id: '2',
      title: 'The Plastic Ocean Adventure',
      description: 'Dive deep with Captain Torres to explore how plastic pollution affects marine ecosystems.',
      chapter: 2,
      isUnlocked: true,
      isCompleted: false,
      estimatedTime: '20 min',
      points: 100,
      thumbnail: '🌊',
    },
    {
      id: '3',
      title: 'The Energy Detective',
      description: 'Help Alex investigate energy waste in the city and discover renewable energy solutions.',
      chapter: 3,
      isUnlocked: true,
      isCompleted: false,
      estimatedTime: '25 min',
      points: 125,
      requiredTasks: 2,
      thumbnail: '⚡',
    },
    {
      id: '4',
      title: 'The Forest Guardian',
      description: 'Work with Dr. Green to protect endangered species and restore forest habitats.',
      chapter: 4,
      isUnlocked: false,
      isCompleted: false,
      estimatedTime: '30 min',
      points: 150,
      requiredTasks: 5,
      thumbnail: '🌳',
    },
    {
      id: '5',
      title: 'The Climate Time Traveler',
      description: 'Journey through time to witness climate change impacts and explore adaptation strategies.',
      chapter: 5,
      isUnlocked: false,
      isCompleted: false,
      estimatedTime: '35 min',
      points: 200,
      requiredTasks: 8,
      thumbnail: '🌍',
    },
  ];

  const totalEpisodes = episodes.length;
  const completedEpisodes = episodes.filter(e => e.isCompleted).length;
  const unlockedEpisodes = episodes.filter(e => e.isUnlocked).length;
  const progressPercentage = (completedEpisodes / totalEpisodes) * 100;

  const handlePlayEpisode = (episode: Episode) => {
    if (!episode.isUnlocked) {
      toast({
        title: "Episode locked",
        description: `Complete ${episode.requiredTasks} more tasks to unlock this episode.`,
        variant: "destructive",
      });
      return;
    }

    if (episode.isCompleted) {
      toast({
        title: "Episode replay",
        description: "You're rewatching this episode. Enjoy the story!",
      });
    } else {
      toast({
        title: "Episode started",
        description: `Starting "${episode.title}". Enjoy your eco adventure! 🌱`,
      });
      
      // Simulate episode completion
      setTimeout(() => {
        addPoints(episode.points);
        toast({
          title: "Episode completed!",
          description: `Great job! You earned ${episode.points} points.`,
        });
      }, 3000);
    }

    setPlayingEpisode(episode.id);
    
    // Reset after "watching"
    setTimeout(() => {
      setPlayingEpisode(null);
    }, 5000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Story Mode Adventures 📚</h1>
          <p className="text-muted-foreground mt-2">
            Learn about environmental issues through interactive storytelling
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{completedEpisodes}/{totalEpisodes}</div>
          <div className="text-sm text-muted-foreground">Episodes Complete</div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="card-gradient shadow-eco-medium">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Story Progress</span>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Chapter {Math.max(1, completedEpisodes)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-success">{completedEpisodes}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">{unlockedEpisodes}</div>
              <div className="text-xs text-muted-foreground">Unlocked</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-muted-foreground">{totalEpisodes - unlockedEpisodes}</div>
              <div className="text-xs text-muted-foreground">Locked</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Episodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {episodes.map((episode, index) => (
          <Card 
            key={episode.id} 
            className={`story-card ${!episode.isUnlocked ? 'opacity-60' : ''} ${
              episode.isCompleted ? 'border-success/30 bg-success/5' : ''
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="text-4xl mb-2">{episode.thumbnail}</div>
                <div className="flex gap-2">
                  {episode.isCompleted && (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  )}
                  {!episode.isUnlocked && (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </div>
              
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs w-fit">
                  Chapter {episode.chapter}
                </Badge>
                <CardTitle className="text-lg">{episode.title}</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{episode.description}</p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {episode.estimatedTime}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  {episode.points} pts
                </div>
              </div>

              {episode.requiredTasks && !episode.isUnlocked && (
                <div className="p-2 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    Complete {episode.requiredTasks} more tasks to unlock
                  </p>
                </div>
              )}
              
              <Button 
                onClick={() => handlePlayEpisode(episode)}
                className={`w-full ${
                  episode.isCompleted 
                    ? "bg-success/20 text-success hover:bg-success/30" 
                    : episode.isUnlocked 
                      ? "bg-gradient-primary hover:opacity-90"
                      : "bg-muted text-muted-foreground"
                }`}
                disabled={playingEpisode === episode.id}
              >
                {playingEpisode === episode.id ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    Playing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    {episode.isCompleted ? 'Replay Episode' : episode.isUnlocked ? 'Play Episode' : 'Locked'}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievement Section */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Story Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg border ${
              completedEpisodes >= 1 ? 'bg-success/10 border-success/20' : 'bg-muted/20 border-muted'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  completedEpisodes >= 1 ? 'badge-bronze' : 'bg-muted'
                }`}>
                  🥉
                </div>
                <div>
                  <div className="font-medium text-sm">Story Starter</div>
                  <div className="text-xs text-muted-foreground">Complete your first episode</div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg border ${
              completedEpisodes >= 3 ? 'bg-success/10 border-success/20' : 'bg-muted/20 border-muted'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  completedEpisodes >= 3 ? 'badge-silver' : 'bg-muted'
                }`}>
                  🥈
                </div>
                <div>
                  <div className="font-medium text-sm">Eco Explorer</div>
                  <div className="text-xs text-muted-foreground">Complete 3 episodes</div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-lg border ${
              completedEpisodes >= 5 ? 'bg-success/10 border-success/20' : 'bg-muted/20 border-muted'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  completedEpisodes >= 5 ? 'badge-gold' : 'bg-muted'
                }`}>
                  🥇
                </div>
                <div>
                  <div className="font-medium text-sm">Story Master</div>
                  <div className="text-xs text-muted-foreground">Complete all episodes</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryMode;