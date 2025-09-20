import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { PointsProvider } from "@/contexts/PointsContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import EducatorDashboard from "./pages/EducatorDashboard";
import Tasks from "./pages/Tasks";
import Submissions from "./pages/Submissions";
import StoryMode from "./pages/StoryMode";
import Leaderboards from "./pages/Leaderboards";
import WeeklyChallenges from "./pages/WeeklyChallenges";
import NotFound from "./pages/NotFound";

// Layout
import DashboardLayout from "./layouts/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <PointsProvider>
          <SidebarProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected Dashboard Routes */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route path="student" element={<StudentDashboard />} />
                  <Route path="educator" element={<EducatorDashboard />} />
                  <Route path="tasks" element={<Tasks />} />
                  <Route path="submissions" element={<Submissions />} />
                  <Route path="story" element={<StoryMode />} />
                  <Route path="leaderboards" element={<Leaderboards />} />
                  <Route path="challenges" element={<WeeklyChallenges />} />
                </Route>
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </SidebarProvider>
        </PointsProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;