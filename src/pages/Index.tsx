import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Mail, Smartphone, Key, ArrowRight, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TwoFactorDashboard from "@/components/TwoFactorDashboard";
import EmailSetupWizard from "@/components/EmailSetupWizard";
import TOTPSetupWizard from "@/components/TOTPSetupWizard";
import TwoFactorLogin from "@/components/TwoFactorLogin";
import RecoveryCodesView from "@/components/RecoveryCodesView";

type ViewMode = "overview" | "dashboard" | "email-setup" | "totp-setup" | "login" | "recovery";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewMode>("overview");
  const navigate = useNavigate();

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <TwoFactorDashboard />;
      case "email-setup":
        return <EmailSetupWizard />;
      case "totp-setup":
        return <TOTPSetupWizard />;
      case "login":
        return <TwoFactorLogin />;
      case "recovery":
        return <RecoveryCodesView />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary-glow/5 p-4">
            <div className="container mx-auto max-w-6xl space-y-8">
              {/* Header */}
              <div className="text-center space-y-4 py-12">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-primary/10 shadow-security">
                    <Shield className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  EPIC 5: Two-Factor Authentication
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Complete 2FA implementation based on UX-027 to UX-033 specifications.
                  Explore all user stories with working prototypes and beautiful interfaces.
                </p>
                <Badge variant="outline" className="text-sm">
                  Frontend User Stories HU-FE-012 to HU-FE-016
                </Badge>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* HU-FE-012: 2FA Settings Dashboard */}
                <Card
                  className="shadow-card hover:shadow-elevation transition-all duration-300 cursor-pointer"
                  onClick={() => navigate("/2fa-dashboard")}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Settings className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">HU-FE-012</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          UX-027
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <h3 className="font-semibold">2FA Settings Dashboard</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete dashboard with toggle switches, status badges, recovery codes section,
                      device list, and confirmation dialogs using shadcn/ui components.
                    </p>
                    <div className="flex items-center gap-2 text-primary">
                      <span className="text-sm font-medium">View Dashboard</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>

                {/* HU-FE-013: Email 2FA Setup */}
                <Card
                  className="shadow-card hover:shadow-elevation transition-all duration-300 cursor-pointer"
                  onClick={() => navigate("/email-2fa")}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">HU-FE-013</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          UX-028
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <h3 className="font-semibold">Email 2FA Setup Wizard</h3>
                    <p className="text-sm text-muted-foreground">
                      3-step wizard with progress indicator, email preview, navigation controls,
                      and OTP verification using designed interface specifications.
                    </p>
                    <div className="flex items-center gap-2 text-primary">
                      <span className="text-sm font-medium">Start Setup</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>

                {/* HU-FE-014: TOTP Setup */}
                <Card
                  className="shadow-card hover:shadow-elevation transition-all duration-300 cursor-pointer"
                  onClick={() => navigate("/totp-setup")}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Smartphone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">HU-FE-014</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          UX-029
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <h3 className="font-semibold">TOTP Authenticator Setup</h3>
                    <p className="text-sm text-muted-foreground">
                      4-step wizard with QR code display, app links, troubleshooting section,
                      verification flow, and recovery codes download.
                    </p>
                    <div className="flex items-center gap-2 text-primary">
                      <span className="text-sm font-medium">Configure TOTP</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>

                {/* HU-FE-015: 2FA Login */}
                <Card
                  className="shadow-card hover:shadow-elevation transition-all duration-300 cursor-pointer"
                  onClick={() => navigate("/login-2fa")}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">HU-FE-015</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          UX-030
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <h3 className="font-semibold">2FA Verification on Login</h3>
                    <p className="text-sm text-muted-foreground">
                      Method-specific interfaces with expiration timers, "Remember device" option,
                      fallback to recovery codes, and auto-submit behavior.
                    </p>
                    <div className="flex items-center gap-2 text-primary">
                      <span className="text-sm font-medium">Test Login Flow</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>

                {/* HU-FE-016: Recovery Codes */}
                <Card
                  className="shadow-card hover:shadow-elevation transition-all duration-300 cursor-pointer"
                  onClick={() => navigate("/recovery-codes")}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-warning/10">
                        <Key className="h-6 w-6 text-warning" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">HU-FE-016</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          UX-031
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <h3 className="font-semibold">Recovery Codes Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Recovery code input interface, remaining codes list, visual warnings,
                      regeneration process, and usage logging functionality.
                    </p>
                    <div className="flex items-center gap-2 text-primary">
                      <span className="text-sm font-medium">Manage Codes</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>

                {/* Development Plan Card */}
                <Card className="shadow-card bg-gradient-subtle border-primary/20">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Development Plan</CardTitle>
                        <Badge variant="default" className="text-xs">
                          EPIC 5
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <h3 className="font-semibold">Complete Implementation</h3>
                    <p className="text-sm text-muted-foreground">
                      All user stories implemented with proper UX references, required deliverables,
                      and acceptance criteria as specified in the development plan.
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <Badge variant="outline">Scope Defined</Badge>
                      <Badge variant="outline">Dependencies Clear</Badge>
                      <Badge variant="outline">Acceptance Criteria</Badge>
                      <Badge variant="outline">UX Compliant</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Technical Implementation Summary */}
              <Card className="shadow-elevation">
                <CardHeader>
                  <CardTitle className="text-2xl">Technical Implementation Summary</CardTitle>
                  <CardDescription>
                    EPIC 5 implementation with all required features and UX specifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-primary">Design System</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Security-themed color tokens</li>
                        <li>• Custom gradients and shadows</li>
                        <li>• Semantic badge variants</li>
                        <li>• Consistent animations</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-primary">Components Used</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• shadcn/ui Cards & Dialogs</li>
                        <li>• Progress indicators</li>
                        <li>• Input OTP components</li>
                        <li>• Toggle switches & badges</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-primary">UX Features</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Step-by-step wizards</li>
                        <li>• Visual feedback & timers</li>
                        <li>• Confirmation dialogs</li>
                        <li>• Error states & warnings</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {currentView !== "overview" && (
        <div className="fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            onClick={() => setCurrentView("overview")}
            className="bg-background/80 backdrop-blur-sm"
          >
            ← Back to Overview
          </Button>
        </div>
      )}
      {renderCurrentView()}
    </div>
  );
};

export default Index;
