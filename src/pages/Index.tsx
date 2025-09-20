import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, BookOpen, Trophy, Target } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
              <Leaf className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              EcoLearn
            </h1>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold">Learn Environmental Science Through Interactive Adventures</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of students exploring environmental issues through gamified learning, story mode adventures, and real-world challenges.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 px-8">
                Start Learning
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <Card className="task-card">
            <CardContent className="p-8 text-center">
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Interactive Challenges</h3>
              <p className="text-muted-foreground">Complete environmental tasks and earn points while learning about real-world issues.</p>
            </CardContent>
          </Card>

          <Card className="task-card">
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Story Mode</h3>
              <p className="text-muted-foreground">Follow engaging narratives that teach environmental science through adventure.</p>
            </CardContent>
          </Card>

          <Card className="task-card">
            <CardContent className="p-8 text-center">
              <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Compete & Learn</h3>
              <p className="text-muted-foreground">Join leaderboards, earn badges, and participate in weekly challenges.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
