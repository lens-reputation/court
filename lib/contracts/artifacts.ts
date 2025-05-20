import mainnet from "@/contracts/lensreputation-mainnet";

export const getMainnetContractData = () => {
  const contractData = mainnet.LensReputation;
  if (!contractData) {
    throw new Error(`Contract data not found for chain mainnet`);
  }

  return contractData;
};
