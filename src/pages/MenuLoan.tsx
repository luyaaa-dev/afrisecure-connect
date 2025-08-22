import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const MenuLoan = () => {
  const [step, setStep] = useState("amount");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<"approved" | "rejected" | null>(null);

  const handleAmountSubmit = () => {
    if (amount && parseInt(amount) > 0) {
      setStep("processing");
      
      // Simulate processing delay
      setTimeout(() => {
        // Random approval/rejection for demo
        const isApproved = Math.random() > 0.3; // 70% approval rate
        setResult(isApproved ? "approved" : "rejected");
        setStep("result");
      }, 2000);
    }
  };

  const getScreenContent = () => {
    if (step === "amount") {
      return `CON AfriSecure Finance - Loan Application

Enter loan amount (ZAR):
Min: R50, Max: R5000

Amount: R${amount || '___'}`;
    }

    if (step === "processing") {
      return `CON Processing your loan application...

Amount: R${amount}
Please wait while we check your eligibility...

⏳ Analyzing credit profile...`;
    }

    if (step === "result" && result === "approved") {
      return `END Loan Application - APPROVED! 🎉

Loan Amount: R${amount}
Interest Rate: 12% per month
Repayment Period: 30 days

Funds sent to your wallet.
Thank you for using AfriSecure Finance.`;
    }

    if (step === "result" && result === "rejected") {
      return `END Loan Application - Not Approved

Amount Requested: R${amount}

Sorry, you don't qualify for a loan currently.
Build your credit by using AfriSecure more.

Tips to improve eligibility:
- Make regular deposits
- Complete your profile
- Refer friends

Thank you for using AfriSecure Finance.`;
    }

    return "Loading...";
  };

  const resetFlow = () => {
    setStep("amount");
    setAmount("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/5">
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
              <CreditCard className="w-10 h-10 text-accent" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Apply for Loan
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              USSD Flow: Quick Loan Application
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          {/* Phone Screen Simulator */}
          <Card className="bg-card shadow-design-lg border-2 border-accent/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-center text-lg flex items-center justify-center gap-2">
                📱 <CreditCard className="w-5 h-5" /> Loan Application
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {/* USSD Screen */}
              <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-line min-h-40 mb-4">
                {getScreenContent()}
              </div>

              {/* Amount Input Section */}
              {step === "amount" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Loan Amount (ZAR):</label>
                    <Input
                      type="number"
                      min="50"
                      max="5000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="e.g. 500"
                      className="font-mono text-lg"
                      onKeyPress={(e) => e.key === 'Enter' && handleAmountSubmit()}
                    />
                    <p className="text-xs text-muted-foreground">
                      Minimum: R50 • Maximum: R5,000
                    </p>
                  </div>

                  <Button 
                    onClick={handleAmountSubmit} 
                    variant="accent" 
                    className="w-full"
                    disabled={!amount || parseInt(amount) < 50 || parseInt(amount) > 5000}
                  >
                    Submit Application
                  </Button>
                </div>
              )}

              {/* Processing Display */}
              {step === "processing" && (
                <div className="space-y-4">
                  <div className="bg-gradient-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-sm font-medium">Processing Application...</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Analyzing your credit profile
                    </p>
                  </div>
                </div>
              )}

              {/* Result Display */}
              {step === "result" && (
                <div className="space-y-4">
                  {result === "approved" ? (
                    <div className="bg-gradient-to-r from-success/10 to-secondary/10 border-2 border-success/20 rounded-lg p-4 text-center">
                      <CheckCircle className="w-12 h-12 text-success mx-auto mb-2" />
                      <div className="text-xl font-bold text-success mb-1">Approved!</div>
                      <div className="text-lg font-semibold mb-2">R {amount}</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>Interest: 12% per month</div>
                        <div>Repayment: 30 days</div>
                        <div className="font-medium text-success">Funds sent to wallet</div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-destructive/10 to-warning/10 border-2 border-destructive/20 rounded-lg p-4 text-center">
                      <XCircle className="w-12 h-12 text-destructive mx-auto mb-2" />
                      <div className="text-xl font-bold text-destructive mb-1">Not Approved</div>
                      <div className="text-sm text-muted-foreground mb-3">
                        Don't worry! Build your credit with AfriSecure.
                      </div>
                      <div className="text-xs text-left space-y-1 bg-muted/50 rounded p-3">
                        <div className="font-medium">Tips to improve:</div>
                        <div>• Make regular deposits</div>
                        <div>• Complete your profile</div>
                        <div>• Refer friends</div>
                      </div>
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
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Loan Info */}
          <Card className="bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm mb-1">AI Credit Scoring</h3>
                  <p className="text-xs text-muted-foreground">
                    Our AI analyzes your mobile money history, airtime purchases, and transaction patterns to provide instant decisions.
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

export default MenuLoan;