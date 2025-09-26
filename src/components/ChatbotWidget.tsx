import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const faqData = [
  {
    keywords: ['hello', 'hi', 'hey', 'start'],
    response: "Hello! 🌱 I'm EcoBot, your environmental learning assistant. I can help answer questions about ecology, sustainability, and your learning progress. What would you like to know?"
  },
  {
    keywords: ['points', 'score', 'earning'],
    response: "You earn points by completing tasks, participating in challenges, and maintaining your daily streak! Each task is worth different amounts based on difficulty. Keep learning to climb the leaderboards! 🏆"
  },
  {
    keywords: ['badges', 'achievements', 'rewards'],
    response: "Badges are earned by reaching specific milestones! You can unlock bronze, silver, and gold badges for various environmental topics like water conservation, energy efficiency, and biodiversity. Check your profile to see all available badges! 🏅"
  },
  {
    keywords: ['streak', 'daily', 'login'],
    response: "Your learning streak tracks consecutive days of activity on TARUN. Complete at least one task or challenge each day to maintain your streak and earn bonus points! 🔥"
  },
  {
    keywords: ['story', 'episodes', 'adventure'],
    response: "Story Mode takes you on an environmental adventure! Complete tasks to unlock new episodes and follow characters as they solve real-world ecological challenges. It's learning through storytelling! 📚"
  },
  {
    keywords: ['help', 'support', 'stuck'],
    response: "I'm here to help! Try breaking down complex topics into smaller parts, review completed tasks for hints, or ask your educator for guidance. Remember, every expert was once a beginner! 💪"
  }
];

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! 🌱 I'm EcoBot, ready to help with your environmental learning journey. Ask me anything!",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simple keyword matching for FAQ responses
    const lowerInput = inputValue.toLowerCase();
    const matchedFaq = faqData.find(faq => 
      faq.keywords.some(keyword => lowerInput.includes(keyword))
    );

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: matchedFaq?.response || "That's a great question! While I have basic information about environmental topics and TARUN features, for detailed questions, I recommend checking with your educator or exploring the tasks section for more comprehensive learning materials. 🌍",
      sender: 'bot',
      timestamp: new Date(),
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-primary hover:opacity-90 shadow-eco-strong z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-eco-strong z-50 card-gradient">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-xs">🤖</span>
            </div>
            EcoBot
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col h-full pb-4">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent text-accent-foreground'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="flex items-center gap-2 mt-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about eco topics..."
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            size="sm"
            className="bg-gradient-primary hover:opacity-90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};