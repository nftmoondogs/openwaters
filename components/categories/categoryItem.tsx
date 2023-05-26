import React from "react";
import NftCard from "../NftCard";

const CategoryItem = ({ nfts }: { nfts: NFT[] }) => {
  return (
    <div className="grid grid-cols-2 gap-1 md:gap-[30px] md:grid-cols-2 lg:grid-cols-4">
      {nfts &&
        nfts.map((item, index) => {
          return <NftCard nft={item} key={index} />;
        })}
    </div>
  );
};

export default CategoryItem;
