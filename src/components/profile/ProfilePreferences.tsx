import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Bell, Globe, Palette, Volume2, Save, Moon, Sun } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ProfilePreferencesProps {
  onSave: (preferences: any) => void;
}

const ProfilePreferences = ({ onSave }: ProfilePreferencesProps) => {
  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      push: true,
      taskReminders: true,
      weeklyReports: true,
      achievementAlerts: true,
    },
    display: {
      theme: 'light',
      language: 'en',
      animation: true,
      compactMode: false,
    },
    privacy: {
      profileVisibility: 'public',
      shareProgress: true,
      allowMessages: true,
    },
    learning: {
      difficultyPreference: 'adaptive',
      autoNextTask: true,
      showHints: true,
      studyReminders: true,
    }
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const updatePreference = (category: string, key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      await onSave(preferences);
      toast({
        title: "Preferences saved",
        description: "Your preferences have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error saving preferences",
        description: "Failed to save your preferences. Please try again.",
        variant: "destructive",
      });
    }
    setIsUpdating(false);
  };

  return (
    <div className="space-y-6">
      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>
            Manage how you receive notifications and updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="text-sm font-medium">
              Email notifications
            </Label>
            <Switch
              id="email-notifications"
              checked={preferences.notifications.email}
              onCheckedChange={(checked) => updatePreference('notifications', 'email', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications" className="text-sm font-medium">
              Push notifications
            </Label>
            <Switch
              id="push-notifications"
              checked={preferences.notifications.push}
              onCheckedChange={(checked) => updatePreference('notifications', 'push', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="task-reminders" className="text-sm font-medium">
              Task reminders
            </Label>
            <Switch
              id="task-reminders"
              checked={preferences.notifications.taskReminders}
              onCheckedChange={(checked) => updatePreference('notifications', 'taskReminders', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="weekly-reports" className="text-sm font-medium">
              Weekly progress reports
            </Label>
            <Switch
              id="weekly-reports"
              checked={preferences.notifications.weeklyReports}
              onCheckedChange={(checked) => updatePreference('notifications', 'weeklyReports', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="achievement-alerts" className="text-sm font-medium">
              Achievement alerts
            </Label>
            <Switch
              id="achievement-alerts"
              checked={preferences.notifications.achievementAlerts}
              onCheckedChange={(checked) => updatePreference('notifications', 'achievementAlerts', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Display Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Display & Appearance
          </CardTitle>
          <CardDescription>
            Customize how TARUN looks and feels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="theme" className="text-sm font-medium">Theme</Label>
            <Select 
              value={preferences.display.theme} 
              onValueChange={(value) => updatePreference('display', 'theme', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    Light
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    Dark
                  </div>
                </SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language" className="text-sm font-medium">Language</Label>
            <Select 
              value={preferences.display.language} 
              onValueChange={(value) => updatePreference('display', 'language', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="hi">हिन्दी</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="animations" className="text-sm font-medium">
              Enable animations
            </Label>
            <Switch
              id="animations"
              checked={preferences.display.animation}
              onCheckedChange={(checked) => updatePreference('display', 'animation', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="compact-mode" className="text-sm font-medium">
              Compact mode
            </Label>
            <Switch
              id="compact-mode"
              checked={preferences.display.compactMode}
              onCheckedChange={(checked) => updatePreference('display', 'compactMode', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Learning Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Learning Settings
          </CardTitle>
          <CardDescription>
            Customize your learning experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="difficulty" className="text-sm font-medium">Difficulty preference</Label>
            <Select 
              value={preferences.learning.difficultyPreference} 
              onValueChange={(value) => updatePreference('learning', 'difficultyPreference', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy - Gradual learning</SelectItem>
                <SelectItem value="medium">Medium - Balanced challenge</SelectItem>
                <SelectItem value="hard">Hard - Maximum challenge</SelectItem>
                <SelectItem value="adaptive">Adaptive - AI adjusts difficulty</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="auto-next" className="text-sm font-medium">
              Auto-advance to next task
            </Label>
            <Switch
              id="auto-next"
              checked={preferences.learning.autoNextTask}
              onCheckedChange={(checked) => updatePreference('learning', 'autoNextTask', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="show-hints" className="text-sm font-medium">
              Show hints during tasks
            </Label>
            <Switch
              id="show-hints"
              checked={preferences.learning.showHints}
              onCheckedChange={(checked) => updatePreference('learning', 'showHints', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="study-reminders" className="text-sm font-medium">
              Daily study reminders
            </Label>
            <Switch
              id="study-reminders"
              checked={preferences.learning.studyReminders}
              onCheckedChange={(checked) => updatePreference('learning', 'studyReminders', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Privacy & Sharing
          </CardTitle>
          <CardDescription>
            Control how your information is shared
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profile-visibility" className="text-sm font-medium">Profile visibility</Label>
            <Select 
              value={preferences.privacy.profileVisibility} 
              onValueChange={(value) => updatePreference('privacy', 'profileVisibility', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public - Visible to all users</SelectItem>
                <SelectItem value="friends">Friends only</SelectItem>
                <SelectItem value="private">Private - Only you can see</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="share-progress" className="text-sm font-medium">
              Share progress on leaderboards
            </Label>
            <Switch
              id="share-progress"
              checked={preferences.privacy.shareProgress}
              onCheckedChange={(checked) => updatePreference('privacy', 'shareProgress', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="allow-messages" className="text-sm font-medium">
              Allow messages from other users
            </Label>
            <Switch
              id="allow-messages"
              checked={preferences.privacy.allowMessages}
              onCheckedChange={(checked) => updatePreference('privacy', 'allowMessages', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isUpdating}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          {isUpdating ? 'Saving...' : 'Save Preferences'}
        </Button>
      </div>
    </div>
  );
};

export default ProfilePreferences;