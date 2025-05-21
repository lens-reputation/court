import { useCallback } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { client } from '@/lib/clients/lens-protocol-mainnet';
import { fetchAccount } from '@lens-protocol/client/actions';
import { signMessageWith } from '@lens-protocol/client/viem';
import { evmAddress, useLogin as useLensLogin } from '@lens-protocol/react';
import { useAccount, useWalletClient } from 'wagmi';

export function useLogin() {
  const { 
    setAccount,
    setIsLoggedIn,
    setIsLoading,
    walletAddress,
    setLensSession
  } = useAuthStore();
  
  const { status: walletStatus } = useAccount();
  const { execute: loginLens } = useLensLogin();
  const { data: walletClient } = useWalletClient();

  const login = useCallback(
    async (address: string, onLoginSuccess?: () => void) => {
      if (walletStatus !== 'connected') {
        console.error('Wallet is not connected');
        return;
      }

      if (!walletClient) {
        console.error('Wallet client data is not available');
        return;
      }

      setIsLoading(true);
      try {
        const authenticated = await loginLens({
          accountOwner: {
            account: evmAddress(address),
            owner: evmAddress(walletAddress || ''),
          },
          signMessage: signMessageWith(walletClient),
        });

        if (authenticated.isErr()) {
          throw new Error(`Authentication failed: ${authenticated.error.message}`);
        }

        // Set lens session
        setLensSession(authenticated.value);

        // Fetch account details
        const result = await fetchAccount(client, { address: evmAddress(address) });
        if (result.isOk()) {
          setAccount(result.value);
          setIsLoggedIn(true);
          onLoginSuccess?.();
        } else {
          console.error('Failed to fetch account:', result.error);
          throw new Error(`Failed to fetch account: ${result.error.message}`);
        }
      } catch (error) {
        console.error('Error during login:', error);
        throw error; // Re-throw to allow handling in UI components
      } finally {
        setIsLoading(false);
      }
    },
    [walletStatus, walletAddress, walletClient, loginLens, setAccount, setIsLoggedIn, setIsLoading, setLensSession]
  );

  return {
    login,
    isLoading: useAuthStore(state => state.isLoading),
  };
}
