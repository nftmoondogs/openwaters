import { PINATA_GATEWAY_URL } from "../config/env";

export const replacePinataUrl = (url: string | undefined): string => {
  if (!url) {
    return "";
  }

  return url
    .replace("ipfs://", PINATA_GATEWAY_URL)
    .replace("https://ipfs.io/ipfs/", PINATA_GATEWAY_URL)
    .replace("https://dweb.link/ipfs/", PINATA_GATEWAY_URL)
    .replace("https://gateway.ipfs.io/ipfs/", PINATA_GATEWAY_URL)
    .replace("https://gateway.pinata.cloud/ipfs/", PINATA_GATEWAY_URL)
    .replace(/https:\/\/ipfs.*.*\/ipfs\//g, PINATA_GATEWAY_URL)
    .replace(/https:\/\/*.*\.mypinata\.cloud\/ipfs\//g, PINATA_GATEWAY_URL)
    .replace(/#/g, "%23");
};

export const shortenAddress = (address: string | undefined) => {
  if (address === undefined) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatAmountWithUnit = (amount: number, displayDecimals = 2) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return amount >= item.value;
    });

  if (amount > 1000 * (item?.value as number)) {
    let i = 21;
    for (; ; i++) {
      if (amount < Math.pow(10, i + 1)) {
        break;
      }
    }

    return `${(amount / Math.pow(10, i)).toFixed(displayDecimals)}*1e${i}`;
  }

  return item
    ? (amount / item.value).toFixed(displayDecimals).replace(rx, "$1") +
        item.symbol
    : "0";
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function isPageActive(path: string, match: string) {
  if (path && match) {
    if (path === match) {
      return true;
    }
    return false;
  }
  return false;
}

export const isOwner = (nft: NFT, walletAddress: string) => {
  if (!walletAddress) {
    return false;
  }

  return nft?.owner?.address.toUpperCase() === walletAddress?.toUpperCase();
};

export const isCreator = (collection: Collection, walletAddress: string) => {
  if (!walletAddress) {
    return false;
  }

  return (
    collection?.creator?.address.toUpperCase() === walletAddress?.toUpperCase()
  );
};

export const checkOffered = (offers: Offer[], walletAddress: string) => {
  if (!walletAddress) {
    return false;
  }
  const myOffer = offers.filter(
    (offer) =>
      offer.offerer.address.toUpperCase() === walletAddress.toUpperCase()
  );
  return myOffer.length !== 0;
};

export const validateEmail = (mail: string) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
};

export const parseMetadata = (metadata: string) => {
  return JSON.parse(metadata);
};

export enum EventType {
  OFFER_MADE = 'OfferMade',
}

export const formatActivity = (eventType: string): string => {
  switch (eventType) {
    case "Minted":
      return "Mint";
    case "ItemListed":
      return "List";
    case "ItemCanceled":
      return "Cancel";
    case "ItemBought":
      return "Sale";
    case "OfferAccepted":
      return "Sale";
    case "OfferMade":
      return "Offer";
    default:
      return "Transfer";
  }
};
