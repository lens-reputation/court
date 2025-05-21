"use client";

import { useEffect, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { client } from "@/lib/clients/lens-protocol-mainnet";
import { Address } from "@/types/common";
import { fetchAccountsAvailable } from "@lens-protocol/client/actions";
import { AccountAvailable, evmAddress } from "@lens-protocol/react";
import { Loader2 } from "lucide-react";
import { useAccount } from "wagmi";
import { useLogin } from "@/hooks/use-login";

interface LoginLensAccountsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginLensAccountsDialog({ isOpen, onClose }: LoginLensAccountsDialogProps) {
  const [loggingIn, setLoggingIn] = useState<string | null>(null);
  const [lensAccounts, setLensAccounts] = useState<AccountAvailable[]>([]);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);

  const { login } = useLogin();
  const { status, address } = useAccount();

  useEffect(() => {
    const fetchLensAccounts = async (address: Address) => {
      setIsLoadingAccounts(true);
      try {
        const result = await fetchAccountsAvailable(client, {
          managedBy: evmAddress(address),
          includeOwned: true,
        });
        if (result.isOk()) {
          setLensAccounts(result.value.items.filter((account: AccountAvailable) => account !== undefined));
        }
      } catch (error) {
        console.error("Error fetching Lens accounts:", error);
      } finally {
        setIsLoadingAccounts(false);
      }
    };

    if (status === "connected" && address) {
      fetchLensAccounts(address);
    }
  }, [status, address]);

  const handleLogin = async (lensAcc: string) => {
    setLoggingIn(lensAcc);
    try {
      await login(lensAcc, () => {
        onClose();
      });
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setLoggingIn(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="border border-purple-100 dark:border-purple-800 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">Connect your Lens account</DialogTitle>
          <DialogDescription className="text-muted-foreground">Select a Lens profile to continue</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoadingAccounts ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600 dark:text-purple-400" />
            </div>
          ) : lensAccounts.length === 0 ? (
            <div className="py-6 text-center">
              <p className="text-muted-foreground">No Lens profiles associated with your wallet were found.</p>
              <p className="mt-2">
                <a
                  href="https://hey.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 underline hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  Create a profile on Lens
                </a>
              </p>
            </div>
          ) : (
            <div className="max-h-[300px] space-y-2 overflow-y-auto">
              {lensAccounts.map(lensAccount => (
                <div
                  key={lensAccount.account.address}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-purple-100 dark:border-purple-800">
                      <img
                        src={lensAccount.account.metadata?.picture || "/placeholder-user.jpg"}
                        alt={lensAccount.account.username?.value || "Lens Profile"}
                      />
                    </Avatar>
                    <div>
                      <p className="font-medium">{lensAccount?.account?.metadata?.name}</p>
                      <p className="text-sm text-muted-foreground">@{lensAccount.account.username?.value}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:text-white dark:hover:bg-purple-600"
                    onClick={() => handleLogin(lensAccount.account.address)}
                    disabled={loggingIn === lensAccount.account.address}
                  >
                    {loggingIn === lensAccount.account.address ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Login
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
