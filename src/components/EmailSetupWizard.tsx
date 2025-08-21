import { useState } from "react";
import { Mail, ArrowLeft, ArrowRight, Check, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { title: "Email Configuration", description: "Verify your email address" },
  { title: "Email Preview", description: "Preview the verification email" },
  { title: "Code Verification", description: "Enter the verification code" },
];

export default function EmailSetupWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("user@example.com");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const progressValue = ((currentStep + 1) / steps.length) * 100;

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

  const handleSendCode = () => {
    toast({
      title: "Verification Email Sent",
      description: `A 6-digit code has been sent to ${email}`,
    });
    handleNext();
  };

  const handleVerifyCode = () => {
    setIsVerifying(true);
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      toast({
        title: "Email 2FA Enabled!",
        description: "Your email two-factor authentication is now active.",
      });
      // Here you would typically redirect or close the wizard
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Email Configuration</h2>
              <p className="text-muted-foreground">
                We'll send verification codes to your email address when you sign in
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                />
              </div>
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-primary">
                  ℹ️ Make sure you have access to this email address. Verification codes will be sent here.
                </p>
              </div>
            </div>

            <Button onClick={handleSendCode} className="w-full">
              Send Verification Email
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Email Preview</h2>
              <p className="text-muted-foreground">
                Here's what your verification emails will look like
              </p>
            </div>

            <Card className="bg-muted/30">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Preview</Badge>
                  <Badge variant="outline">📧 {email}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-background p-4 rounded-lg border">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="font-medium">Security Alert</span>
                      <span className="text-sm text-muted-foreground">now</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Your verification code</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Someone is trying to sign in to your account. If this was you, use this code:
                      </p>
                    </div>
                    <div className="text-center py-4">
                      <div className="inline-block px-6 py-3 bg-primary/10 rounded-lg border border-primary/20">
                        <span className="text-2xl font-mono font-bold tracking-widest">123456</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This code expires in 10 minutes. If you didn't request this, please ignore this email.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePrevious} className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button onClick={handleNext} className="flex-1">
                Looks Good
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
              <h2 className="text-2xl font-semibold">Enter Verification Code</h2>
              <p className="text-muted-foreground">
                Check your email and enter the 6-digit code we sent to {email}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <Label htmlFor="verification-code">Verification Code</Label>
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

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Code expires in 8:45</span>
              </div>

              <div className="text-center">
                <Button variant="outline" size="sm">
                  Resend Code
                </Button>
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
                {isVerifying ? "Verifying..." : "Verify & Enable"}
                {!isVerifying && <Check className="ml-2 h-4 w-4" />}
              </Button>
            </div>
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
          <CardTitle className="text-3xl">Email 2FA Setup</CardTitle>
          <CardDescription>
            Set up email-based two-factor authentication in 3 simple steps
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