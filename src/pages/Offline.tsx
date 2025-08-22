import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, ArrowLeft, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const Offline = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/5">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Button>
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Phone className="w-10 h-10 text-secondary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Access AfriSecure Without Internet
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use AfriSecure Finance on any basic mobile phone, even without internet connection
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          {/* Instructions Card */}
          <Card className="bg-gradient-card shadow-design-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                USSD Instructions
              </CardTitle>
              <CardDescription>
                Works on feature phones and smartphones without internet
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  If you're using a basic mobile phone or have no internet, you can still use AfriSecure via USSD.
                </p>
              </div>

              {/* USSD Dial Info */}
              <div className="bg-gradient-secondary/10 border-2 border-secondary/20 rounded-lg p-6 text-center">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">DIAL THIS NUMBER:</h3>
                <div className="text-4xl font-bold text-secondary mb-2">*120*888#</div>
                <p className="text-xs text-muted-foreground">Standard network rates apply</p>
              </div>

              {/* Available Actions */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground mb-3">What You Can Do:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm font-medium">View balance</span>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm font-medium">Apply for a loan</span>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      <span className="text-sm font-medium">Report fraud</span>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm font-medium">Learn financial tips</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulator Button */}
              <div className="pt-4">
                <Link to="/ussd-simulator">
                  <Button variant="hero" size="lg" className="w-full h-12">
                    <Phone className="w-5 h-5" />
                    Start USSD Simulator
                  </Button>
                </Link>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Try it out in our simulator before using your phone
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Available 24/7</h3>
                  <p className="text-xs text-muted-foreground">
                    Access AfriSecure services anytime, anywhere, even without electricity or internet connection.
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

export default Offline;