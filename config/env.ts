import { mainnet, testnet } from "./network";

export const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
export const PINATA_API_SECRET = process.env.NEXT_PUBLIC_PINATA_API_SECRET;
export const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const MARKETPLACE_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS as `0x${string}`;

export const PINATA_GATEWAY_URL =
  process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL ||
  "https://gateway.pinata.cloud/ipfs/";

export const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;
export const CHAIN_ID = 1116;
export const EXPLORER_URL = mainnet.blockExplorers?.default.url;

export const WOOF_TOKEN_ADDRESS =
  "0x5C44d3D2312AbA4d5F2406A98Bf374Bc76455092" as `0x${string}`;
export const WCORE_TOKEN_ADDRESS =
  "0x40375C92d9FAf44d2f9db9Bd9ba41a3317a2404f" as `0x${string}`;
