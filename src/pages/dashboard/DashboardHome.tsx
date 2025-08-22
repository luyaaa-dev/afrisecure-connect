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
  Eye,
  TrendingUp,
  Users,
  Mic,
  Vault,
  Plus,
  Send,
  Download
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const DashboardHome = () => {
  const { toast } = useToast();
  const [balance] = useState("R 2,450.75");
  const [creditScore] = useState(742);
  const [securityScore] = useState(95);
  const [savingsGoal] = useState({ current: 420, target: 800, name: "New Fridge Fund" });

  const recentTransactions = [
    { id: 1, type: "Credit", amount: "R 150.00", description: "Salary Deposit", time: "Today 14:30" },
    { id: 2, type: "Debit", amount: "R 25.00", description: "Airtime Purchase", time: "Today 12:15" },
    { id: 3, type: "Credit", amount: "R 500.00", description: "Freelance Payment", time: "Yesterday" },
    { id: 4, type: "Debit", amount: "R 85.50", description: "Grocery Store", time: "Yesterday" },
  ];

  const quickActions = [
    { icon: Send, label: "Send Money", color: "text-primary", link: "/dashboard/remittance" },
    { icon: Plus, label: "Add Money", color: "text-secondary", link: "/dashboard" },
    { icon: Download, label: "Withdraw", color: "text-accent", link: "/dashboard" },
    { icon: Shield, label: "Emergency Shield", color: "text-destructive", link: "/dashboard/emergency-shield" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your financial overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-primary text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white/90">Account Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{balance}</div>
            <div className="flex items-center gap-2 mt-2 text-sm text-white/80">
              <TrendingUp className="w-4 h-4" />
              <span>+R150 this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-secondary text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white/90">Security Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityScore}%</div>
            <Badge variant="secondary" className="mt-2 bg-white/20 text-white">Excellent</Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-accent text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white/90">Credit Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{creditScore}</div>
            <Badge variant="secondary" className="mt-2 bg-white/20 text-white">Good</Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-700 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white/90">Savings Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">R{savingsGoal.current} / R{savingsGoal.target}</div>
            <Progress 
              value={(savingsGoal.current / savingsGoal.target) * 100} 
              className="mt-2 bg-white/20"
            />
            <p className="text-xs text-white/80 mt-1">{savingsGoal.name}</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Fast access to common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <Button variant="outline" className="w-full h-20 flex-col gap-2 hover:bg-muted/50">
                  <action.icon className={`w-6 h-6 ${action.color}`} />
                  <span className="text-sm">{action.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.time}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'Credit' ? '+' : '-'}{transaction.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Transactions
            </Button>
          </CardContent>
        </Card>

        {/* Feature Highlights */}
        <Card>
          <CardHeader>
            <CardTitle>Security & Features</CardTitle>
            <CardDescription>Your account protection status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">AI Fraud Detection</p>
                    <p className="text-sm text-muted-foreground">7 threats blocked this month</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-green-600">Active</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-destructive" />
                  <div>
                    <p className="font-medium">Emergency Shield</p>
                    <p className="text-sm text-muted-foreground">Ready for activation</p>
                  </div>
                </div>
                <Badge variant="outline">Ready</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Vault className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="font-medium">SafeVault</p>
                    <p className="text-sm text-muted-foreground">3 documents stored</p>
                  </div>
                </div>
                <Badge variant="secondary">Secure</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Features Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/dashboard/anti-scam">
          <Card className="text-center p-4 hover:shadow-design-md transition-shadow cursor-pointer">
            <GraduationCap className="w-8 h-8 text-secondary mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Anti-Scam Coach</h3>
            <p className="text-xs text-muted-foreground">3 new lessons available</p>
          </Card>
        </Link>

        <Link to="/dashboard/credit-scoring">
          <Card className="text-center p-4 hover:shadow-design-md transition-shadow cursor-pointer">
            <CreditCard className="w-8 h-8 text-accent mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Credit Scoring</h3>
            <p className="text-xs text-muted-foreground">Score: {creditScore}</p>
          </Card>
        </Link>

        <Link to="/dashboard/savings">
          <Card className="text-center p-4 hover:shadow-design-md transition-shadow cursor-pointer">
            <Coins className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Smart Savings</h3>
            <p className="text-xs text-muted-foreground">Day 3 of 5 challenge</p>
          </Card>
        </Link>

        <Link to="/dashboard/remittance">
          <Card className="text-center p-4 hover:shadow-design-md transition-shadow cursor-pointer">
            <ArrowLeftRight className="w-8 h-8 text-secondary mx-auto mb-2" />
            <h3 className="font-semibold text-sm">Cross-Border</h3>
            <p className="text-xs text-muted-foreground">Best rates available</p>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;