import Link from "next/link";
import { footerMenuList, socialIcons } from "../../data/footer_data";

const Footer = () => {
  return (
    <>
      {/* <!-- Footer --> */}

      <footer className="bg-white dark:bg-jacarta-900 page-footer">
        <div className="container">
          <div className="grid grid-cols-6 pt-24 pb-12 gap-x-7 gap-y-14 md:grid-cols-12">
            <div className="col-span-3 md:col-span-4">
              {/* <!-- Logo --> */}
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
              <p className="my-6 dark:text-jacarta-300">
                By NFT people, for NFT people
              </p>

              {/* <!-- Socials --> */}
              <div className="flex space-x-5">
                {socialIcons?.map((item) => {
                  const { id, href, text } = item;
                  return (
                    <a href={href} key={id} target="_blank">
                      <img src={`/svg/${text}.svg`} className="w-[24px]"/>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* {footerMenuList?.map((single) => (
              <div
                className={`col-span-full sm:col-span-3 md:col-span-2 ${single.diffClass}`}
                key={single.id}
              >
                <h3 className="mb-6 text-sm font-display text-jacarta-700 dark:text-white">
                  {single.title}
                </h3>
                <ul className="flex flex-col space-y-1 dark:text-jacarta-300">
                  {single.list?.map((item) => {
                    const { id, href, text } = item;
                    return (
                      <li key={id}>
                        <Link href={href}>{text}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))} */}
          </div>

          <div className="flex flex-col items-center justify-between py-8 space-y-2 sm:flex-row sm:space-y-0">
            <span className="text-sm dark:text-jacarta-400">
              <span>© {new Date().getFullYear()} Moondogs</span>
            </span>

            <ul className="flex flex-wrap space-x-4 text-sm dark:text-jacarta-400">
              <li>
                <Link href="/#">Terms and conditions</Link>
              </li>
              <li>
                <Link href="/#">Privacy policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
