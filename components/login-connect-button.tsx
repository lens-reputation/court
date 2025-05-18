"use client";

import { useEffect, useState } from "react";
import { LoginLensAccountsDialog } from "@/components/login-lens-accounts-dialog";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConnectKitButton } from "connectkit";
import { ChevronDown, Loader2, LogOut, User, Wallet } from "lucide-react";
import { useAccount } from "wagmi";

export function LoginConnectButton() {
  const [showLensDialog, setShowLensDialog] = useState(false);

  const { address, isConnected: isWalletConnected } = useAccount();
  const { isLoading: isAuthLoading, account, logout } = useAuth();

  useEffect(() => {
    if (isWalletConnected && address) {
      const loadProfilesAndShowDialog = async () => {
        if (!account) {
          setShowLensDialog(true);
        }
      };

      loadProfilesAndShowDialog();
    }
  }, [isWalletConnected, address, account]);

  return (
    <>
      <ConnectKitButton.Custom>
        {({ isConnected, isConnecting, show, hide, address, ensName }) => {
          if (isConnected && account) {
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="gap-2 border-purple-600 text-purple-600 hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-900"
                  >
                    <img
                      src={account.metadata?.picture || "/placeholder-user.jpg"}
                      alt="Lens Profile"
                      className="h-4 w-4 rounded-full"
                    />
                    @{account.username?.localName}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem
                    onClick={() => {
                      setShowLensDialog(true);
                    }}
                    className="cursor-pointer"
                  >
                    <User className="mr-2 h-4 w-4 text-purple-500" />
                    Change profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4 text-purple-500" />
                    Disconnect from Lens
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }

          if (isConnected && !account) {
            return (
              <Button
                variant="outline"
                className="gap-2 border-purple-600 text-purple-600 hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-900"
                onClick={() => setShowLensDialog(true)}
                disabled={isAuthLoading}
              >
                {isAuthLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading profiles...
                  </>
                ) : (
                  <>
                    <Wallet className="h-4 w-4" />
                    Connect with Lens
                  </>
                )}
              </Button>
            );
          }

          return (
            <Button
              onClick={show}
              variant="outline"
              className="gap-2 border-purple-600 text-purple-600 hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-900"
            >
              <Wallet className="h-4 w-4" />
              {isConnected
                ? ensName || `${address?.substring(0, 6)}...${address?.substring(address.length - 4)}`
                : isConnecting
                  ? "Connecting..."
                  : "Connect Wallet"}
            </Button>
          );
        }}
      </ConnectKitButton.Custom>

      <LoginLensAccountsDialog
        isOpen={showLensDialog}
        onClose={() => setShowLensDialog(false)}
      />
    </>
  );
}
