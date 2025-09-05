import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Plus, Check, AlertTriangle, Lock, Unlock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const EmergencyShield = () => {
  const { toast } = useToast();
  const [isActivated, setIsActivated] = useState(false);
  const [systemLocked, setSystemLocked] = useState(false);
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [newContactRelationship, setNewContactRelationship] = useState("");
  const [protectionSettings, setProtectionSettings] = useState({
    biometricLogin: true,
    accountAccess: true,
    alertSystem: true,
  });
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: "Sarah Johnson", relationship: "Sister", phone: "+27 82 123 4567" },
    { name: "David Mbeki", relationship: "Friend", phone: "+27 83 987 6543" },
  ]);

  const handleActivateShield = () => {
    setIsActivated(true);
    setSystemLocked(true);
    // Disable all system functions
    setProtectionSettings({
      biometricLogin: false,
      accountAccess: false,
      alertSystem: true,
    });
    toast({
      title: "🔐 Emergency CyberShield Activated",
      description: "System locked down! All accounts frozen, contacts notified, biometrics disabled.",
      duration: 8000,
    });
  };

  const handleMarkAsSafe = () => {
    setIsActivated(false);
    setSystemLocked(false);
    setProtectionSettings({
      biometricLogin: true,
      accountAccess: true,
      alertSystem: true,
    });
    toast({
      title: "✅ System Restored",
      description: "Emergency shield deactivated. All systems back to normal.",
      duration: 5000,
    });
  };

  const handleAddContact = () => {
    if (newContactName && newContactPhone && newContactRelationship) {
      const newContact = {
        name: newContactName,
        relationship: newContactRelationship,
        phone: newContactPhone,
      };
      setEmergencyContacts([...emergencyContacts, newContact]);
      setNewContactName("");
      setNewContactPhone("");
      setNewContactRelationship("");
      toast({
        title: "Contact Added",
        description: `${newContactName} has been added to your emergency contacts.`,
      });
    }
  };

  const protectedAccounts = [
    { name: "Main Wallet", type: "Mobile Wallet", status: "Active" },
    { name: "Savings Account", type: "Bank Account", status: "Active" },
    { name: "Credit Card", type: "Credit Card", status: "Active" },
    { name: "Investment Account", type: "Investment", status: "Active" },
  ];


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Emergency CyberShield</h1>
        <p className="text-muted-foreground mt-2">
          Instantly protect your accounts and data during emergencies like phone theft, coercion, or suspicious activity.
        </p>
        {systemLocked && (
          <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center gap-2 text-destructive">
              <Lock className="w-5 h-5" />
              <span className="font-semibold">SYSTEM LOCKED DOWN</span>
            </div>
            <p className="text-sm text-destructive/80 mt-1">All financial functions are disabled for your protection.</p>
          </div>
        )}
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
          <div className="space-y-3">
            <Button 
              variant={isActivated ? "secondary" : "destructive"} 
              size="lg" 
              className="w-full" 
              onClick={handleActivateShield}
              disabled={isActivated}
            >
              {isActivated ? "🔒 EMERGENCY SHIELD ACTIVE" : "🚨 ACTIVATE EMERGENCY SHIELD"}
            </Button>
            {isActivated && (
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full border-green-200 text-green-700 hover:bg-green-50" 
                onClick={handleMarkAsSafe}
              >
                <Unlock className="w-4 h-4 mr-2" />
                MARK AS SAFE & RESTORE SYSTEM
              </Button>
            )}
          </div>
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Emergency Contact
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Emergency Contact</DialogTitle>
                    <DialogDescription>Add a trusted person who will be notified during emergencies.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Full Name</Label>
                      <Input
                        id="contactName"
                        placeholder="Enter full name"
                        value={newContactName}
                        onChange={(e) => setNewContactName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Phone Number</Label>
                      <Input
                        id="contactPhone"
                        placeholder="+27 82 123 4567"
                        value={newContactPhone}
                        onChange={(e) => setNewContactPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="relationship">Relationship</Label>
                      <Select value={newContactRelationship} onValueChange={setNewContactRelationship}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Family">Family</SelectItem>
                          <SelectItem value="Friend">Friend</SelectItem>
                          <SelectItem value="Colleague">Colleague</SelectItem>
                          <SelectItem value="Partner">Partner</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddContact} className="w-full">Add Contact</Button>
                  </div>
                </DialogContent>
              </Dialog>
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