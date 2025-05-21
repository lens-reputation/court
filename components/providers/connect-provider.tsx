"use client";

import { useState } from "react";
import { LoginLensAccountsDialog } from "@/components/login-lens-accounts-dialog";
import { useAuth } from "@/components/providers/auth-provider";
import { ConnectKitProvider } from "connectkit";

// Provider component that wraps the application
export function ConnectProvider({ children }: { children: React.ReactNode }) {
  const [isLoginLensDialogOpen, setIsLoginLensDialogOpen] = useState(false);
  const { logout } = useAuth();

  const handleDisconnect = async () => {
    // Use the logout function from AuthProvider which already handles both wallet and Lens logout
    await logout();
  };

  const handleConnect = async () => {
    // When wallet connects, open the login modal to select Lens account
    setIsLoginLensDialogOpen(true);
  };

  const handleClose = () => {
    setIsLoginLensDialogOpen(false);
  };

  return (
    <ConnectKitProvider onConnect={handleConnect} onDisconnect={handleDisconnect}>
      <LoginLensAccountsDialog isOpen={isLoginLensDialogOpen} onClose={handleClose} />
      {children}
    </ConnectKitProvider>
  );
}
