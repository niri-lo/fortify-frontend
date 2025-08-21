import { useState } from "react";
import { Key, ArrowLeft, RefreshCw, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const recoveryCodesList = [
  { code: "1234-5678", used: false },
  { code: "2345-6789", used: true },
  { code: "3456-7890", used: false },
  { code: "4567-8901", used: false },
  { code: "5678-9012", used: true },
  { code: "6789-0123", used: false },
  { code: "7890-1234", used: false },
  { code: "8901-2345", used: false },
];

export default function RecoveryCodesView() {
  const [enteredCode, setEnteredCode] = useState("");
  const [showCodes, setShowCodes] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const availableCodes = recoveryCodesList.filter(item => !item.used);
  const usedCodesCount = recoveryCodesList.filter(item => item.used).length;

  const handleVerifyCode = () => {
    setIsVerifying(true);
    
    setTimeout(() => {
      setIsVerifying(false);
      const isValidCode = recoveryCodesList.some(item => 
        item.code === enteredCode && !item.used
      );
      
      if (isValidCode) {
        toast({
          title: "Recovery Code Accepted",
          description: "You have been successfully authenticated using your recovery code.",
        });
        setEnteredCode("");
      } else {
        toast({
          title: "Invalid Recovery Code",
          description: "The code you entered is invalid or has already been used.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const handleRegenerateAll = () => {
    toast({
      title: "Recovery Codes Regenerated",
      description: "All recovery codes have been regenerated. Previous codes are no longer valid.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warning/5 via-background to-warning/10 p-4">
      <div className="container mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <Key className="h-8 w-8 text-warning" />
            <div>
              <h1 className="text-3xl font-bold">Recovery Codes</h1>
              <p className="text-muted-foreground">
                Use backup codes to access your account when 2FA is unavailable
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Entry */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-warning" />
                Enter Recovery Code
              </CardTitle>
              <CardDescription>
                Enter one of your backup recovery codes to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="recovery-code">Recovery Code</Label>
                <Input
                  id="recovery-code"
                  placeholder="1234-5678"
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value)}
                  className="font-mono text-center text-lg"
                  maxLength={9}
                />
                <p className="text-xs text-muted-foreground">
                  Format: XXXX-XXXX (8 digits with hyphen)
                </p>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleVerifyCode}
                  className="w-full"
                  disabled={enteredCode.length !== 9 || isVerifying}
                >
                  {isVerifying ? "Verifying..." : "Verify Code"}
                </Button>
                
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to 2FA Options
                </Button>
              </div>

              <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium text-warning">Important Reminder</p>
                    <p className="text-sm text-muted-foreground">
                      Each recovery code can only be used once. After using a code, it will be permanently invalidated.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Management */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Your Recovery Codes</span>
                <div className="flex items-center gap-2">
                  <Badge variant={availableCodes.length > 3 ? "default" : "destructive"}>
                    {availableCodes.length} remaining
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowCodes(!showCodes)}
                  >
                    {showCodes ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                Manage your backup recovery codes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Code Status Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-success/5 rounded-lg border border-success/20">
                  <div className="text-2xl font-bold text-success">{availableCodes.length}</div>
                  <div className="text-sm text-muted-foreground">Available</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg border">
                  <div className="text-2xl font-bold text-muted-foreground">{usedCodesCount}</div>
                  <div className="text-sm text-muted-foreground">Used</div>
                </div>
              </div>

              <Separator />

              {/* Codes List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Recovery Codes</h4>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowCodes(!showCodes)}
                  >
                    {showCodes ? "Hide" : "Show"} Codes
                  </Button>
                </div>

                {showCodes ? (
                  <div className="grid grid-cols-1 gap-2">
                    {recoveryCodesList.map((item, index) => (
                      <div 
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          item.used 
                            ? 'bg-muted/30 border-muted opacity-60' 
                            : 'bg-background border-border'
                        }`}
                      >
                        <code className={`font-mono ${item.used ? 'line-through' : ''}`}>
                          {item.code}
                        </code>
                        <Badge 
                          variant={item.used ? "secondary" : "default"}
                          className="text-xs"
                        >
                          {item.used ? "Used" : "Available"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Click "Show Codes" to view your recovery codes</p>
                  </div>
                )}
              </div>

              <Separator />

              {/* Actions */}
              <div className="space-y-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Regenerate All Codes
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Regenerate Recovery Codes?</DialogTitle>
                      <DialogDescription className="space-y-2">
                        <p>This action will:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Generate 8 new recovery codes</li>
                          <li>Invalidate all existing codes (used and unused)</li>
                          <li>Require you to download and store the new codes</li>
                        </ul>
                        <p className="font-medium text-destructive">
                          This action cannot be undone.
                        </p>
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline">Cancel</Button>
                      <Button variant="destructive" onClick={handleRegenerateAll}>
                        Regenerate Codes
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {availableCodes.length <= 2 && (
                  <div className="p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                    <p className="text-sm text-destructive font-medium">
                      ⚠️ Low on recovery codes! Consider regenerating new codes soon.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Log */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Usage</CardTitle>
            <CardDescription>
              Track when and how your recovery codes were used
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { code: "2345-****", time: "2 hours ago", location: "Chrome on MacBook Pro", status: "Used" },
                { code: "5678-****", time: "3 days ago", location: "Safari on iPhone", status: "Used" },
              ].map((log, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <code className="font-mono text-sm bg-background px-2 py-1 rounded">
                      {log.code}
                    </code>
                    <div>
                      <p className="font-medium">{log.location}</p>
                      <p className="text-sm text-muted-foreground">{log.time}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{log.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}