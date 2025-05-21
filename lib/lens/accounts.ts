"use client";

import { client } from "@/lib/clients/lens-protocol-mainnet";
import { Account } from "@/types/account";
import { evmAddress } from "@lens-protocol/client";
import { fetchAccountStats, fetchAccounts as fetchAccountsInProtocol } from "@lens-protocol/client/actions";

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

      // Process each account and fetch its stats
      const accountsWithStats = await Promise.all(
        results.value.items.map(async lensAccount => {
          let followers = 0;
          let following = 0;
          let posts = 0;

          // Fetch stats for this specific account
          const statsResult = await fetchAccountStats(client, {
            account: evmAddress(lensAccount.address),
          });

          if (statsResult.isOk() && statsResult.value) {
            followers = statsResult.value.graphFollowStats.followers ?? 0;
            following = statsResult.value.graphFollowStats.following ?? 0;
            posts = statsResult.value.feedStats.posts ?? 0;
          }

          return {
            address: lensAccount.address,
            handle: lensAccount.username?.value || `${lensAccount.address.substring(0, 6)}...`,
            name: lensAccount.metadata?.name || lensAccount.username?.value || "Unknown",
            avatar: lensAccount.metadata?.picture || "/placeholder-user.svg?height=100&width=100",
            bio: lensAccount.metadata?.bio || "",
            posts: posts,
            followers: followers,
            following: following,
          };
        }),
      );

      return accountsWithStats;
    }

    return [];
  } catch (error) {
    console.error("Error fetching accounts from Lens Protocol:", error);
    return [];
  }
}
