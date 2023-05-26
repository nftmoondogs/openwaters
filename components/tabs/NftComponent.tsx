import { useState, useEffect } from "react";
import { apiGetNftMetadata } from "../../utils/api";
import { replacePinataUrl } from "../../utils";
import Link from "next/link";

const NftComponent = ({
  nft,
  collection,
}: {
  nft: NFT;
  collection: Collection;
}) => {
  const [metadataInfo, setMetadataInfo] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        if (nft.metaData) {
          setMetadataInfo(JSON.parse(nft.metaData));
        } else {
          if (
            nft.metadataUrl &&
            nft.collection?.address &&
            nft.tokenId !== undefined
          ) {
            const res = await apiGetNftMetadata(
              nft.metadataUrl,
              nft.collection.address,
              nft.tokenId
            );
            setMetadataInfo(res);
          }
        }
      } catch (error) {}
    })();
  }, [nft]);

  return (
    <Link href={`/item/${collection?.address}/${nft?.tokenId}`}>
      <div className="flex gap-2 items-center cursor-pointer hover:text-accent">
        <img
          src={
            replacePinataUrl(metadataInfo?.image) ||
            "/images/default/nft_default.jpg"
          }
          alt={nft?.collection?.name || "Unnamed"}
          className="w-[30px] h-[30px] object-cover rounded-2xl"
        />
        <p className="truncate">{metadataInfo?.name || "Unnamed"}</p>
      </div>
    </Link>
  );
};

export default NftComponent;
