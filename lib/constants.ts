import contractData from "./AnimalSponsorship.json";

export const CONTRACT_ADDRESS = contractData.address as `0x${string}`; // <-- Adresse einsetzen

export const CONTRACT_ABI = contractData.abi;