import { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Settings, 
  TrendingUp, 
  LogOut, 
  Save,
  Upload,
  Camera,
  Key,
  Eye,
  EyeOff
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfilePreferences from '@/components/profile/ProfilePreferences';
import ProfileProgress from '@/components/profile/ProfileProgress';
import { validateAndSanitizeProfileName, validateImageFile, passwordUpdateSchema } from '@/lib/validation';
import { supabase } from '@/integrations/supabase/client';

const ProfileSettings = () => {
  const { user, profile, logout, updateProfile, isLoading } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate and sanitize input
    const validation = validateAndSanitizeProfileName(fullName);
    if (!validation.isValid) {
      toast({
        title: "Invalid input",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    const { error } = await updateProfile({ 
      full_name: validation.sanitizedName 
    });
    
    if (error) {
      toast({
        title: "Error updating profile",
        description: error.message || "There was an error updating your profile.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    }
    setIsUpdating(false);
  };

  const handleAvatarUpload = async (file: File) => {
    if (!user) return;

    const validation = validateImageFile(file);
    if (!validation.isValid) {
      toast({
        title: "Invalid file",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    setIsUploadingAvatar(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;

      // Upload file to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Update profile with new avatar URL
      const { error: updateError } = await updateProfile({ 
        avatar_url: uploadData.path 
      });

      if (updateError) throw updateError;

      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error uploading image",
        description: error.message || "There was an error uploading your profile picture.",
        variant: "destructive",
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = passwordUpdateSchema.parse(passwordData);
      setIsUpdatingPassword(true);

      // Update password with Supabase
      const { error } = await supabase.auth.updateUser({
        password: validatedData.newPassword
      });

      if (error) throw error;

      toast({
        title: "Password updated",
        description: "Your password has been successfully updated.",
      });

      // Clear form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error: any) {
      if (error.issues) {
        toast({
          title: "Invalid input",
          description: error.issues[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error updating password",
          description: error.message || "There was an error updating your password.",
          variant: "destructive",
        });
      }
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const getAvatarUrl = (avatarPath: string | null) => {
    if (!avatarPath) return null;
    const { data } = supabase.storage.from('avatars').getPublicUrl(avatarPath);
    return data.publicUrl;
  };

  const avatarUrl = getAvatarUrl(profile?.avatar_url || null);

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate('/');
  };

  if (isLoading || !user || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">TARUN Profile Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account, preferences, and track your environmental learning progress
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Overview Sidebar */}
          <div className="lg:col-span-1">
            <ProfileHeader profile={profile} user={{ email: user.email || '' }} />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Account
                </TabsTrigger>
                <TabsTrigger value="progress" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Progress
                </TabsTrigger>
                <TabsTrigger value="preferences" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Preferences
                </TabsTrigger>
              </TabsList>

              {/* Account Tab */}
              <TabsContent value="account" className="space-y-6">
                {/* Profile Picture Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                    <CardDescription>
                      Upload a profile picture to personalize your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <Avatar className="h-24 w-24 border-4 border-primary/20">
                        {avatarUrl && <AvatarImage src={avatarUrl} alt={profile?.full_name} />}
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl font-bold">
                          {(profile?.full_name || user?.email || 'U').charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex flex-col gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploadingAvatar}
                          className="flex items-center gap-2"
                        >
                          <Camera className="h-4 w-4" />
                          {isUploadingAvatar ? 'Uploading...' : 'Change Picture'}
                        </Button>
                        <p className="text-xs text-muted-foreground">
                          JPG, PNG, WebP or GIF. Max size 5MB.
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleAvatarUpload(file);
                          }}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Account Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Update your personal information and account settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={user?.email}
                          disabled
                          className="bg-muted"
                        />
                        <p className="text-xs text-muted-foreground">
                          Email address cannot be changed. Contact support if needed.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input
                          id="role"
                          type="text"
                          value={profile?.role}
                          disabled
                          className="bg-muted capitalize"
                        />
                        <p className="text-xs text-muted-foreground">
                          Role cannot be changed after registration.
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          type="submit"
                          disabled={isUpdating || fullName === profile?.full_name}
                          className="flex items-center gap-2"
                        >
                          <Save className="h-4 w-4" />
                          {isUpdating ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Password Update */}
                <Card>
                  <CardHeader>
                    <CardTitle>Password & Security</CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordUpdate} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showCurrentPassword ? "text" : "password"}
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                            placeholder="Enter your current password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                            placeholder="Enter your new password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Password must be at least 8 characters with uppercase, lowercase, and number.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                            placeholder="Confirm your new password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          type="submit"
                          disabled={isUpdatingPassword || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                          className="flex items-center gap-2"
                        >
                          <Key className="h-4 w-4" />
                          {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                
                {/* Sign Out Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Actions</CardTitle>
                    <CardDescription>
                      Manage your account session
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="flex items-center gap-2">
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Sign Out</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to sign out? You'll need to log in again to access your account.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleLogout} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Sign Out
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Progress Tab */}
              <TabsContent value="progress" className="space-y-6">
                <ProfileProgress profile={profile} />
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences" className="space-y-6">
                <ProfilePreferences />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;