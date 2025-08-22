import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Brain, 
  GraduationCap, 
  CreditCard, 
  Coins, 
  ArrowLeftRight, 
  Languages, 
  AlertTriangle,
  Vault,
  Users,
  Mic,
  LogOut,
  Bell,
  Settings,
  Eye,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [balance] = useState("R 2,450.75");
  const [creditScore] = useState(742);
  const [savingsGoal] = useState({ current: 420, target: 800, name: "New Fridge Fund" });

  const handleEmergencyShield = () => {
    setEmergencyMode(true);
    toast({
      title: "🔐 Emergency CyberShield Activated",
      description: "Accounts frozen, trusted contacts notified, biometrics disabled.",
      duration: 5000,
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "Thank you for using AfriSecure Finance",
    });
    // In a real app, this would clear auth state and redirect
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
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

      <div className="container mx-auto px-6 py-8">
        {/* Emergency Shield */}
        <Card className="mb-8 border-2 border-destructive/20 bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Shield className="w-6 h-6" />
              Emergency CyberShield
            </CardTitle>
            <CardDescription>
              One-tap security protection for digital emergencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant={emergencyMode ? "secondary" : "destructive"} 
              size="lg" 
              className="w-full" 
              onClick={handleEmergencyShield}
              disabled={emergencyMode}
            >
              {emergencyMode ? "🔒 Protected Mode Active" : "🚨 Activate Emergency Shield"}
            </Button>
          </CardContent>
        </Card>

        {/* Balance & Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-primary text-white">
            <CardHeader>
              <CardTitle className="text-white/90">Current Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{balance}</p>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+R150 this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-secondary text-white">
            <CardHeader>
              <CardTitle className="text-white/90">Credit Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{creditScore}</p>
              <Badge variant="secondary" className="mt-2">Excellent</Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-accent text-white">
            <CardHeader>
              <CardTitle className="text-white/90">{savingsGoal.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">R{savingsGoal.current} / R{savingsGoal.target}</p>
              <Progress 
                value={(savingsGoal.current / savingsGoal.target) * 100} 
                className="mt-2 bg-white/20"
              />
            </CardContent>
          </Card>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* AI Fraud Detection */}
          <Card className="hover:shadow-design-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                AI Fraud Detection
              </CardTitle>
              <CardDescription>
                Real-time transaction monitoring and risk assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Security Level</span>
                <Badge variant="secondary">High</Badge>
              </div>
              <p className="text-sm">Last scan: 2 minutes ago ✅</p>
            </CardContent>
          </Card>

          {/* Anti-Scam Coach */}
          <Card className="hover:shadow-design-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-secondary" />
                Anti-Scam Coach
              </CardTitle>
              <CardDescription>
                AI-powered scam detection and education
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="w-full mb-2">
                Check Message for Scam
              </Button>
              <p className="text-xs text-muted-foreground">3 new lessons available</p>
            </CardContent>
          </Card>

          {/* Credit Scoring */}
          <Card className="hover:shadow-design-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-accent" />
                AI Credit Scoring
              </CardTitle>
              <CardDescription>
                Alternative credit assessment for the unbanked
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{creditScore}</p>
                <p className="text-sm text-muted-foreground">Your Credit Score</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Apply for Loan
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Smart Savings */}
          <Card className="hover:shadow-design-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-secondary" />
                Smart Savings
              </CardTitle>
              <CardDescription>
                AI-powered financial wellness assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">💡 Save R20 for 5 days, get free data!</p>
              <Progress value={60} className="mb-2" />
              <p className="text-xs text-muted-foreground">Day 3 of 5</p>
            </CardContent>
          </Card>

          {/* Cross-Border Remittance */}
          <Card className="hover:shadow-design-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowLeftRight className="w-5 h-5 text-accent" />
                Remittance Optimizer
              </CardTitle>
              <CardDescription>
                Best rates for cross-border money transfers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm mb-2">
                <p>ZAR 1000 → NGN 41,200</p>
                <p className="text-muted-foreground">via Mukuru (R50 fee)</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Send Money
              </Button>
            </CardContent>
          </Card>

          {/* SafeVault */}
          <Card className="hover:shadow-design-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Vault className="w-5 h-5 text-primary" />
                SafeVault
              </CardTitle>
              <CardDescription>
                Encrypted storage for digital documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">📄 ID Document ✅</p>
                <p className="text-sm">📄 Bank Statement ✅</p>
                <p className="text-sm">📄 Proof of Address ✅</p>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2">
                Upload Document
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <Card className="text-center p-4 hover:shadow-design-md transition-shadow">
            <Languages className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Multilingual Support</h3>
            <p className="text-xs text-muted-foreground">English, isiZulu, Swahili</p>
          </Card>

          <Card className="text-center p-4 hover:shadow-design-md transition-shadow">
            <Eye className="w-8 h-8 text-secondary mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Threat Intelligence</h3>
            <p className="text-xs text-muted-foreground">AI-powered cyber protection</p>
          </Card>

          <Card className="text-center p-4 hover:shadow-design-md transition-shadow">
            <Users className="w-8 h-8 text-accent mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Social Credit</h3>
            <p className="text-xs text-muted-foreground">Community-based scoring</p>
          </Card>

          <Card className="text-center p-4 hover:shadow-design-md transition-shadow">
            <Mic className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Voice Navigation</h3>
            <p className="text-xs text-muted-foreground">Accessibility-first design</p>
          </Card>
        </div>

        {/* Offline Access Link */}
        <Card className="mt-8 text-center bg-gradient-card">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Need Offline Access?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Use our USSD service for basic phone access
            </p>
            <Link to="/offline">
              <Button variant="outline">
                📞 Access via USSD
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;