import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Vault, 
  Upload, 
  FileText, 
  Image, 
  CreditCard, 
  Lock, 
  Eye, 
  Download, 
  Trash2, 
  Plus,
  Shield,
  Key,
  AlertTriangle
} from "lucide-react";

interface SecureFile {
  id: string;
  name: string;
  type: "document" | "image" | "card" | "other";
  size: string;
  uploadDate: string;
  isEncrypted: boolean;
  category: string;
}

const SafeVault = () => {
  const { toast } = useToast();
  
  const [files, setFiles] = useState<SecureFile[]>([
    {
      id: "1",
      name: "ID_Document.pdf",
      type: "document",
      size: "2.1 MB",
      uploadDate: "2024-01-15",
      isEncrypted: true,
      category: "Identity"
    },
    {
      id: "2", 
      name: "Bank_Statement_Dec.pdf",
      type: "document",
      size: "1.5 MB",
      uploadDate: "2024-01-10",
      isEncrypted: true,
      category: "Financial"
    },
    {
      id: "3",
      name: "Credit_Card_Front.jpg",
      type: "card",
      size: "850 KB",
      uploadDate: "2024-01-08",
      isEncrypted: true,
      category: "Cards"
    }
  ]);

  const [newFileName, setNewFileName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [masterPin, setMasterPin] = useState("");
  const [showPinDialog, setShowPinDialog] = useState(false);

  const handleFileUpload = () => {
    if (!newFileName) {
      toast({
        title: "Missing Information",
        description: "Please enter a file name.",
        variant: "destructive",
      });
      return;
    }

    const newFile: SecureFile = {
      id: Date.now().toString(),
      name: newFileName,
      type: "document",
      size: "1.2 MB",
      uploadDate: new Date().toISOString().split('T')[0],
      isEncrypted: true,
      category: selectedCategory
    };

    setFiles([...files, newFile]);
    setNewFileName("");
    
    toast({
      title: "File Uploaded Successfully",
      description: `${newFileName} has been encrypted and stored securely.`,
    });
  };

  const handleDeleteFile = (fileId: string) => {
    setFiles(files.filter(file => file.id !== fileId));
    toast({
      title: "File Deleted",
      description: "The file has been permanently removed from your vault.",
    });
  };

  const handleViewFile = (fileName: string) => {
    toast({
      title: "File Access",
      description: `Opening ${fileName} in secure viewer...`,
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="w-5 h-5" />;
      case "image":
        return <Image className="w-5 h-5" />;
      case "card":
        return <CreditCard className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "document":
        return "text-blue-600";
      case "image":
        return "text-green-600";
      case "card":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  const categories = ["Identity", "Financial", "Cards", "Medical", "Legal", "Insurance", "General"];
  const totalFiles = files.length;
  const totalSize = files.reduce((sum, file) => sum + parseFloat(file.size), 0).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            SafeVault
          </h1>
          <p className="text-muted-foreground">
            Military-grade encrypted storage for your most important documents
          </p>
        </div>
        <Badge variant="secondary" className="px-4 py-2">
          <Vault className="w-4 h-4 mr-2" />
          {totalFiles} Files Secured
        </Badge>
      </div>

      {/* Security Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Security Level</p>
                <p className="text-2xl font-bold">Military</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Lock className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Encrypted Files</p>
                <p className="text-2xl font-bold">{files.filter(f => f.isEncrypted).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Key className="w-8 h-8 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold">{totalSize} MB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-8 h-8 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Backup Status</p>
                <p className="text-2xl font-bold">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="files" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="files">My Files</TabsTrigger>
          <TabsTrigger value="upload">Upload Files</TabsTrigger>
          <TabsTrigger value="security">Security Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file) => (
              <Card key={file.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={getTypeColor(file.type)}>
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{file.size}</p>
                      </div>
                    </div>
                    {file.isEncrypted && (
                      <Lock className="w-4 h-4 text-success" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Category:</span>
                      <Badge variant="outline" className="text-xs">
                        {file.category}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Uploaded:</span>
                      <span className="text-muted-foreground">{file.uploadDate}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleViewFile(file.name)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewFile(file.name)}
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteFile(file.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {files.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Vault className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Your SafeVault is Empty</h3>
                <p className="text-muted-foreground mb-4">
                  Start securing your important documents by uploading them to your encrypted vault
                </p>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload First Document
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Document</CardTitle>
                <CardDescription>Securely store your important files with military-grade encryption</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file-name">Document Name</Label>
                  <Input
                    id="file-name"
                    placeholder="e.g., Passport_Copy.pdf"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-semibold mb-2">Drop files here or click to browse</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Supports: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
                  </p>
                  <Button variant="outline">
                    Choose Files
                  </Button>
                </div>

                <div className="bg-muted/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-4 h-4 text-success" />
                    <span className="font-semibold">Security Features</span>
                  </div>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• AES-256 encryption before upload</li>
                    <li>• Zero-knowledge architecture</li>
                    <li>• Secure biometric access</li>
                    <li>• Automatic backup & sync</li>
                  </ul>
                </div>

                <Button onClick={handleFileUpload} className="w-full" size="lg">
                  <Lock className="w-4 h-4 mr-2" />
                  Encrypt & Store Securely
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Upload Categories</CardTitle>
                <CardDescription>Common document types for easy organization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Identity Documents", icon: "🆔", count: files.filter(f => f.category === "Identity").length },
                    { name: "Bank Statements", icon: "🏦", count: files.filter(f => f.category === "Financial").length },
                    { name: "Credit Cards", icon: "💳", count: files.filter(f => f.category === "Cards").length },
                    { name: "Medical Records", icon: "🏥", count: files.filter(f => f.category === "Medical").length },
                    { name: "Legal Documents", icon: "⚖️", count: files.filter(f => f.category === "Legal").length },
                    { name: "Insurance Papers", icon: "🛡️", count: files.filter(f => f.category === "Insurance").length }
                  ].map((category) => (
                    <Button
                      key={category.name}
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center space-y-1"
                      onClick={() => setSelectedCategory(category.name.split(' ')[0])}
                    >
                      <span className="text-2xl">{category.icon}</span>
                      <span className="text-xs text-center">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Master PIN Settings</CardTitle>
                <CardDescription>Manage your vault access credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Master PIN</Label>
                  <Input
                    type="password"
                    placeholder="Enter current PIN"
                    value={masterPin}
                    onChange={(e) => setMasterPin(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>New Master PIN</Label>
                  <Input type="password" placeholder="Enter new PIN" />
                </div>
                
                <div className="space-y-2">
                  <Label>Confirm New PIN</Label>
                  <Input type="password" placeholder="Confirm new PIN" />
                </div>

                <Button className="w-full">
                  Update Master PIN
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Options</CardTitle>
                <CardDescription>Advanced security configurations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Biometric Authentication</p>
                    <p className="text-sm text-muted-foreground">Use fingerprint to access vault</p>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Auto-Lock Timer</p>
                    <p className="text-sm text-muted-foreground">Lock vault after inactivity</p>
                  </div>
                  <Badge variant="outline">5 minutes</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Failed Attempt Lockout</p>
                    <p className="text-sm text-muted-foreground">Lock after 3 failed attempts</p>
                  </div>
                  <Badge variant="secondary">Enabled</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Cloud Backup</p>
                    <p className="text-sm text-muted-foreground">Encrypted backup to cloud</p>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>

                <Button variant="outline" className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  Run Security Audit
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SafeVault;