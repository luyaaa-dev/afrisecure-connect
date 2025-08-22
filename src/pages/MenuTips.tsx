import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Shield, PiggyBank, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const MenuTips = () => {
  const [step, setStep] = useState("selection");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const tipTopics = [
    { 
      id: "1", 
      label: "How to avoid scams", 
      icon: Shield,
      tip: `Never share your OTP or PIN with anyone—even your bank.

🚫 Red flags to watch for:
• Urgent payment requests
• "Too good to be true" offers  
• Requests for personal info via SMS
• Calls claiming account problems

✅ Always verify through official channels.

Remember: AfriSecure will NEVER ask for your PIN via SMS or call.`
    },
    { 
      id: "2", 
      label: "Smart saving habits", 
      icon: PiggyBank,
      tip: `Save before you spend. Automate if possible.

💡 The 50/30/20 Rule:
• 50% - Needs (rent, food, transport)
• 30% - Wants (entertainment, clothes)  
• 20% - Savings & debt repayment

🎯 Start small: Even R20 per week = R1040 per year!

Use AfriSecure's savings challenges to stay motivated.`
    },
    { 
      id: "3", 
      label: "Boost your credit score", 
      icon: TrendingUp,
      tip: `Pay on time, even small amounts. It builds your score.

📈 Credit Building Tips:
• Make payments by due date
• Keep phone active & topped up
• Use AfriSecure regularly
• Refer trusted friends
• Complete your profile 100%

💪 Even R50 loans, repaid on time, improve your credit profile for bigger loans later.`
    }
  ];

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    setStep("viewing");
  };

  const getScreenContent = () => {
    if (step === "selection") {
      return `CON AfriSecure Finance - Financial Tips

Choose a topic to learn more:

1. How to avoid scams
2. Smart saving habits  
3. Boost your credit score

Reply with option number (1-3)`;
    }

    if (step === "viewing" && selectedTopic) {
      const topic = tipTopics.find(t => t.id === selectedTopic);
      return `END Financial Education - ${topic?.label}

${topic?.tip}

💡 More tips available in the AfriSecure app.

Thank you for using AfriSecure Finance.
Session ended.`;
    }

    return "Loading...";
  };

  const resetFlow = () => {
    setStep("selection");
    setSelectedTopic(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-success/5">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link to="/ussd-simulator">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to USSD Simulator
            </Button>
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-10 h-10 text-success" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Financial Tips
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              USSD Flow: Financial Education
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          {/* Phone Screen Simulator */}
          <Card className="bg-card shadow-design-lg border-2 border-success/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-center text-lg flex items-center justify-center gap-2">
                📱 <BookOpen className="w-5 h-5" /> Learning Center
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {/* USSD Screen */}
              <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-xs whitespace-pre-line min-h-48 mb-4 overflow-y-auto">
                {getScreenContent()}
              </div>

              {/* Topic Selection */}
              {step === "selection" && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium mb-3">Choose a learning topic:</h3>
                  {tipTopics.map((topic) => {
                    const IconComponent = topic.icon;
                    return (
                      <Button
                        key={topic.id}
                        onClick={() => handleTopicSelect(topic.id)}
                        variant="outline"
                        className="w-full justify-start h-14 text-left"
                      >
                        <IconComponent className="w-5 h-5 mr-3 text-success" />
                        <div>
                          <div className="font-medium">{topic.id}. {topic.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {topic.id === "1" && "Protect yourself from fraud"}
                            {topic.id === "2" && "Build wealth step by step"}
                            {topic.id === "3" && "Improve loan eligibility"}
                          </div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              )}

              {/* Tip Display */}
              {step === "viewing" && selectedTopic && (
                <div className="space-y-4">
                  {(() => {
                    const topic = tipTopics.find(t => t.id === selectedTopic);
                    const IconComponent = topic?.icon || BookOpen;
                    return (
                      <div className="bg-gradient-to-r from-success/10 to-secondary/10 border-2 border-success/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <IconComponent className="w-6 h-6 text-success" />
                          <h3 className="font-bold text-sm">{topic?.label}</h3>
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-pre-line leading-relaxed">
                          {topic?.tip}
                        </div>
                      </div>
                    );
                  })()}

                  <div className="bg-gradient-primary/5 border border-primary/20 rounded-lg p-3">
                    <div className="text-xs text-center text-muted-foreground">
                      📚 <span className="font-medium">Did you know?</span> Regular financial education can increase your income by up to 20% over 5 years.
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 mt-6">
                <Link to="/offline" className="flex-1">
                  <Button variant="destructive" size="sm" className="w-full">
                    End Session
                  </Button>
                </Link>
                <Button 
                  onClick={resetFlow}
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                >
                  {step === "viewing" ? "Back to Topics" : "Reset"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Education Info */}
          <Card className="bg-gradient-to-r from-success/5 to-secondary/5 border border-success/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-success mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm mb-1">Free Financial Education</h3>
                  <p className="text-xs text-muted-foreground">
                    Access these tips anytime via USSD. Knowledge is your best defense against financial fraud and poverty.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MenuTips;