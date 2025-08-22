import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Fingerprint, Mic, Phone, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-security.jpg";

const Index = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="relative container mx-auto px-6 py-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="w-12 h-12 text-accent" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              AfriSecure Finance
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium">
            Secure. Empower. Transform.
          </p>
          
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-12">
            Next-generation financial safety and inclusion platform powered by AI, 
            protected by cybersecurity, and designed for every African.
          </p>
        </div>
      </div>

      {/* Main Login Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-md mx-auto">
          <Card className="bg-gradient-card shadow-design-lg border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-foreground">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Access your secure financial hub
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Login Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone or Email</Label>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="Enter your phone or email"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-3 pt-2">
                  <Button variant="hero" size="lg" className="w-full h-12">
                    Login
                  </Button>
                  <Button variant="outline" size="lg" className="w-full h-12">
                    Sign Up
                  </Button>
                </div>
              </div>

              {/* Separator */}
              <div className="flex items-center gap-4 py-2">
                <Separator className="flex-1" />
                <span className="text-sm text-muted-foreground font-medium">OR</span>
                <Separator className="flex-1" />
              </div>

              {/* Biometric Options */}
              <div className="space-y-3">
                <Button variant="security" size="lg" className="w-full h-12">
                  <Fingerprint className="w-5 h-5" />
                  Login with Face
                </Button>
                <Button variant="security" size="lg" className="w-full h-12">
                  <Mic className="w-5 h-5" />
                  Login with Voice
                </Button>
              </div>

              {/* Offline Access */}
              <div className="pt-6">
                <Link to="/offline">
                  <Button variant="accent" size="lg" className="w-full h-12">
                    <Phone className="w-5 h-5" />
                    📞 Offline Access (No smartphone?)
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Security Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Bank-Level Security</h3>
            </div>
            <div className="text-center p-4">
              <Eye className="w-8 h-8 text-secondary mx-auto mb-2" />
              <h3 className="font-semibold text-sm">AI Fraud Detection</h3>
            </div>
            <div className="text-center p-4">
              <Phone className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Offline Access</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;