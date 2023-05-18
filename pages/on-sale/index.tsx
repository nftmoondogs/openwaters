import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { apiGetOnSaleNfts } from "../../utils/api";

import Meta from "../../components/Meta";
import NftCard from "../../components/NftCard";

const OnSale = () => {
  const [onSaleNfts, setOnSaleNfts] = useState<NFT[]>([]);
  const [count, setCount] = useState<number>(0);

  const fetchMore = async () => {
    try {
      const res = await apiGetOnSaleNfts(onSaleNfts.length);
      setOnSaleNfts(onSaleNfts.concat(res.nfts));
    } catch (error) {
    }
  };

  useEffect(() => {
    (async () => {
      const res = await apiGetOnSaleNfts();
      setOnSaleNfts(res.nfts);
      setCount(res.count);
    })();
  }, []);
  return (
    <>
      <Meta title="On Sale NFTs || Moondogs | NFT Marketplace" />
      <div className="container pt-[5.5rem] lg:pt-24">
        {onSaleNfts.length === 0 ? (
          <p className="text-center text-2xl font-bold">No NFTs on sale</p>
        ) : (
          <InfiniteScroll
            dataLength={onSaleNfts.length}
            loader={
              <p className="text-center text-lg font-bold p-6">Loading...</p>
            }
            next={fetchMore}
            hasMore={onSaleNfts.length < count}
          >
            <div className="grid grid-cols-1 gap-[30px] md:grid-cols-3 lg:grid-cols-4">
              {onSaleNfts.map((nft, index) => {
                return <NftCard nft={nft} key={index} />;
              })}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

export default OnSale;
