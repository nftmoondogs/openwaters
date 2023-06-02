import Link from "next/link";
import { formatEther } from "viem";

import { shortenAddress, replacePinataUrl } from "../utils";
import { CDN_URL } from "../config/env";
import { useEffect, useState } from "react";
import { apiGetNftMetadata } from "../utils/api";

const NftCard = ({ nft }: { nft: NFT }) => {
  const {
    id,
    collection,
    tokenId,
    likedByUsers,
    owner,
    metadataUrl,
    metaData,
    price,
    currency,
    isListed,
  } = nft;

  const [metadataInfo, setMetadataInfo] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        if (metaData) {
          setMetadataInfo(JSON.parse(metaData));
        } else {
          if (metadataUrl && collection?.address && tokenId !== undefined) {
            const res = await apiGetNftMetadata(
              metadataUrl,
              collection?.address,
              tokenId
            );
            setMetadataInfo(res);
          }
        }
      } catch (error) {}
    })();
  }, [metaData, tokenId, collection?.address]);

  return (
    <article>
      <Link href={`/item/${collection?.address}/${tokenId}`}>
        <div className="cursor-pointer dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl block border bg-white p-2 md:p-4 transition-shadow hover:shadow-lg">
          <figure className="relative">
            <img
              src={
                replacePinataUrl(metadataInfo?.image) ||
                "/images/default/nft_default.jpg"
              }
              alt="item 5"
              className="w-full aspect-square rounded-[0.625rem] object-cover"
            />
          </figure>

          <div className="flex flex-col md:flex-row items-center justify-between gap-1 mt-3 overflow-hidden">
            <span className="text-sm md:text-base font-display text-jacarta-700 dark:text-white py-1 truncate">
              {metadataInfo?.name || "Unnamed"}
            </span>
            {isListed && (
              <span className="dark:border-jacarta-600 border-jacarta-100 flex items-center whitespace-nowrap rounded-md border py-[2px] px-2 box-border">
                <img
                  src={`/images/tokens/${currency}.png`}
                  alt=""
                  className="w-3 h-3 mr-1"
                />
                <span className="text-green text-sm font-medium tracking-tight">
                  {formatEther(BigInt(price))} {currency}
                </span>
              </span>
            )}
          </div>
          <div className="mt-2 text-sm">
            <span className="dark:text-jacarta-200 text-jacarta-700 flex flex-col md:flex-row items-center gap-0 md:gap-1">
              Owner:
              <Link href={`/profile/${owner?.address}`}>
                <div className="flex items-center gap-1 ">
                  <img
                    src={
                      owner?.profileImage
                        ? `${CDN_URL}/${owner?.profileImage}`
                        : "/images/default/profile_avatar_default.png"
                    }
                    alt="owner"
                    className="w-6 h-6 border-2 border-white rounded-full dark:border-jacarta-600 object-cover"
                  />
                  <p className="hover:text-accent-dark font-bold">
                    {owner?.name || shortenAddress(owner?.address)}
                  </p>
                </div>
              </Link>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default NftCard;
