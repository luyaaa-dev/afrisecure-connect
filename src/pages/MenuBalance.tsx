import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, DollarSign, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const MenuBalance = () => {
  const [step, setStep] = useState("pin");
  const [pin, setPin] = useState("");
  const [showBalance, setShowBalance] = useState(false);

  const handlePinSubmit = () => {
    if (pin.length === 4) {
      setStep("balance");
      setShowBalance(true);
    }
  };

  const getScreenContent = () => {
    if (step === "pin") {
      return `CON AfriSecure Finance - View Balance

Enter your 4-digit PIN:
****`;
    }

    if (step === "balance") {
      return `END Balance Inquiry Complete

Current Balance: R 420.00
Available: R 420.00
Last Transaction: -R50.00 (Transfer)

Thank you for using AfriSecure Finance.
Session ended.`;
    }

    return "Loading...";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/5">
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
              <DollarSign className="w-10 h-10 text-secondary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                View Balance
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              USSD Flow: Balance Inquiry
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          {/* Phone Screen Simulator */}
          <Card className="bg-card shadow-design-lg border-2 border-secondary/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-center text-lg flex items-center justify-center gap-2">
                📱 <Lock className="w-5 h-5" /> Secure Balance Check
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {/* USSD Screen */}
              <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-line min-h-32 mb-4">
                {getScreenContent()}
              </div>

              {/* PIN Input Section */}
              {step === "pin" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Enter 4-digit PIN:</label>
                    <Input
                      type="password"
                      maxLength={4}
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="****"
                      className="font-mono text-center text-lg tracking-widest"
                      onKeyPress={(e) => e.key === 'Enter' && handlePinSubmit()}
                    />
                  </div>

                  <Button 
                    onClick={handlePinSubmit} 
                    variant="secondary" 
                    className="w-full"
                    disabled={pin.length !== 4}
                  >
                    Submit PIN
                  </Button>
                </div>
              )}

              {/* Balance Display */}
              {step === "balance" && (
                <div className="space-y-4">
                  <div className="bg-gradient-secondary/10 border-2 border-secondary/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-secondary mb-2">R 420.00</div>
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="text-lg font-semibold text-success">R 420.00</div>
                      <div className="text-xs text-muted-foreground">Available</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="text-lg font-semibold text-destructive">-R 50.00</div>
                      <div className="text-xs text-muted-foreground">Last Transaction</div>
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
                  onClick={() => {
                    setStep("pin");
                    setPin("");
                    setShowBalance(false);
                  }}
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm mb-1">Security Notice</h3>
                  <p className="text-xs text-muted-foreground">
                    Your PIN is encrypted and secure. Never share it with anyone, including AfriSecure staff.
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

export default MenuBalance;