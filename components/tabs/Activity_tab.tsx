import Link from "next/link";
import { formatEther } from "viem";

import { formatActivity, shortenAddress } from "../../utils";
import { EXPLORER_URL } from "../../config/env";
import NftComponent from "./NftComponent";

const Activity_tab = ({
  history,
  showItems = false,
}: {
  history: Transaction[];
  showItems?: boolean;
}) => {
  return (
    <>
      {/* <!-- Activity --> */}
      <div
        className="tab-pane fade"
        id="activity"
        role="tabpanel"
        aria-labelledby="activity-tab"
      >
        <div
          role="table"
          className="overflow-y-auto text-sm bg-white border rounded-lg rounded-tl-none scrollbar-custom dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 max-h-72 dark:text-white"
          id="scrollableDiv"
        >
          <div
            className="sticky top-0 flex dark:bg-jacarta-600 bg-light-base w-full"
            role="row"
          >
            <div
              className={`${showItems ? "w-1/12" : "w-1/6"} py-2 px-4`}
              role="columnheader"
            >
              <span className="w-full overflow-hidden text-jacarta-700 dark:text-jacarta-100 text-ellipsis">
                Event
              </span>
            </div>
            {showItems && (
              <div className="w-2/12 py-2 px-4" role="columnheader">
                <span className="w-full overflow-hidden text-jacarta-700 dark:text-jacarta-100 text-ellipsis">
                  Item
                </span>
              </div>
            )}
            <div
              className={`${showItems ? "w-2/12" : "w-1/6"} py-2 px-4`}
              role="columnheader"
            >
              <span className="w-full overflow-hidden text-jacarta-700 dark:text-jacarta-100 text-ellipsis">
                Price
              </span>
            </div>
            <div
              className={`${showItems ? "w-2/12" : "w-1/6"} py-2 px-4`}
              role="columnheader"
            >
              <span className="w-full overflow-hidden text-jacarta-700 dark:text-jacarta-100 text-ellipsis">
                From
              </span>
            </div>
            <div
              className={`${showItems ? "w-2/12" : "w-1/6"} py-2 px-4`}
              role="columnheader"
            >
              <span className="w-full overflow-hidden text-jacarta-700 dark:text-jacarta-100 text-ellipsis">
                To
              </span>
            </div>
            <div
              className={`${showItems ? "w-2/12" : "w-1/6"} py-2 px-4`}
              role="columnheader"
            >
              <span className="w-full overflow-hidden text-jacarta-700 dark:text-jacarta-100 text-ellipsis">
                Date
              </span>
            </div>
            <div
              className={`${showItems ? "w-1/12" : "w-1/6"} py-2 px-4`}
              role="columnheader"
            >
              <span className="w-full overflow-hidden text-jacarta-700 dark:text-jacarta-100 text-ellipsis">
                View
              </span>
            </div>
          </div>
          {history.length > 0 ? (
            history.map((item) => {
              const {
                id,
                price,
                currency,
                from,
                to,
                nft,
                collection,
                eventType,
                timestamp,
                tx,
                createdAt,
              } = item;
              return (
                <div className="flex w-full" role="row" key={id}>
                  <div
                    className={`dark:border-jacarta-600 border-jacarta-100 flex items-center border-t py-4 px-4 ${
                      showItems ? "w-1/12" : "w-1/6"
                    }`}
                    role="cell"
                  >
                    {from?.address ===
                    "0x0000000000000000000000000000000000000000"
                      ? "Mint"
                      : formatActivity(eventType)}
                  </div>
                  {showItems && (
                    <div
                      className={`dark:border-jacarta-600 border-jacarta-100 flex items-center border-t py-4 px-4 ${
                        showItems ? "w-2/12" : "w-1/6"
                      }`}
                      role="cell"
                    >
                      <NftComponent nft={nft} collection={collection} />
                    </div>
                  )}
                  <div
                    className="dark:border-jacarta-600 border-jacarta-100 flex w-1/6 items-center whitespace-nowrap border-t py-4 px-4"
                    role="cell"
                  >
                    {price ? (
                      <>
                        <img
                          src={`/images/tokens/${currency}.png`}
                          alt="icon"
                          className="w-[16px] h-[16px] mr-1 icon"
                        />
                        <span className="text-sm font-medium tracking-tight text-green">
                          {formatEther(BigInt(price))} {currency}
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div
                    className="dark:border-jacarta-600 border-jacarta-100 flex w-1/6 items-center border-t py-4 px-4"
                    role="cell"
                  >
                    <Link href={`/profile/${from?.address}`}>
                      <span className="hover:text-accent cursor-pointer">
                        {from?.name || shortenAddress(from?.address)}
                      </span>
                    </Link>
                  </div>
                  <div
                    className="dark:border-jacarta-600 border-jacarta-100 flex w-1/6 items-center border-t py-4 px-4"
                    role="cell"
                  >
                    <Link href={`/profile/${to?.address}`}>
                      <span className="hover:text-accent cursor-pointer">
                        {to?.name || shortenAddress(to?.address)}
                      </span>
                    </Link>
                  </div>
                  <div className="dark:border-jacarta-600 border-jacarta-100 flex w-1/6 items-center border-t py-4 px-4">
                    {new Date(createdAt).toLocaleString()}
                  </div>
                  <div
                    className={`dark:border-jacarta-600 border-jacarta-100 flex items-center border-t py-4 px-4 ${
                      showItems ? "w-1/12" : "w-1/6"
                    }`}
                    role="cell"
                  >
                    {tx && (
                      <a
                        className="flex flex-wrap items-center hover:text-accent"
                        target="_blank"
                        rel="nofollow noopener"
                        title="Opens in a new window"
                        href={`${EXPLORER_URL}/tx/${tx}`}
                      >
                        <span className="mr-1">View</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="w-4 h-4 fill-current"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Activity_tab;
