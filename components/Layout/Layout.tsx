import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useAppDispatch } from "../../redux/store";
import { getUser } from "../../redux/userSlice";
import Header from "./Header";
import Footer from "./Footer";
import Wallet_modal from "../modal/wallet_modal";
import BidsModal from "../modal/bidsModal";
import ListModal from "../modal/listModal";
import { apiGetTokenPrice } from "../../utils/api";
import { WOOF_TOKEN_ADDRESS } from "../../config/env";
import { setTokenPrice } from "../../redux/tokenPriceSlice";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { address } = useAccount();
  const dispatch = useAppDispatch();
  const getTokenPrice = async () => {
    try {
      const res = await apiGetTokenPrice(WOOF_TOKEN_ADDRESS);
      dispatch(setTokenPrice({ woofPrice: res }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (address) dispatch(getUser(address));
  }, [address, dispatch]);

  useEffect(() => {
    (async () => await getTokenPrice())();
    setInterval(async () => {
      await getTokenPrice();
    }, 50000);
  }, []);
  return (
    <>
      <Header />
      <Wallet_modal />
      <BidsModal />
      <ListModal />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
