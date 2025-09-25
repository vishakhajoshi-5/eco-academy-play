import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Bell, Globe, Palette, Volume2, Save, Moon, Sun } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { userPreferencesSchema } from '@/lib/validation';
import { z } from 'zod';

// ... keep existing code

interface PreferencesData {
  notifications: {
    email: boolean;
    push: boolean;
    achievements: boolean;
    reminders: boolean;
  };
  display: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    animations: boolean;
    accessibility: boolean;
  };
  learning: {
    difficulty: 'easy' | 'medium' | 'hard';
    reminders: boolean;
    progress_tracking: boolean;
    gamification: boolean;
  };
  privacy: {
    profile_visibility: 'public' | 'private';
    progress_sharing: boolean;
    leaderboard_participation: boolean;
    data_collection: boolean;
  };
}

const ProfilePreferences = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<PreferencesData>({
    notifications: {
      email: true,
      push: true,
      achievements: true,
      reminders: true,
    },
    display: {
      theme: 'system',
      language: 'en',
      animations: true,
      accessibility: false,
    },
    learning: {
      difficulty: 'medium',
      reminders: true,
      progress_tracking: true,
      gamification: true,
    },
    privacy: {
      profile_visibility: 'public',
      progress_sharing: true,
      leaderboard_participation: true,
      data_collection: true,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // Load preferences from database on component mount
  useEffect(() => {
    const loadPreferences = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error('Error loading preferences:', error);
          return;
        }

        if (data) {
          setPreferences({
            notifications: data.notifications as PreferencesData['notifications'],
            display: data.display as PreferencesData['display'],
            learning: data.learning as PreferencesData['learning'],
            privacy: data.privacy as PreferencesData['privacy'],
          });
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    };

    loadPreferences();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Validate preferences data
      const validatedData = userPreferencesSchema.parse(preferences);

      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          notifications: validatedData.notifications,
          display: validatedData.display,
          learning: validatedData.learning,
          privacy: validatedData.privacy,
        });

      if (error) {
        throw error;
      }
      
      toast({
        title: "Preferences saved",
        description: "Your preferences have been successfully updated.",
      });
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast({
        title: "Error saving preferences", 
        description: error instanceof z.ZodError 
          ? "Invalid preference data. Please check your settings."
          : "There was an error saving your preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreference = (category: keyof PreferencesData, key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
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
            <Label htmlFor="achievement-alerts" className="text-sm font-medium">
              Achievement notifications
            </Label>
            <Switch
              id="achievement-alerts"
              checked={preferences.notifications.achievements}
              onCheckedChange={(checked) => updatePreference('notifications', 'achievements', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="reminders" className="text-sm font-medium">
              Study reminders
            </Label>
            <Switch
              id="reminders"
              checked={preferences.notifications.reminders}
              onCheckedChange={(checked) => updatePreference('notifications', 'reminders', checked)}
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
              checked={preferences.display.animations}
              onCheckedChange={(checked) => updatePreference('display', 'animations', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="accessibility" className="text-sm font-medium">
              Accessibility mode
            </Label>
            <Switch
              id="accessibility"
              checked={preferences.display.accessibility}
              onCheckedChange={(checked) => updatePreference('display', 'accessibility', checked)}
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
              value={preferences.learning.difficulty} 
              onValueChange={(value) => updatePreference('learning', 'difficulty', value as 'easy' | 'medium' | 'hard')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy - Gradual learning</SelectItem>
                <SelectItem value="medium">Medium - Balanced challenge</SelectItem>
                <SelectItem value="hard">Hard - Maximum challenge</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="learning-reminders" className="text-sm font-medium">
              Learning reminders
            </Label>
            <Switch
              id="learning-reminders"
              checked={preferences.learning.reminders}
              onCheckedChange={(checked) => updatePreference('learning', 'reminders', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="progress-tracking" className="text-sm font-medium">
              Progress tracking
            </Label>
            <Switch
              id="progress-tracking"
              checked={preferences.learning.progress_tracking}
              onCheckedChange={(checked) => updatePreference('learning', 'progress_tracking', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="gamification" className="text-sm font-medium">
              Gamification features
            </Label>
            <Switch
              id="gamification"
              checked={preferences.learning.gamification}
              onCheckedChange={(checked) => updatePreference('learning', 'gamification', checked)}
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
              value={preferences.privacy.profile_visibility} 
              onValueChange={(value) => updatePreference('privacy', 'profile_visibility', value as 'public' | 'private')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public - Visible to all users</SelectItem>
                <SelectItem value="private">Private - Only you can see</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="progress-sharing" className="text-sm font-medium">
              Share progress on leaderboards
            </Label>
            <Switch
              id="progress-sharing"
              checked={preferences.privacy.progress_sharing}
              onCheckedChange={(checked) => updatePreference('privacy', 'progress_sharing', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="leaderboard-participation" className="text-sm font-medium">
              Participate in leaderboards
            </Label>
            <Switch
              id="leaderboard-participation"
              checked={preferences.privacy.leaderboard_participation}
              onCheckedChange={(checked) => updatePreference('privacy', 'leaderboard_participation', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="data-collection" className="text-sm font-medium">
              Allow data collection for analytics
            </Label>
            <Switch
              id="data-collection"
              checked={preferences.privacy.data_collection}
              onCheckedChange={(checked) => updatePreference('privacy', 'data_collection', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          {isLoading ? 'Saving...' : 'Save Preferences'}
        </Button>
      </div>
    </div>
  );
};

export default ProfilePreferences;