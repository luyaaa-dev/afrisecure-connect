import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Routes, Route } from "react-router-dom";
import { Shield, LogOut, Bell, Settings } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import DashboardHome from "./dashboard/DashboardHome";
import EmergencyShield from "./dashboard/EmergencyShield";
import FraudDetection from "./dashboard/FraudDetection";
import AntiScamCoach from "./dashboard/AntiScamCoach";
import CreditScoring from "./dashboard/CreditScoring";

const Dashboard = () => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "Thank you for using AfriSecure Finance",
    });
    window.location.href = "/";
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-muted/30 to-primary/5">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b z-50 h-16">
          <div className="container mx-auto px-6 h-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">AfriSecure Finance</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        <AppSidebar />

        <main className="flex-1 pt-16">
          <div className="container mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/emergency-shield" element={<EmergencyShield />} />
              <Route path="/fraud-detection" element={<FraudDetection />} />
              <Route path="/credit-scoring" element={<CreditScoring />} />
              <Route path="/anti-scam" element={<AntiScamCoach />} /> 
              <Route path="/savings" element={<div className="text-center py-20"><h2 className="text-2xl font-bold">Smart Savings</h2><p className="text-muted-foreground">Coming soon...</p></div>} />
              <Route path="/remittance" element={<div className="text-center py-20"><h2 className="text-2xl font-bold">Cross-Border Payments</h2><p className="text-muted-foreground">Coming soon...</p></div>} />
              <Route path="/safevault" element={<div className="text-center py-20"><h2 className="text-2xl font-bold">SafeVault</h2><p className="text-muted-foreground">Coming soon...</p></div>} />
            </Routes>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;