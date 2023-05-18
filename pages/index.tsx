import React, { useContext, useEffect, useState } from "react";

import { apiGetHotNfts, apiGetTopCollections } from "../utils/api";

import UserContext from "../components/UserContext";
import Meta from "../components/Meta";
import HeadLine from "../components/headLine";
import Hero from "../components/hero/Hero";
import HotNftCarousel from "../components/carousel/Hot_Nft_Carousel";
import Top_collection from "../components/collections/top_collection";

export default function Home() {
  const { scrollRef } = useContext(UserContext);
  const [hotNfts, setHotNfts] = useState<NFT[]>([]);
  const [topCollections, setTopCollections] = useState<Collection[]>([]);

  useEffect(() => {
    window.scrollTo(0, scrollRef.current.scrollPos);
    const handleScrollPos = () => {
      scrollRef.current.scrollPos = window.scrollY;
    };
    window.addEventListener("scroll", handleScrollPos);
    return () => {
      window.removeEventListener("scroll", handleScrollPos);
    };
  });

  useEffect(() => {
    (async () => {
      const res = await apiGetHotNfts();
      setHotNfts(res);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGetTopCollections();
        setTopCollections(res);
      } catch (error) {}
    })();
  }, []);

  return (
    <main>
      <Meta title="Home" />
      <Hero />
      {hotNfts.length > 0 ? (
        <div className="container">
          <HeadLine
            text="Hot NFTs"
            image="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/64/1f525.png"
            classes="font-display text-jacarta-700 mb-8 text-center text-3xl dark:text-white"
            pera={undefined}
          />
          <HotNftCarousel nfts={hotNfts} />
        </div>
      ) : (
        <></>
      )}
      <Top_collection collections={topCollections} />
    </main>
  );
}
