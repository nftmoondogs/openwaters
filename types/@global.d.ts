type User = {
  id: string;
  address: string;
  email: string;
  name: string;
  bio: string;
  profileImage: string;
  bannerImage: string;
  // likedCollections: Collection[];
  // likedNFTs: NFT[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

type Collection = {
  id: string;
  address: string;
  creator: User;
  name: string;
  symbol: string;
  bio: string;
  profileImage: string;
  bannerImage: string;
  type: "erc721" | "erc1155";
  royalty: number;
  twitter: string;
  discord: string;
  website: string;
  verified: boolean;
  volume: number;
  totalSupply: number;
  nfts?: NFT[];
  likedByUsers?: User[];
};

type NFT = {
  id: string;
  collection: Collection;
  tokenId: string;
  owner: User;
  price: string;
  metadataUrl: string;
  metaData: string;
  isListed: boolean;
  currency: string;
  likedByUsers?: User[];
};

type Offer = {
  id: string;
  collectionAddress: string;
  tokenId: string;
  offerer: User;
  price: string;
  currency: string;
  txHash: string;
  blockNumber: number;
  timestamp: number;
  createdAt: string;
};

type Transaction = {
  id: string;
  collection: Collection;
  from: User;
  to: User;
  nft: NFT;
  price: string;
  currency: string;
  eventType:
    | "Minted"
    | "Transfer"
    | "ItemListed"
    | "ItemCanceled"
    | "ItemBought";
  tx: string;
  blockNumber: number;
  timestamp: number;
  createdAt: string;
};

// type MessageType = {
//   collectionAddress: string,

// }

// type ListNftData = {
//   userAddress: string;

// }

type TransactionDataType = {
  collectionAddress: string;
  args: any;
  eventType:
    | "Minted"
    | "Transfer"
    | "ItemListed"
    | "ItemCanceled"
    | "ItemBought";
  tokenType: TokenType;
  tx: string;
  blockNumber: number;
};

type Metadata = {
  description?: string;
  external_url?: string;
  image?: string;
  name?: string;
  attributes?: {
    trait_type: string;
    value: string;
  };
};

type GetUserInfoResponse = {
  address: string;
  bannerImage: string;
  bio: string;
  createdAt: string;
  email: string;
  id: string;
  name: string;
  profileImage: string;
  updatedAt: string;
};

type GetUserResponse = {
  users: User[];
  count: number;
};

type UserUpdateData = {
  id: string;
  name: string;
  bio: string;
  email: string;
};

type GetCollectionResponse = {
  collections: Collection[];
  count: number;
  floorPrices: string[];
  volumes: { volume_24: string; volume_48: string }[];
};

type CollectionUpdateData = {
  address: string;
  bio: string;
  twitter: string;
  discord: string;
  website: string;
  royalty: string;
};

type GetNftResponse = {
  nfts: NFT[];
  count: number;
};

type GetOfferResponse = {
  offers: Offer[];
  count: number;
};

type GetTransactionResponse = {
  transactions: Transaction[];
  count: number;
};
