import { EXPLORER_URL } from "../../config/env";
import { mainnet, testnet } from "../../config/network";

const Details = ({ nftInfo }: { nftInfo: NFT }) => {
  const network = process.env.NODE_ENV === "production" ? mainnet : testnet;
  return (
    <>
      <div
        className="tab-pane fade"
        id="details"
        role="tabpanel"
        aria-labelledby="details-tab"
      >
        <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-t-2lg rounded-b-2lg rounded-tl-none border bg-white p-6 md:p-10">
          <div className="mb-2 flex items-center">
            <span className="dark:text-jacarta-300 mr-2 min-w-[9rem]">
              Contract Address:
            </span>
            <a
              href={`${EXPLORER_URL}/address/${nftInfo?.collection?.address}`}
              target="_blank"
            >
              <p className="hover:text-accent">
                {nftInfo?.collection?.address}
              </p>
            </a>
          </div>
          <div className="mb-2 flex items-center">
            <span className="dark:text-jacarta-300 mr-2 min-w-[9rem]">
              Token ID:
            </span>
            <a
              href={`${EXPLORER_URL}/token/${nftInfo?.collection?.address}?a=${nftInfo?.tokenId}`}
              target="_blank"
            >
              <p className="hover:text-accent">{nftInfo?.tokenId}</p>
            </a>
          </div>
          <div className="mb-2 flex items-center">
            <span className="dark:text-jacarta-300 mr-2 min-w-[9rem]">
              Token Standard:
            </span>
            <span className="text-jacarta-700 dark:text-white uppercase">
              {nftInfo?.collection?.type}
            </span>
          </div>
          <div className="flex items-center">
            <span className="dark:text-jacarta-300 mr-2 min-w-[9rem]">
              Blockchain:
            </span>
            <span className="text-jacarta-700 dark:text-white">
              {network?.name}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
