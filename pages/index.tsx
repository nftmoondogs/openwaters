import React, { useContext, useEffect, useState } from "react";

import { apiGetAllCollections, apiGetHotNfts } from "../utils/api";

import UserContext from "../components/UserContext";
import Meta from "../components/Meta";
import HeadLine from "../components/headLine";
import Hero from "../components/hero/Hero";
import HotNftCarousel from "../components/carousel/Hot_Nft_Carousel";
import LaunchpadCarousel from "../components/carousel/LaunchpadCarousel";
import TrendingCollections from "../components/collections/TrendingCollections";
import { useAppSelector } from "../redux/store";

export default function Home() {
  const { scrollRef } = useContext(UserContext);
  const tokenPrice = useAppSelector((state) => state.tokenPrice);
  const [hotNfts, setHotNfts] = useState<NFT[]>([]);
  const [topCollections, setTopCollections] = useState<GetCollectionResponse>({
    collections: [],
    count: 0,
    floorPrices: [],
    volumes: [],
  });
  const launchpadItems = [
    {
      title: "OpenWaters Origin",
      description:
        "Limited NFTs only for the OG believers of OpenWaters NFT Marketplace",
      imageUrl:
        "https://i.ibb.co/vPGDnr8/image.gif",
      pageUrl: "https://openwatersorigin.openwaters.uk/",
    },
  ];
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
      try {
        const res = await apiGetHotNfts();
        setHotNfts(res);
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (tokenPrice.woofPrice === 0) return;
        const res = await apiGetAllCollections(tokenPrice.woofPrice);
        setTopCollections(res);
      } catch (error) {}
    })();
  }, [tokenPrice.woofPrice]);

  return (
    <main>
      <Meta title="Home" />
      {/* <Hero /> */}
      <LaunchpadCarousel items={launchpadItems} />
      {/* {hotNfts.length > 0 ? (
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
      )} */}
      <TrendingCollections collections={topCollections} />
    </main>
  );
}
