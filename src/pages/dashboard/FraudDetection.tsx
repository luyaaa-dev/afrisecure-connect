import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Brain, Shield, Clock, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";

const FraudDetection = () => {
  const detectionEvents = [
    {
      type: "Suspicious Login",
      risk: "medium risk",
      description: "Login attempt from unusual location (Cape Town)",
      time: "2 hours ago",
      status: "blocked",
      confidence: "85% confidence"
    },
    {
      type: "Large Transaction",
      risk: "low risk", 
      description: "R2,500 transfer at 11:30 PM - unusual time pattern",
      time: "Yesterday",
      status: "flagged",
      confidence: "72% confidence"
    },
    {
      type: "Device Change",
      risk: "high risk",
      description: "New device detected accessing account", 
      time: "3 days ago",
      status: "verified",
      confidence: "95% confidence"
    }
  ];

  const behavioralInsights = [
    { name: "Spending Pattern Analysis", accuracy: 88, description: "Your spending is 15% higher than usual this month" },
    { name: "Transaction Timing", accuracy: 94, description: "Most transactions occur between 9 AM - 6 PM (normal pattern)" },
    { name: "Location Consistency", accuracy: 100, description: "All transactions from expected locations this week" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Fraud Detection Engine</h1>
        <p className="text-muted-foreground mt-2">
          Advanced machine learning algorithms monitor your financial behavior and detect suspicious activities in real-time.
        </p>
      </div>

      {/* Risk Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-green-600">15%</div>
              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200">
                Low Risk
              </Badge>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">
              Your account shows normal activity patterns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Threats Blocked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">7</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="w-3 h-3 text-green-500" />
              <p className="text-sm text-muted-foreground">
                This month - 12% fewer than last month
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Detection Speed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">2.3s</div>
            <p className="text-sm text-muted-foreground mt-1">
              Average threat detection time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Detection Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Detection Activity</CardTitle>
          <CardDescription>
            Latest fraud detection events and their outcomes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {detectionEvents.map((event, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {event.status === "blocked" && <AlertTriangle className="w-5 h-5 text-red-500" />}
                  {event.status === "flagged" && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                  {event.status === "verified" && <CheckCircle className="w-5 h-5 text-green-500" />}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{event.type}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        event.risk === "high risk" ? "border-red-200 text-red-700" :
                        event.risk === "medium risk" ? "border-yellow-200 text-yellow-700" :
                        "border-green-200 text-green-700"
                      }`}
                    >
                      {event.risk}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{event.time}</span>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={event.status === "blocked" ? "destructive" : event.status === "flagged" ? "secondary" : "default"}
                        className="text-xs"
                      >
                        {event.status}
                      </Badge>
                      <span className="text-muted-foreground">{event.confidence}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Behavioral Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Behavioral Insights
          </CardTitle>
          <CardDescription>
            Machine learning analysis of your financial patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {behavioralInsights.map((insight, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{insight.name}</h4>
                  <span className="text-sm text-muted-foreground">{insight.accuracy}% accuracy</span>
                </div>
                <Progress value={insight.accuracy} className="h-2" />
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Protection Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Protection Settings</CardTitle>
          <CardDescription>
            Configure your fraud detection preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Real-time Monitoring</p>
                <p className="text-sm text-muted-foreground">Monitor all transactions</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch defaultChecked />
                <Badge variant="secondary" className="text-green-600">Active</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Location Tracking</p>
                <p className="text-sm text-muted-foreground">Detect unusual locations</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch defaultChecked />
                <Badge variant="secondary" className="text-green-600">Active</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Device Recognition</p>
                <p className="text-sm text-muted-foreground">Track known devices</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch defaultChecked />
                <Badge variant="secondary" className="text-green-600">Active</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customize Protection Level */}
      <Card className="bg-gradient-primary text-white">
        <CardHeader>
          <CardTitle className="text-white">Customize Protection Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">Enhanced Protection Active</span>
            </div>
            <p className="text-white/90 text-sm">
              Your AI fraud detection is running at maximum sensitivity. You'll be notified immediately of any suspicious activity.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FraudDetection;