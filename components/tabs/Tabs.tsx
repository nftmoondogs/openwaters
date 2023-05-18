import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useNetwork, useToken } from "wagmi";

import { apiGetNftMetadata } from "../../utils/api";

import OfferTab from "./OfferTab";
import Activity_tab from "./Activity_tab";
import Properties from "./Properties";
import Details from "./Details";

const ItemsTabs = ({
  offers,
  nftHistory,
  nftInfo,
}: {
  offers: GetOfferResponse;
  nftHistory: Transaction[];
  nftInfo: NFT;
}) => {
  const [tabsActive, setTabsActive] = useState(1);
  const [metadataInfo, setMetadataInfo] = useState<any>();
  const { chain } = useNetwork();
  const tabsHeadText = [
    // {
    //   id: 1,
    //   text: "Offers",
    //   icon: "offers",
    // },
    {
      id: 2,
      text: "Properties",
      icon: "properties",
    },
    {
      id: 3,
      text: "Details",
      icon: "details",
    },
    {
      id: 4,
      text: "Activities",
      icon: "activity",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        if (nftInfo?.metaData) {
          setMetadataInfo(JSON.parse(nftInfo.metaData));
        } else {
          if (
            nftInfo?.metadataUrl &&
            nftInfo?.collection?.address &&
            nftInfo?.tokenId !== undefined
          ) {
            const res = await apiGetNftMetadata(
              nftInfo.metadataUrl,
              nftInfo.collection.address,
              nftInfo.tokenId
            );
            setMetadataInfo(res);
          }
        }
      } catch (error) {}
    })();
  }, [nftInfo]);

  return (
    <>
      <div className="overflow-x-auto rounded-lg scrollbar-custom mt-14">
        {/* <!-- Tabs Nav --> */}
        <Tabs className="min-w-fit tabs">
          <TabList className="flex items-center nav nav-tabs">
            {/* <!-- Offers --> */}
            {tabsHeadText?.map(({ id, text, icon }) => {
              return (
                <Tab className="bg-transparent nav-item" key={id}>
                  <button
                    className={
                      tabsActive === id
                        ? "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white active"
                        : "nav-link hover:text-jacarta-700 text-jacarta-400 relative flex items-center whitespace-nowrap py-3 px-6 dark:hover:text-white"
                    }
                    onClick={() => setTabsActive(id)}
                  >
                    <svg className="w-5 h-5 mr-1 fill-current icon">
                      <use xlinkHref={`/icons.svg#icon-${icon}`}></use>
                    </svg>
                    <span className="text-base font-medium font-display">
                      {text}
                    </span>
                  </button>
                </Tab>
              );
            })}
          </TabList>

          {/* <TabPanel>
            <OfferTab offers={offers} nftInfo={nftInfo} />
          </TabPanel> */}
          <TabPanel>
            <Properties properties={metadataInfo?.attributes} />
          </TabPanel>
          <TabPanel>
            <Details nftInfo={nftInfo} />
          </TabPanel>
          <TabPanel>
            <Activity_tab history={nftHistory} />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default ItemsTabs;
