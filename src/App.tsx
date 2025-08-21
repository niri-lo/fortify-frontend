import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import TwoFactorDashboard from './components/TwoFactorDashboard';
import EmailSetupWizard from './components/EmailSetupWizard';
import TOTPSetupWizard from './components/TOTPSetupWizard';
import TwoFactorLogin from './components/TwoFactorLogin';
import RecoveryCodesView from './components/RecoveryCodesView';
import NotFound from './pages/NotFound';

// Componentes de UI


function App() {
  return (
    <Routes>
      {/* Página de inicio */}
      <Route path="/" element={<Index />} />

      {/* Rutas específicas para Figma plugin */}
      <Route path="/2fa-dashboard" element={<TwoFactorDashboard />} />
      <Route path="/email-2fa" element={<EmailSetupWizard />} />
      <Route path="/totp-setup" element={<TOTPSetupWizard />} />
      <Route path="/login-2fa" element={<TwoFactorLogin />} />
      <Route path="/recovery-codes" element={<RecoveryCodesView />} />

      {/* Página 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
