import { useState } from "react";
import { Shield, Smartphone, Mail, Key, Download, RotateCcw, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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

interface Device {
  id: string;
  name: string;
  lastUsed: string;
  trusted: boolean;
  current?: boolean;
}

export default function TwoFactorDashboard() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [totpEnabled, setTotpEnabled] = useState(false);
  const [trustedDevices, setTrustedDevices] = useState<Device[]>([
    {
      id: "1",
      name: "Chrome on MacBook Pro",
      lastUsed: "2 hours ago",
      trusted: true,
      current: true,
    },
    {
      id: "2", 
      name: "Safari on iPhone 15",
      lastUsed: "1 day ago",
      trusted: true,
    },
  ]);
  const { toast } = useToast();

  const handleToggle2FA = (method: string, enabled: boolean) => {
    if (method === "email") {
      setEmailEnabled(enabled);
    } else if (method === "totp") {
      setTotpEnabled(enabled);
    }
    
    toast({
      title: enabled ? "2FA Enabled" : "2FA Disabled",
      description: `${method.toUpperCase()} two-factor authentication has been ${enabled ? "enabled" : "disabled"}.`,
    });
  };

  const removeDevice = (deviceId: string) => {
    setTrustedDevices(devices => devices.filter(d => d.id !== deviceId));
    toast({
      title: "Device Removed",
      description: "The device has been removed from your trusted devices.",
    });
  };

  const downloadRecoveryCodes = () => {
    toast({
      title: "Recovery Codes Downloaded",
      description: "Your backup codes have been downloaded securely.",
    });
  };

  const regenerateRecoveryCodes = () => {
    toast({
      title: "Recovery Codes Regenerated", 
      description: "New backup codes have been generated. Previous codes are now invalid.",
    });
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Two-Factor Authentication</h1>
          <p className="text-muted-foreground">
            Protect your account with an additional layer of security
          </p>
        </div>
      </div>

      {/* 2FA Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email 2FA */}
        <Card className="shadow-card hover:shadow-elevation transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Email Authentication</CardTitle>
                <CardDescription>Receive codes via email</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={emailEnabled ? "default" : "secondary"}>
                {emailEnabled ? "Enabled" : "Disabled"}
              </Badge>
              <Switch 
                checked={emailEnabled} 
                onCheckedChange={(checked) => handleToggle2FA("email", checked)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get verification codes sent to your registered email address
            </p>
            {emailEnabled ? (
              <div className="space-y-2">
                <p className="text-sm font-medium">📧 Configured for: user@example.com</p>
                <Button variant="outline" size="sm">
                  Change Email
                </Button>
              </div>
            ) : (
              <Button variant="default" className="w-full">
                Set Up Email 2FA
              </Button>
            )}
          </CardContent>
        </Card>

        {/* TOTP 2FA */}
        <Card className="shadow-card hover:shadow-elevation transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Authenticator App</CardTitle>
                <CardDescription>Use TOTP codes from your phone</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={totpEnabled ? "default" : "secondary"}>
                {totpEnabled ? "Enabled" : "Disabled"}
              </Badge>
              <Switch 
                checked={totpEnabled} 
                onCheckedChange={(checked) => handleToggle2FA("totp", checked)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Generate time-based codes with apps like Google Authenticator
            </p>
            {totpEnabled ? (
              <div className="space-y-2">
                <p className="text-sm font-medium">📱 Configured with authenticator app</p>
                <Button variant="outline" size="sm">
                  Reconfigure
                </Button>
              </div>
            ) : (
              <Button variant="default" className="w-full">
                Set Up Authenticator
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recovery Codes */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Key className="h-5 w-5 text-warning" />
            </div>
            <div>
              <CardTitle>Recovery Codes</CardTitle>
              <CardDescription>
                Backup codes to access your account if you lose your 2FA device
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-warning/5 rounded-lg border border-warning/20">
            <div>
              <p className="font-medium text-warning">8 unused codes remaining</p>
              <p className="text-sm text-muted-foreground">
                Store these codes in a safe place - you'll need them if you lose access to your 2FA device
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={downloadRecoveryCodes}>
              <Download className="h-4 w-4 mr-2" />
              Download Codes
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Regenerate Recovery Codes?</DialogTitle>
                  <DialogDescription>
                    This will invalidate all existing recovery codes and generate new ones. 
                    Make sure to save the new codes in a secure location.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={regenerateRecoveryCodes}>
                    Regenerate Codes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Trusted Devices */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Trusted Devices</CardTitle>
          <CardDescription>
            Devices where you've chosen to skip 2FA verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trustedDevices.map((device, index) => (
              <div key={device.id}>
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {device.name}
                        {device.current && (
                          <Badge variant="secondary" className="ml-2">Current</Badge>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Last used: {device.lastUsed}
                      </p>
                    </div>
                  </div>
                  {!device.current && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeDevice(device.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </div>
                {index < trustedDevices.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
            {trustedDevices.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No trusted devices configured
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}