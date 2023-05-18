import Link from "next/link";
import React from "react";
import { items_Properties_data } from "../../data/items_tabs_data";

type Properties = {
  trait_type: string;
  value: string;
};

const Properties = ({ properties }: { properties: [] }) => {
  return (
    <>
      {/* <!-- Properties --> */}
      <div
        className="tab-pane fade"
        id="properties"
        role="tabpanel"
        aria-labelledby="properties-tab"
      >
        <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-t-2lg rounded-b-2lg rounded-tl-none border bg-white p-6 md:p-10">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
            {properties?.map((item, index) => {
              const { trait_type, value } = item;
              return (
                <div className="cursor-pointer dark:bg-jacarta-800 dark:border-jacarta-600 bg-light-base rounded-2lg border-jacarta-100 flex flex-col space-y-2 border p-5 text-center transition-shadow hover:shadow-lg">
                  <span className="dark:text-jacarta-300 text-sm uppercase">
                    {trait_type}
                  </span>
                  <span className="text-base dark:text-white">{value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Properties;
