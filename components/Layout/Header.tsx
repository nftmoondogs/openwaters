import Link from "next/link";
import { useRouter } from "next/router";
import { isPageActive } from "../../utils";
import { useEffect, useState } from "react";
import WalletButton from "../wallet-btn/WalletButton";
import DarkMode from "../mode/DarkMode";

export const Header = () => {
  const [toggle, setToggle] = useState(false);

  // window resize
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        setToggle(false);
      }
    });
  });

  const route = useRouter();
  /* -------------------------------------------------------------------------- */
  /*                            dynamic navigation                              */
  /* -------------------------------------------------------------------------- */
  const menu = [
    {
      id: 1,
      name: "On Sale",
      path: "/on-sale",
    },
    {
      id: 2,
      name: "Explore",
      path: "/collection",
    },
  ];

  return (
    <>
      {/* main desktop menu start*/}
      <header className="fixed top-0 z-20 w-full transition-colors js-page-header backdrop-blur">
        <div className="flex items-center justify-between px-6 py-6 xl:px-24">
          <Link className="shrink-0" href="/">
            <div>
              <img
                src={`/images/logo_light.png`}
                alt="Moondogs | NFT Marketplace"
                className="h-[40px] cursor-pointer dark:hidden"
              />
              <img
                src={`/images/logo_dark.png`}
                alt="Moondogs | NFT Marketplace"
                className="h-[40px] cursor-pointer hidden dark:block"
              />
            </div>
          </Link>
          {/* End  logo */}

          <form
            action="search"
            className="relative ml-12 mr-8 hidden basis-3/12 lg:block xl:ml-[8%]"
          >
            <input
              type="search"
              className="text-jacarta-700 placeholder-jacarta-500 focus:ring-accent border-jacarta-100 w-full rounded-2xl border py-[0.6875rem] px-4 pl-10 dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
              placeholder="Search"
            />
            <span className="absolute top-0 left-0 flex items-center justify-center w-12 h-full rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                className="w-4 h-4 fill-jacarta-500 dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
              </svg>
            </span>
          </form>
          {/* End Desktop search form */}

          <div className="fixed inset-0 z-10 items-center hidden ml-auto bg-white opacity-0 dark:bg-jacarta-800 lg:visible lg:relative lg:inset-auto lg:flex lg:bg-transparent lg:opacity-100 dark:lg:bg-transparent">
            <nav className="w-full">
              <ul className="flex flex-col lg:flex-row">
                {/* explore */}
                {menu.map((item, index) => (
                  <li
                    className="relative js-nav-dropdown nav-item dropdown group"
                    key={index}
                  >
                    <Link href={item.path}>
                      <button className="dropdown-toggle text-jacarta-700 font-display hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent flex items-center justify-between py-3.5 text-base dark:text-white lg:px-5 w-full">
                        <span
                          className={
                            isPageActive(item.path, route.asPath)
                              ? "text-accent dark:text-accent"
                              : ""
                          }
                        >
                          {item.name}
                        </span>
                        <i className="lg:hidden">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width={24}
                            height={24}
                            className="w-4 h-4 dark:fill-white"
                          >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
                          </svg>
                        </i>
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {/* End menu for desktop */}

            {/* End header right content (metamask and other) for desktop */}
          </div>
          <div className="items-center ml-8 flex xl:ml-12">
            <WalletButton />
            {/* End metamask Wallet */}

            <DarkMode />
            <button
              className="js-mobile-toggle border-jacarta-100 hover:bg-accent dark:hover:bg-accent focus:bg-accent group ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15] lg:hidden"
              aria-label="open mobile menu"
              onClick={() => setToggle(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                className="w-4 h-4 transition-colors fill-jacarta-700 group-hover:fill-white group-focus:fill-white dark:fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M18 18v2H6v-2h12zm3-7v2H3v-2h18zm-3-7v2H6V4h12z" />
              </svg>
            </button>
          </div>
          {/* header menu content end for desktop */}
        </div>
        {/* End flex item */}
      </header>
      {/* main desktop menu end */}

      {/* start mobile menu and it's other materials  */}
      <div
        className={`lg:hidden js-mobile-menu dark:bg-jacarta-800 invisible fixed inset-0 z-20 ml-auto items-center bg-white opacity-0 lg:visible lg:relative lg:inset-auto lg:bg-transparent lg:opacity-100 dark:lg:bg-transparent ${
          toggle ? "nav-menu--is-open" : "hidden"
        }`}
      >
        <div className="fixed left-0 z-10 flex items-center justify-between w-full p-6 bg-white t-0 dark:bg-jacarta-800 lg:hidden">
          <button onClick={() => setToggle(false)}>
            <Link className="shrink-0" href="/">
              <div>
                <img
                  src={`/images/logo_light.png`}
                  alt="Moondogs | NFT Marketplace"
                  className="h-[40px] cursor-pointer dark:hidden"
                />
                <img
                  src={`/images/logo_dark.png`}
                  alt="Moondogs | NFT Marketplace"
                  className="h-[40px] cursor-pointer hidden dark:block"
                />
              </div>
            </Link>
          </button>
          <button
            className="js-mobile-close border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent ml-2 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
            onClick={() => setToggle(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              className="w-4 h-4 transition-colors fill-jacarta-700 group-hover:fill-white group-focus:fill-white dark:fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
            </svg>
          </button>
        </div>
        {/* mobile menu top header content */}

        <form action="search" className="relative w-full mt-24 mb-8 lg:hidden">
          <input
            type="search"
            className="text-jacarta-700 placeholder-jacarta-500 focus:ring-accent border-jacarta-100 w-full rounded-2xl border py-3 px-4 pl-10 dark:border-transparent dark:bg-white/[.15] dark:text-white dark:placeholder-white"
            placeholder="Search"
          />
          <span className="absolute top-0 left-0 flex items-center justify-center w-12 h-full rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              className="w-4 h-4 fill-jacarta-500 dark:fill-white"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
            </svg>
          </span>
        </form>
        {/* End search form mobile menu  */}

        <nav className="w-full navbar">
          <ul className="flex flex-col lg:flex-row">
            {menu.map((item, index) => (
              <li
                className="relative js-nav-dropdown nav-item dropdown group"
                key={index}
              >
                <button
                  onClick={() => setToggle(false)}
                  className="dropdown-toggle text-jacarta-700 font-display hover:text-accent focus:text-accent dark:hover:text-accent dark:focus:text-accent flex items-center justify-between py-3.5 text-base dark:text-white lg:px-5 w-full"
                >
                  <Link href={item.path}>
                    <span>{item.name}</span>
                  </Link>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {/* End navbar mobile menu  */}
      </div>
    </>
  );
};

export default Header;
