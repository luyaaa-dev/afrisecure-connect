import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const MenuReport = () => {
  const [step, setStep] = useState("selection");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const reportOptions = [
    { id: "1", label: "Phone Theft", icon: "📱" },
    { id: "2", label: "Unauthorized Transaction", icon: "💳" },
    { id: "3", label: "Scam Message", icon: "📧" }
  ];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setStep("submitted");
  };

  const getScreenContent = () => {
    if (step === "selection") {
      return `CON AfriSecure Finance - Report Fraud

What do you want to report?

1. Phone Theft
2. Unauthorized Transaction  
3. Scam Message

Reply with option number (1-3)`;
    }

    if (step === "submitted") {
      const selectedReport = reportOptions.find(opt => opt.id === selectedOption);
      return `END Report Submitted Successfully! 🚨

Report Type: ${selectedReport?.label}
Reference: #ASF${Date.now().toString().slice(-6)}

Your report has been logged.
Account temporarily secured.
Support agent will contact you within 24h.

Thank you for using AfriSecure Finance.
Session ended.`;
    }

    return "Loading...";
  };

  const resetFlow = () => {
    setStep("selection");
    setSelectedOption(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-destructive/5">
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
              <Shield className="w-10 h-10 text-destructive" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Report Fraud
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              USSD Flow: Security Incident Reporting
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          {/* Phone Screen Simulator */}
          <Card className="bg-card shadow-design-lg border-2 border-destructive/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-center text-lg flex items-center justify-center gap-2">
                📱 <AlertTriangle className="w-5 h-5" /> Emergency Reporting
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {/* USSD Screen */}
              <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-line min-h-40 mb-4">
                {getScreenContent()}
              </div>

              {/* Option Selection */}
              {step === "selection" && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium mb-3">Select incident type:</h3>
                  {reportOptions.map((option) => (
                    <Button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      variant="outline"
                      className="w-full justify-start h-12 text-left"
                    >
                      <span className="text-lg mr-3">{option.icon}</span>
                      <div>
                        <div className="font-medium">{option.id}. {option.label}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              )}

              {/* Submission Confirmation */}
              {step === "submitted" && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-success/10 to-secondary/10 border-2 border-success/20 rounded-lg p-4 text-center">
                    <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
                    <div className="text-lg font-bold text-success mb-2">Report Submitted</div>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <div className="bg-muted/50 rounded p-2">
                        <div className="font-medium">Reference ID</div>
                        <div className="font-mono">#ASF{Date.now().toString().slice(-6)}</div>
                      </div>
                      <div className="text-xs space-y-1">
                        <div>✅ Account temporarily secured</div>
                        <div>✅ Support team notified</div>
                        <div>✅ 24h response guarantee</div>
                      </div>
                    </div>
                  </div>

                  {selectedOption && (
                    <div className="bg-gradient-primary/5 border border-primary/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{reportOptions.find(opt => opt.id === selectedOption)?.icon}</span>
                        <span className="font-medium text-sm">
                          {reportOptions.find(opt => opt.id === selectedOption)?.label} Reported
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Our security team has been alerted and will investigate immediately.
                      </p>
                    </div>
                  )}
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
                  Report Another
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Info */}
          <Card className="bg-gradient-to-r from-destructive/5 to-warning/5 border border-destructive/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-destructive mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm mb-1">Emergency Security</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Reports are processed immediately. In case of theft, your account is auto-locked for protection.
                  </p>
                  <p className="text-xs font-medium text-destructive">
                    For life-threatening emergencies, call local authorities first: 10111
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

export default MenuReport;