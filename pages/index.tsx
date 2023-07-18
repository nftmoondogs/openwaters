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
      type: "Featured Launchpad Project",
      title: "OpenWaters Origin",
      description:
        "Limited NFTs for the OG Supporters of OpenWaters NFT Marketplace",
      imageUrl:
        "https://i.ibb.co/vPGDnr8/image.gif",
      pageUrl: "https://openwatersorigin.openwaters.uk/",
      button: "Mint Now"
    },
    {
      type: "New NFT Project",
      title: "BLIZ BIRD CORE",
      description:
        "BLIZZARDCorp. NFT Colection consist of different type, Wild, Gold, Dark and etc.",
      imageUrl:
        "https://cdn.openwaters.uk/collection-profileImage-0x9Ed88F07E16e2caAb800902cF4c7D82635cdd6A0.png",
      pageUrl: "https://www.openwaters.uk/collection/0x9Ed88F07E16e2caAb800902cF4c7D82635cdd6A0",
      button: "Explore"
    },
    {
      type: "Featured NFT Project",
      title: "Moondogs",
      description:
        "Moondogs is a collection of 5555 NFTs, accelerating Web3 innovation through IP utilization and community empowerment.",
      imageUrl:
        "https://cdn.openwaters.uk/collection-profileImage-0x302330B329191324fE83Fa6461A48F2e22406c9D.png",
      pageUrl: "https://www.openwaters.uk/collection/0x302330B329191324fE83Fa6461A48F2e22406c9D",
      button: "Explore"
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
