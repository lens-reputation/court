"use client";

import { client } from "@/lib/clients/lens-protocol-mainnet";
import { Account } from "@/types/account";
import { fetchAccounts as fetchAccountsInProtocol } from "@lens-protocol/client/actions";

/**
 * Fetches random accounts from Lens Protocol
 * @param limit Number of accounts to fetch (default: 10)
 * @returns Promise that resolves to an array of Account objects
 */
export async function fetchAccounts(limit: number = 10): Promise<Account[]> {
  try {
    const results = await fetchAccountsInProtocol(client);
    if (results.isOk()) {
      console.log("Fetched accounts:", results);
      // Map the profiles to our Account format
      return results.value.items.map(lensAccount => ({
        address: parseInt(lensAccount.address),
        handle: lensAccount.username?.value || `${lensAccount.address.substring(0, 6)}...`,
        name: lensAccount.metadata?.name || lensAccount.username?.value || "Unknown",
        avatar: lensAccount.metadata?.picture || "/placeholder-user.svg?height=100&width=100",
        bio: lensAccount.metadata?.bio || "",
        posts: 0,
        followers: 10,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching accounts from Lens Protocol:", error);
    return [];
  }
}
