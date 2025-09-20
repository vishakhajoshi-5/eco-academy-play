import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, 
  FileText, 
  Calendar, 
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface Submission {
  id: string;
  taskTitle: string;
  studentName: string;
  studentEmail: string;
  submittedAt: Date;
  content: string;
  status: 'pending' | 'reviewed' | 'needs-revision';
  score?: number;
  feedback?: string;
  category: string;
}

const Submissions = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [reviewingSubmission, setReviewingSubmission] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState('');

  const submissions: Submission[] = [
    {
      id: '1',
      taskTitle: 'Water Conservation Quiz',
      studentName: 'Alice Johnson',
      studentEmail: 'alice@student.edu',
      submittedAt: new Date('2024-01-15T10:30:00'),
      content: 'I learned that simple actions like fixing leaks and using low-flow fixtures can save thousands of gallons per year. My research showed that residential water use accounts for 12% of total water consumption, making individual actions significant.',
      status: 'reviewed',
      score: 95,
      feedback: 'Excellent analysis of water conservation methods. Great use of statistics!',
      category: 'Water',
    },
    {
      id: '2',
      taskTitle: 'Plastic Pollution Research',
      studentName: 'Bob Smith',
      studentEmail: 'bob@student.edu',
      submittedAt: new Date('2024-01-14T14:22:00'),
      content: 'Plastic pollution affects marine life through ingestion and entanglement. Microplastics are found in the food chain. Solutions include reducing single-use plastics, better recycling systems, and biodegradable alternatives.',
      status: 'pending',
      category: 'Pollution',
    },
    {
      id: '3',
      taskTitle: 'Energy Efficiency Plan',
      studentName: 'Carol Davis',
      studentEmail: 'carol@student.edu',
      submittedAt: new Date('2024-01-13T16:45:00'),
      content: 'My home energy audit revealed opportunities for 30% energy reduction through LED lighting, smart thermostats, and improved insulation. Cost-benefit analysis shows 3-year payback period.',
      status: 'reviewed',
      score: 88,
      feedback: 'Good practical approach, but could include more renewable energy options.',
      category: 'Energy',
    },
    {
      id: '4',
      taskTitle: 'Biodiversity Survey',
      studentName: 'David Wilson',
      studentEmail: 'david@student.edu',
      submittedAt: new Date('2024-01-12T09:15:00'),
      content: 'Local park survey identified 23 bird species, 15 plant species. Noted decline in native species due to invasive plants. Recommend native plant restoration and invasive species management.',
      status: 'needs-revision',
      score: 72,
      feedback: 'Good observations, but needs more detailed methodology and data presentation.',
      category: 'Biodiversity',
    },
  ];

  const statusOptions = ['all', 'pending', 'reviewed', 'needs-revision'];

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || submission.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleReviewSubmission = (submissionId: string) => {
    if (!score || !feedback) {
      toast({
        title: "Missing information",
        description: "Please provide both score and feedback.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Submission reviewed",
      description: "Feedback has been sent to the student.",
    });
    
    setReviewingSubmission(null);
    setFeedback('');
    setScore('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reviewed': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'needs-revision': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'reviewed': return <CheckCircle2 className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'needs-revision': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  if (user?.role !== 'educator') {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
        <p className="text-muted-foreground">This page is only available for educators.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Student Submissions 📝</h1>
          <p className="text-muted-foreground mt-2">
            Review and provide feedback on student work
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{submissions.filter(s => s.status === 'pending').length}</div>
          <div className="text-sm text-muted-foreground">Pending Review</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search submissions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statusOptions.map((status) => (
            <Badge
              key={status}
              variant={selectedStatus === status ? "default" : "secondary"}
              className={`cursor-pointer transition-colors capitalize ${
                selectedStatus === status 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-accent'
              }`}
              onClick={() => setSelectedStatus(status)}
            >
              {status === 'all' ? 'All' : status.replace('-', ' ')}
            </Badge>
          ))}
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.map((submission) => (
          <Card key={submission.id} className="card-gradient">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{submission.taskTitle}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {submission.studentName}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {submission.submittedAt.toLocaleDateString()}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {submission.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {submission.score && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-warning" />
                      <span className="font-semibold">{submission.score}%</span>
                    </div>
                  )}
                  <Badge className={getStatusColor(submission.status)}>
                    {getStatusIcon(submission.status)}
                    {submission.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Student Info */}
              <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                    {submission.studentName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{submission.studentName}</div>
                  <div className="text-xs text-muted-foreground">{submission.studentEmail}</div>
                </div>
              </div>

              {/* Submission Content */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Submission:</h4>
                <div className="p-3 bg-background/30 rounded-lg border-l-2 border-primary/20">
                  <p className="text-sm text-muted-foreground">{submission.content}</p>
                </div>
              </div>

              {/* Existing Feedback */}
              {submission.feedback && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Your Feedback:</h4>
                  <div className="p-3 bg-success/5 rounded-lg border-l-2 border-success/20">
                    <p className="text-sm">{submission.feedback}</p>
                  </div>
                </div>
              )}

              {/* Review Section */}
              {submission.status === 'pending' && (
                <div className="pt-4 border-t border-border/50">
                  {reviewingSubmission === submission.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Score (0-100)</label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="85"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Feedback</label>
                        <Textarea
                          placeholder="Provide constructive feedback to help the student improve..."
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          rows={4}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => handleReviewSubmission(submission.id)}
                          className="bg-gradient-primary hover:opacity-90"
                        >
                          Submit Review
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => setReviewingSubmission(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      size="sm"
                      onClick={() => setReviewingSubmission(submission.id)}
                      className="bg-gradient-primary hover:opacity-90"
                    >
                      Review Submission
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSubmissions.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No submissions found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Submissions;
