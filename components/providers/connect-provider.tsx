"use client";

import { useState } from "react";
import { LoginLensAccountsDialog } from "@/components/login-lens-accounts-dialog";
import { useAuthStore } from "@/stores/auth-store";
import { ConnectKitProvider } from "connectkit";

// Provider component that wraps the application
export function ConnectProvider({ children }: { children: React.ReactNode }) {
  const [isLoginLensDialogOpen, setIsLoginLensDialogOpen] = useState(false);

  const { setWalletAddress } = useAuthStore();

  const handleDisconnect = async () => {};

  const handleConnect = async (walletAddress: string) => {
    // When wallet connects, open the login modal to select Lens account
    setIsLoginLensDialogOpen(true);
    setWalletAddress(walletAddress);
  };

  const handleClose = () => {
    setIsLoginLensDialogOpen(false);
  };

  return (
    <ConnectKitProvider onConnect={({ address }) => handleConnect(address ?? "")} onDisconnect={handleDisconnect}>
      <LoginLensAccountsDialog isOpen={isLoginLensDialogOpen} onClose={handleClose} />
      {children}
    </ConnectKitProvider>
  );
}
