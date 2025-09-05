import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { PiggyBank, Target, TrendingUp, Calendar, Plus, Trophy, Coins, AlertCircle } from "lucide-react";

interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  category: string;
}

const SavingsAssistant = () => {
  const { toast } = useToast();
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([
    { id: "1", name: "Emergency Fund", target: 10000, current: 3500, deadline: "2025-06-30", category: "Emergency" },
    { id: "2", name: "New Phone", target: 1500, current: 850, deadline: "2025-03-15", category: "Electronics" },
    { id: "3", name: "Vacation Fund", target: 5000, current: 1200, deadline: "2025-12-01", category: "Travel" }
  ]);

  const [newGoal, setNewGoal] = useState({ name: "", target: "", deadline: "", category: "General" });
  const [weeklyBudget] = useState(750);
  const [weeklySpent] = useState(520);

  const handleCreateGoal = () => {
    if (!newGoal.name || !newGoal.target || !newGoal.deadline) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to create a savings goal.",
        variant: "destructive",
      });
      return;
    }

    const goal: SavingsGoal = {
      id: Date.now().toString(),
      name: newGoal.name,
      target: parseFloat(newGoal.target),
      current: 0,
      deadline: newGoal.deadline,
      category: newGoal.category
    };

    setSavingsGoals([...savingsGoals, goal]);
    setNewGoal({ name: "", target: "", deadline: "", category: "General" });
    
    toast({
      title: "Goal Created!",
      description: `${newGoal.name} savings goal has been created successfully.`,
    });
  };

  const handleAddToGoal = (goalId: string, amount: number) => {
    setSavingsGoals(goals => 
      goals.map(goal => 
        goal.id === goalId 
          ? { ...goal, current: Math.min(goal.current + amount, goal.target) }
          : goal
      )
    );
    
    toast({
      title: "Savings Added!",
      description: `R${amount} added to your savings goal.`,
    });
  };

  const totalSaved = savingsGoals.reduce((sum, goal) => sum + goal.current, 0);
  const budgetProgress = (weeklySpent / weeklyBudget) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Smart Savings Assistant
          </h1>
          <p className="text-muted-foreground">
            AI-powered savings guidance and goal tracking for better financial wellness
          </p>
        </div>
        <Badge variant="secondary" className="px-4 py-2">
          <Coins className="w-4 h-4 mr-2" />
          Total Saved: R{totalSaved.toLocaleString()}
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <PiggyBank className="w-8 h-8 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Weekly Savings</p>
                <p className="text-2xl font-bold">R{weeklyBudget - weeklySpent}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-8 h-8 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Active Goals</p>
                <p className="text-2xl font-bold">{savingsGoals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Savings Rate</p>
                <p className="text-2xl font-bold">31%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="w-8 h-8 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Streak</p>
                <p className="text-2xl font-bold">12 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="goals" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="goals">Savings Goals</TabsTrigger>
          <TabsTrigger value="budget">Budget Tracker</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Create New Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Create New Goal</span>
                </CardTitle>
                <CardDescription>Set a new savings target to work towards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-name">Goal Name</Label>
                  <Input
                    id="goal-name"
                    placeholder="e.g., New Car, Holiday Fund"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-target">Target Amount (R)</Label>
                  <Input
                    id="goal-target"
                    type="number"
                    placeholder="5000"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-deadline">Target Date</Label>
                  <Input
                    id="goal-deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  />
                </div>
                <Button onClick={handleCreateGoal} className="w-full">
                  Create Savings Goal
                </Button>
              </CardContent>
            </Card>

            {/* Savings Goals List */}
            <div className="space-y-4">
              {savingsGoals.map((goal) => {
                const progress = (goal.current / goal.target) * 100;
                const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <Card key={goal.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{goal.name}</CardTitle>
                          <CardDescription>
                            R{goal.current.toLocaleString()} / R{goal.target.toLocaleString()}
                          </CardDescription>
                        </div>
                        <Badge variant={daysLeft > 30 ? "secondary" : "destructive"}>
                          {daysLeft > 0 ? `${daysLeft} days left` : "Overdue"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{progress.toFixed(1)}% complete</span>
                        <span>R{(goal.target - goal.current).toLocaleString()} remaining</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAddToGoal(goal.id, 50)}
                        >
                          +R50
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAddToGoal(goal.id, 100)}
                        >
                          +R100
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAddToGoal(goal.id, 200)}
                        >
                          +R200
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Budget Tracker</CardTitle>
              <CardDescription>Monitor your spending against your weekly budget</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Weekly Budget</span>
                  <span className="font-semibold">R{weeklyBudget}</span>
                </div>
                <div className="flex justify-between">
                  <span>Spent This Week</span>
                  <span className="font-semibold">R{weeklySpent}</span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining</span>
                  <span className={`font-semibold ${weeklyBudget - weeklySpent >= 0 ? 'text-success' : 'text-destructive'}`}>
                    R{weeklyBudget - weeklySpent}
                  </span>
                </div>
              </div>
              
              <Progress value={budgetProgress} className="h-3" />
              
              {budgetProgress > 100 && (
                <div className="flex items-center space-x-2 text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">You've exceeded your weekly budget!</span>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>💡 AI Savings Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Based on your spending patterns, you could save an extra R150/week by reducing takeaway purchases. Try meal prepping on Sundays!</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📊 Spending Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Your biggest expense category this month is dining out (32%). Consider setting a monthly limit of R400 for restaurants.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎯 Goal Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <p>At your current saving rate, you'll reach your Emergency Fund goal 2 weeks ahead of schedule. Great job!</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>💰 Optimization Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Consider automating R100 weekly transfers to your savings account. This could help you save R5,200 more this year!</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>🏆 Active Challenge</CardTitle>
                <CardDescription>No-Spend Weekend</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Complete a full weekend without any non-essential purchases</p>
                <Progress value={60} className="mb-2" />
                <p className="text-sm text-muted-foreground">1.2 days remaining</p>
                <p className="text-sm font-semibold text-success">Reward: R50 bonus + achievement badge</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎯 Weekly Challenge</CardTitle>
                <CardDescription>R20 Daily Save</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Save R20 every day for 7 days straight</p>
                <Progress value={75} className="mb-2" />
                <p className="text-sm text-muted-foreground">Day 5 of 7</p>
                <p className="text-sm font-semibold text-success">Reward: R140 saved + streak bonus</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SavingsAssistant;