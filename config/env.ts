import { mainnet, testnet } from "./network";

export const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
export const PINATA_API_SECRET = process.env.NEXT_PUBLIC_PINATA_API_SECRET;
export const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const MARKETPLACE_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS;

export const PINATA_GATEWAY_URL =
  process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL ||
  "https://gateway.pinata.cloud/ipfs/";

export const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
export const CHAIN_ID = process.env.NODE_ENV === "production" ? 1116 : 1116;
export const EXPLORER_URL =
  process.env.NODE_ENV === "production"
    ? mainnet.blockExplorers?.default.url
    : testnet.blockExplorers?.default.url;
