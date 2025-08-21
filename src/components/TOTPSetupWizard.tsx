import { useState } from "react";
import { Smartphone, QrCode, ArrowLeft, ArrowRight, Check, Download, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { title: "Install App", description: "Download an authenticator app" },
  { title: "Scan QR Code", description: "Add your account to the app" },
  { title: "Verify Setup", description: "Test the connection" },
  { title: "Save Backup", description: "Download recovery codes" },
];

const authenticatorApps = [
  { name: "Google Authenticator", icon: "🔐", ios: "#", android: "#" },
  { name: "Authy", icon: "🛡️", ios: "#", android: "#" },
  { name: "Microsoft Authenticator", icon: "🔑", ios: "#", android: "#" },
];

export default function TOTPSetupWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const { toast } = useToast();

  const progressValue = ((currentStep + 1) / steps.length) * 100;
  const secretKey = "JBSWY3DPEHPK3PXP";

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleVerifyCode = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      toast({
        title: "TOTP Verified!",
        description: "Your authenticator app is working correctly.",
      });
      handleNext();
    }, 2000);
  };

  const downloadRecoveryCodes = () => {
    toast({
      title: "Recovery Codes Downloaded",
      description: "Save these codes in a secure location.",
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Smartphone className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Install Authenticator App</h2>
              <p className="text-muted-foreground">
                Choose and install an authenticator app on your mobile device
              </p>
            </div>

            <div className="space-y-4">
              {authenticatorApps.map((app, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{app.icon}</span>
                      <div>
                        <h3 className="font-medium">{app.name}</h3>
                        <p className="text-sm text-muted-foreground">Free & Secure</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={app.ios} target="_blank" rel="noopener noreferrer">
                          iOS
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={app.android} target="_blank" rel="noopener noreferrer">
                          Android
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-primary">
                💡 We recommend Google Authenticator or Authy for the best experience
              </p>
            </div>

            <Button onClick={handleNext} className="w-full">
              I've Installed an App
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <QrCode className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Scan QR Code</h2>
              <p className="text-muted-foreground">
                Open your authenticator app and scan this QR code
              </p>
            </div>

            <div className="flex justify-center">
              <div className="p-6 bg-background border-2 border-dashed border-border rounded-lg">
                <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <QrCode className="h-16 w-16 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">QR Code</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-muted/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Manual Entry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Can't scan? Enter this key manually:
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-2 bg-background rounded border text-sm font-mono">
                    {secretKey}
                  </code>
                  <Button variant="outline" size="sm">
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Collapsible open={showTroubleshooting} onOpenChange={setShowTroubleshooting}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Troubleshooting
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-2">
                <Card className="p-4 bg-warning/5 border-warning/20">
                  <h4 className="font-medium text-sm mb-2">Common Issues:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Make sure your phone's camera can focus on the QR code</li>
                    <li>• Try adjusting the brightness of your screen</li>
                    <li>• Use manual entry if scanning doesn't work</li>
                    <li>• Ensure your authenticator app is updated</li>
                  </ul>
                </Card>
              </CollapsibleContent>
            </Collapsible>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePrevious} className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button onClick={handleNext} className="flex-1">
                I've Scanned It
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-success" />
              </div>
              <h2 className="text-2xl font-semibold">Verify Setup</h2>
              <p className="text-muted-foreground">
                Enter the 6-digit code from your authenticator app to verify setup
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <InputOTP
                    maxLength={6}
                    value={verificationCode}
                    onChange={setVerificationCode}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                <p className="text-sm text-success">
                  🔄 The code refreshes every 30 seconds in your authenticator app
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePrevious} className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button 
                onClick={handleVerifyCode} 
                className="flex-1"
                disabled={verificationCode.length !== 6 || isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify Code"}
                {!isVerifying && <Check className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                <Download className="h-8 w-8 text-success" />
              </div>
              <h2 className="text-2xl font-semibold">Save Recovery Codes</h2>
              <p className="text-muted-foreground">
                Download these backup codes and store them safely
              </p>
            </div>

            <Card className="bg-warning/5 border-warning/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">Important</Badge>
                  <CardTitle className="text-lg">Recovery Codes</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  These codes can be used to access your account if you lose your authenticator device. 
                  Each code can only be used once.
                </p>
                
                <div className="grid grid-cols-2 gap-2 p-4 bg-background rounded border">
                  {["1234-5678", "2345-6789", "3456-7890", "4567-8901", "5678-9012", "6789-0123", "7890-1234", "8901-2345"].map((code, index) => (
                    <div key={index} className="font-mono text-sm p-2 bg-muted/50 rounded text-center">
                      {code}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button onClick={downloadRecoveryCodes} className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download Codes
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Print Codes
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
              <p className="text-sm text-destructive">
                ⚠️ Store these codes in a safe place. If you lose access to your authenticator app and these codes, you may be permanently locked out of your account.
              </p>
            </div>

            <Button onClick={() => toast({ title: "TOTP Setup Complete!", description: "Two-factor authentication is now enabled." })} className="w-full">
              Complete Setup
              <Check className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card className="shadow-elevation">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl">TOTP Authenticator Setup</CardTitle>
          <CardDescription>
            Set up time-based one-time password authentication in 4 steps
          </CardDescription>
          
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progressValue)}% complete</span>
            </div>
            <Progress value={progressValue} className="h-2" />
            <div className="flex justify-between mt-2">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`text-xs ${index <= currentStep ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                >
                  {step.title}
                </div>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>
    </div>
  );
}