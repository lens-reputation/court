"use client";

import { useState } from "react";
import { LoginLensAccountsDialog } from "@/components/login-lens-accounts-dialog";
import { ConnectKitProvider } from "connectkit";

// Provider component that wraps the application
export function ConnectProvider({ children }: { children: React.ReactNode }) {
  const [isLoginLensDialogOpen, setIsLoginLensDialogOpen] = useState(false);

  const handleDisconnect = async () => {

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
