import Link from "next/link";

const hero = () => {
  return (
    <section className="relative pt-20 pb-10 md:pt-32 h-1527">
      <picture className="absolute inset-x-0 top-0 block h-full pointer-events-none -z-10 dark:hidden">
        <img
          src="/images/gradient.jpg"
          alt="gradient"
          className="w-full h-full"
        />
      </picture>
      <picture className="absolute inset-x-0 top-0 hidden pointer-events-none -z-10 dark:block">
        <img
          src="/images/gradient_dark.jpg"
          alt="gradient dark"
          className="w-full h-full"
        />
      </picture>

      <div className="container h-full mx-auto relative">
        <div className="grid items-center h-full gap-4 md:grid-cols-12">
          <div className="flex flex-col items-center justify-center h-full col-span-6 py-10 md:items-start md:py-20 xl:col-span-4">
            <h1 className="mb-6 text-5xl font-bold text-center text-jacarta-700 font-display dark:text-white md:text-left lg:text-6xl xl:text-7xl">
              Claim your NFT Airdrop
            </h1>
            <p className="mb-8 text-lg text-center dark:text-jacarta-200 md:text-left leading-8">
              If you are among the top 10000 participants with the most entry points on our twitter giveaway then you are whitelisted to mint a OpenWaters Origin NFT for free
            </p>
            <div className="flex space-x-4">
              <Link href="https://openwatersorigin.openwaters.uk/">
                <div
                  className={`px-8 py-3 font-semibold text-center text-white transition-all rounded-full bg-accent shadow-accent-volume hover:bg-accent-dark cursor-pointer`}
                >
                  Mint
                </div>
              </Link>
            </div>
          </div>

          {/* <!-- Hero image --> */}
          <div className="col-span-6 xl:col-span-8">
            <div className="relative text-center md:text-left ">
              <img
                src="/images/Logo-White.png"
                alt=""
                className="inline-block w-72 sm:w-full lg:w-[24rem] xl:w-[35rem]"
              />
              {/* <img
                src="/images/hero/3D_elements.png"
                alt=""
                className="animate-fly absolute top-0 "
              /> */}
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 -z-10">
          <p className="text-[100px] leading-[120px] font-bold opacity-[0.01]">
            OpenWaters
          </p>
          <p className="text-[100px] leading-[120px] font-bold opacity-5">
            OpenWaters
          </p>
          <p className="text-[100px] leading-[120px] font-bold opacity-10">
            OpenWaters
          </p>
          <p className="text-[100px] leading-[120px] font-bold opacity-5">
            OpenWaters
          </p>
          <p className="text-[100px] leading-[120px] font-bold opacity-[0.01]">
            OpenWaters
          </p>
        </div>
      </div>
    </section>
  );
};

export default hero;
