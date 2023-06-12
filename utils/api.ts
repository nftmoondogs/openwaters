import { useAppSelector } from "../redux/store";

import api from "../lib/axios";
import { SERVER_API } from "../config/env";

const apiUrl = SERVER_API;

export const apiGetResponse = async <T>(url: string): Promise<T> => {
  try {
    const res: T = await api.get(url);
    return res;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const apiPutResponse = async <T>(url: string, data: any): Promise<T> => {
  try {
    const res: T = await api.put(url, data);
    return res;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const apiPatchResponse = async <T>(
  url: string,
  data: any
): Promise<T> => {
  try {
    const res: T = await api.patch(url, data);
    return res;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const apiGetAccount = async (address: string) => {
  if (!address) return;
  const url = `${apiUrl}/user/info?address=${address}`;
  try {
    const res = await apiGetResponse<User>(url);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiEditAccount = async (
  userAddress: string,
  signature: string,
  data: any
) => {
  if (!userAddress || !signature) return;
  const url = `${apiUrl}/user?userAddress=${userAddress}&signature=${signature}`;
  try {
    const res = await apiPutResponse<User>(url, data);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiGetAllUsers = async () => {
  const url = `${apiUrl}/user`;
  try {
    const res = await apiGetResponse<GetUserResponse>(url);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiGetCollection = async (address: string) => {
  if (!address) return;
  const url = `${apiUrl}/collection/all?address=${address}`;
  try {
    const res = await apiGetResponse<GetCollectionResponse>(url);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiEditCollection = async (
  userAddress: string,
  signature: string,
  updateCollectionData: CollectionUpdateData,
  profileImage: File,
  bannerImage: File
) => {
  if (!userAddress || !signature) return;
  const url = `${apiUrl}/collection?userAddress=${userAddress}&signature=${signature}`;
  const data = new FormData();
  data.append("address", updateCollectionData.address ?? "");
  data.append("bio", updateCollectionData.bio ?? "");
  data.append("twitter", updateCollectionData.twitter ?? "");
  data.append("discord", updateCollectionData.discord ?? "");
  data.append("website", updateCollectionData.website ?? "");
  data.append("royalty", updateCollectionData.royalty);
  if (profileImage) {
    data.append("profileImage", profileImage);
  }
  if (bannerImage) {
    data.append("bannerImage", bannerImage);
  }
  try {
    const res = await apiPutResponse<Collection>(url, data);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiGetOwnedCollections = async (
  creatorAddress: string,
  offset = 0,
  limit = 12
) => {
  const url = `${apiUrl}/collection/all?creatorAddress=${creatorAddress}&take=${limit}&skip=${offset}`;
  if (!creatorAddress) return;
  try {
    const res = await apiGetResponse<GetCollectionResponse>(url);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiGetTopCollections = async (offset = 0, limit = 20) => {
  const url = `${apiUrl}/collection/hot?take=${limit}&skip=${offset}`;
  try {
    const res = await apiGetResponse<Collection[]>(url);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiGetAllCollections = async (
  woofPrice: number,
  offset = 0,
  limit = 20
) => {
  const url = `${apiUrl}/collection/all?take=${limit}&skip=${offset}&woofPrice=${woofPrice}`;
  try {
    const res = await apiGetResponse<GetCollectionResponse>(url);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiGetCollectionNfts = async (
  collectionAddress: string,
  offset = 0,
  limit = 12
) => {
  const url = `${apiUrl}/nft/all?collectionAddress=${collectionAddress}&take=${limit}&skip=${offset}`;
  if (!collectionAddress) return;
  try {
    const res = await apiGetResponse<GetNftResponse>(url);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiGetOnSaleNfts = async (
  offset = 0,
  isListed = true,
  limit = 12
) => {
  const url = `${apiUrl}/nft/all?isListed=${isListed}&take=${limit}&skip=${offset}`;
  try {
    const res = await apiGetResponse<GetNftResponse>(url);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiGetHotNfts = async (offset = 0, limit = 12) => {
  const url = `${apiUrl}/nft/hot?take=${limit}&skip=${offset}`;
  try {
    const res = await apiGetResponse<NFT[]>(url);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiGetAllNfts = async () => {
  const url = `${apiUrl}/nft/all`;
  try {
    const res = await apiGetResponse<GetNftResponse>(url);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiGetOwnedNfts = async (
  ownerAddress: string,
  offset = 0,
  limit = 12
) => {
  const url = `${apiUrl}/nft/all?ownerAddress=${ownerAddress}&take=${limit}&skip=${offset}`;
  if (!ownerAddress) return;
  try {
    const res = await apiGetResponse<GetNftResponse>(url);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiGetNft = async (collectionAddress: string, tokenId: string) => {
  const url = `${apiUrl}/nft/detail?collectionAddress=${collectionAddress}&tokenId=${tokenId}`;
  if (!collectionAddress) return;
  if (tokenId === undefined) return;
  try {
    const res: NFT = await apiGetResponse<NFT>(url);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiGetBuySignature = async (
  signerAddress: string,
  collectionAddress: string,
  tokenId: string,
  tokenAddress: string
) => {
  const url = `${apiUrl}/nft/purchase?signer=${signerAddress}&collectionAddress=${collectionAddress}&tokenId=${tokenId}&tokenAddress=${tokenAddress}`;
  try {
    const res: string = await apiGetResponse(url);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiGetOfferSignature = async (
  signerAddress: string,
  collectionAddress: string,
  tokenId: string,
  tokenAddress: string,
  offererAddress: string
) => {
  const url = `${apiUrl}/nft/accept?signer=${signerAddress}&collectionAddress=${collectionAddress}&tokenId=${tokenId}&tokenAddress=${tokenAddress}&offererAddress=${offererAddress}`;
  try {
    const res: string = await apiGetResponse(url);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiGetOffersForAsset = async (
  collectionAddress: string,
  tokenId: string
) => {
  const url = `${apiUrl}/offer?collectionAddress=${collectionAddress}&tokenId=${tokenId}`;
  try {
    const res = await apiGetResponse<GetOfferResponse>(url);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiGetNftHistory = async (
  collectionAddress: string,
  tokenId: string
) => {
  const url = `${apiUrl}/transaction?collectionAddress=${collectionAddress}&tokenId=${tokenId}`;
  try {
    const res = await apiGetResponse<GetTransactionResponse>(url);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiGetCollectionHistory = async (
  collectionAddress: string,
  offset = 0,
  limit = 12
) => {
  const url = `${apiUrl}/transaction?collectionAddress=${collectionAddress}&take=${limit}&skip=${offset}`;
  try {
    const res = await apiGetResponse<GetTransactionResponse>(url);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiGetNftMetadata = async (
  tokenUri: string,
  collectionAddress: string,
  tokenId: string
) => {
  const url = `${apiUrl}/nft?tokenURI=${tokenUri}&collectionAddress=${collectionAddress}&tokenId=${tokenId}`;
  try {
    const res = await apiGetResponse(url);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiListNft = async (body: {
  userAddress: string;
  message: {
    domain: any;
    types: any;
    value: any;
  };
  signature: string;
}) => {
  const url = `${apiUrl}/nft`;
  try {
    const res = await apiPatchResponse(url, body);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiOfferNft = async (body: {
  userAddress: string;
  message: {
    domain: any;
    types: any;
    value: any;
  };
  signature: string;
}) => {
  const url = `${apiUrl}/offer`;
  try {
    const res = await apiPatchResponse(url, body);
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiGetTokenPrice = async (tokenAddress: string) => {
  const url = `https://api.geckoterminal.com/api/v2/networks/core/tokens/${tokenAddress}/pools`;
  try {
    const res: any = await apiGetResponse(url);
    return res.data?.[0]?.attributes.base_token_price_native_currency;
  } catch (error) {
    console.log(error);
  }
};
