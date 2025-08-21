import { useState, useEffect } from "react";
import { Shield, Mail, Smartphone, ArrowLeft, Key, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

type VerificationMethod = "email" | "totp" | "recovery";

export default function TwoFactorLogin() {
  const [method, setMethod] = useState<VerificationMethod>("email");
  const [verificationCode, setVerificationCode] = useState("");
  const [rememberDevice, setRememberDevice] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes for email
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  // Timer countdown
  useEffect(() => {
    if (method === "email" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [method, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleVerify = () => {
    setIsVerifying(true);
    
    setTimeout(() => {
      setIsVerifying(false);
      toast({
        title: "Login Successful!",
        description: "You have been successfully authenticated.",
      });
      
      // Auto-submit when code is complete
      if (verificationCode.length === 6) {
        setVerificationCode("");
      }
    }, 2000);
  };

  const handleResendCode = () => {
    setTimeLeft(300);
    toast({
      title: "Code Sent",
      description: "A new verification code has been sent to your email.",
    });
  };

  const renderMethodContent = () => {
    switch (method) {
      case "email":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Check Your Email</h2>
              <p className="text-muted-foreground">
                We've sent a 6-digit verification code to
              </p>
              <Badge variant="outline" className="text-sm">
                📧 user@example.com
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <InputOTP
                  maxLength={6}
                  value={verificationCode}
                  onChange={(value) => {
                    setVerificationCode(value);
                    // Auto-submit when complete
                    if (value.length === 6) {
                      setTimeout(() => handleVerify(), 500);
                    }
                  }}
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

              <div className="flex items-center justify-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className={timeLeft < 60 ? "text-destructive font-medium" : "text-muted-foreground"}>
                  Code expires in {formatTime(timeLeft)}
                </span>
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Didn't receive the code?</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleResendCode}
                  disabled={timeLeft > 240} // Can resend after 1 minute
                >
                  Resend Code
                </Button>
              </div>
            </div>
          </div>
        );

      case "totp":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Smartphone className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Authenticator Code</h2>
              <p className="text-muted-foreground">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <InputOTP
                  maxLength={6}
                  value={verificationCode}
                  onChange={(value) => {
                    setVerificationCode(value);
                    if (value.length === 6) {
                      setTimeout(() => handleVerify(), 500);
                    }
                  }}
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

              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-primary text-center">
                  🔄 The code refreshes every 30 seconds in your app
                </p>
              </div>
            </div>
          </div>
        );

      case "recovery":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center">
                <Key className="h-8 w-8 text-warning" />
              </div>
              <h2 className="text-2xl font-semibold">Recovery Code</h2>
              <p className="text-muted-foreground">
                Enter one of your backup recovery codes
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <InputOTP
                  maxLength={9}
                  value={verificationCode}
                  onChange={(value) => {
                    setVerificationCode(value);
                    if (value.length === 9) {
                      setTimeout(() => handleVerify(), 500);
                    }
                  }}
                  pattern="^[0-9-]*$"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <span className="text-muted-foreground">-</span>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                    <InputOTPSlot index={6} />
                    <InputOTPSlot index={7} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
                <p className="text-sm text-warning text-center">
                  ⚠️ Each recovery code can only be used once
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary-glow/5 p-4">
      <Card className="w-full max-w-md shadow-elevation">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Two-Factor Authentication</CardTitle>
          </div>
          <CardDescription>
            Complete your login with an additional security step
          </CardDescription>

          {/* Method Selection */}
          <div className="flex gap-2 justify-center">
            <Button
              variant={method === "email" ? "default" : "outline"}
              size="sm"
              onClick={() => setMethod("email")}
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Email
            </Button>
            <Button
              variant={method === "totp" ? "default" : "outline"}
              size="sm"
              onClick={() => setMethod("totp")}
              className="flex items-center gap-2"
            >
              <Smartphone className="h-4 w-4" />
              App
            </Button>
            <Button
              variant={method === "recovery" ? "default" : "outline"}
              size="sm"
              onClick={() => setMethod("recovery")}
              className="flex items-center gap-2"
            >
              <Key className="h-4 w-4" />
              Recovery
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {renderMethodContent()}

          {/* Remember Device Option */}
          <div className="flex items-center space-x-2 p-4 bg-muted/30 rounded-lg">
            <Checkbox 
              id="remember" 
              checked={rememberDevice}
              onCheckedChange={(checked) => setRememberDevice(checked === true)}
            />
            <label 
              htmlFor="remember" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember this device for 30 days
            </label>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleVerify} 
              className="w-full"
              disabled={verificationCode.length === 0 || isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify & Continue"}
            </Button>
            
            <Button variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Button>
          </div>

          {/* Alternative Methods */}
          {method !== "recovery" && (
            <div className="text-center">
              <Button
                variant="link"
                size="sm"
                onClick={() => setMethod("recovery")}
                className="text-muted-foreground"
              >
                Can't access your device? Use a recovery code
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}