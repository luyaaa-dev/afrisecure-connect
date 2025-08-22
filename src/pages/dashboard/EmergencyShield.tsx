import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Shield, Plus, Check, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const EmergencyShield = () => {
  const { toast } = useToast();
  const [isActivated, setIsActivated] = useState(false);
  const [protectionSettings, setProtectionSettings] = useState({
    biometricLogin: true,
    accountAccess: true,
    alertSystem: true,
  });

  const handleActivateShield = () => {
    setIsActivated(true);
    toast({
      title: "🔐 Emergency CyberShield Activated",
      description: "Accounts frozen, trusted contacts notified, biometrics disabled.",
      duration: 5000,
    });
  };

  const protectedAccounts = [
    { name: "Main Wallet", type: "Mobile Wallet", status: "Active" },
    { name: "Savings Account", type: "Bank Account", status: "Active" },
    { name: "Credit Card", type: "Credit Card", status: "Active" },
    { name: "Investment Account", type: "Investment", status: "Active" },
  ];

  const emergencyContacts = [
    { name: "Sarah Johnson", relationship: "Sister", phone: "+27 82 123 4567" },
    { name: "David Mbeki", relationship: "Friend", phone: "+27 83 987 6543" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Emergency CyberShield</h1>
        <p className="text-muted-foreground mt-2">
          Instantly protect your accounts and data during emergencies like phone theft, coercion, or suspicious activity.
        </p>
      </div>

      {/* One-Tap Protection */}
      <Card className="border-2 border-destructive/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Shield className="w-6 h-6" />
            One-Tap Protection
          </CardTitle>
          <CardDescription>
            Instantly secure your finances with a single tap
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant={isActivated ? "secondary" : "destructive"} 
            size="lg" 
            className="w-full" 
            onClick={handleActivateShield}
            disabled={isActivated}
          >
            {isActivated ? "🔒 EMERGENCY SHIELD ACTIVE" : "🚨 ACTIVATE EMERGENCY SHIELD"}
          </Button>
        </CardContent>
      </Card>

      {/* Protected Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Protected Accounts</CardTitle>
          <CardDescription>
            Accounts that will be locked during emergency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {protectedAccounts.map((account, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{account.name}</p>
                  <p className="text-sm text-muted-foreground">{account.type}</p>
                </div>
                <Badge variant="secondary" className="text-green-600">
                  <Check className="w-3 h-3 mr-1" />
                  {account.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contacts</CardTitle>
          <CardDescription>
            People who will be notified during emergencies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                </div>
                <p className="text-sm font-mono">{contact.phone}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Emergency Contact
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Security Features */}
      <Card>
        <CardHeader>
          <CardTitle>Active Security Features</CardTitle>
          <CardDescription>
            Current protective measures and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Biometric Login</p>
                <p className="text-sm text-muted-foreground">Fingerprint and face recognition</p>
              </div>
              <Switch 
                checked={protectionSettings.biometricLogin}
                onCheckedChange={(checked) => 
                  setProtectionSettings(prev => ({...prev, biometricLogin: checked}))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Account Access</p>
                <p className="text-sm text-muted-foreground">Normal access monitoring</p>
              </div>
              <Badge variant="secondary">Normal</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Alert System</p>
                <p className="text-sm text-muted-foreground">Emergency notification system</p>
              </div>
              <Badge variant="secondary" className="text-green-600">Ready</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyShield;