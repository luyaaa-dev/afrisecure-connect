import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const UssdSimulator = () => {
  const [currentScreen, setCurrentScreen] = useState("main");
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (currentScreen === "main") {
      switch (userInput) {
        case "1":
          navigate("/menu-balance");
          break;
        case "2":
          navigate("/menu-loan");
          break;
        case "3":
          navigate("/menu-report");
          break;
        case "4":
          navigate("/menu-tips");
          break;
        default:
          setCurrentScreen("invalid");
      }
    }
    setUserInput("");
  };

  const getScreenContent = () => {
    switch (currentScreen) {
      case "main":
        return `CON Welcome to AfriSecure Finance

1. View Balance
2. Apply for Loan  
3. Report Fraud
4. Financial Tips

Reply with option number (1-4)`;

      case "invalid":
        return `END Invalid option. Please try again.

Available options: 1, 2, 3, 4

Session ended.`;

      default:
        return `CON Welcome to AfriSecure Finance

1. View Balance
2. Apply for Loan
3. Report Fraud  
4. Financial Tips

Reply with option number (1-4)`;
    }
  };

  const endSession = () => {
    setCurrentScreen("main");
    setUserInput("");
    navigate("/offline");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link to="/offline">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Offline Instructions
            </Button>
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Phone className="w-10 h-10 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                USSD Simulator
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Experience AfriSecure's USSD interface
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          {/* Phone Screen Simulator */}
          <Card className="bg-card shadow-design-lg border-2 border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-center text-lg">
                📱 Feature Phone Display
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {/* USSD Screen */}
              <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-line min-h-48 mb-4">
                {getScreenContent()}
              </div>

              {/* Input Section */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your response..."
                    className="font-mono"
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  />
                  <Button 
                    onClick={handleSubmit} 
                    variant="default" 
                    className="px-6"
                  >
                    Send
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    onClick={endSession}
                    variant="destructive" 
                    size="sm" 
                    className="flex-1"
                  >
                    End Session
                  </Button>
                  <Button 
                    onClick={() => {
                      setCurrentScreen("main");
                      setUserInput("");
                    }}
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="bg-gradient-to-r from-secondary/5 to-primary/5 border border-secondary/20">
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-2">How to use:</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Type a number (1-4) to select an option</li>
                <li>• Press "Send" or Enter to continue</li>
                <li>• Use "End Session" to return to main menu</li>
                <li>• This simulates the real USSD experience</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UssdSimulator;