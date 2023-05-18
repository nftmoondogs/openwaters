import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useAppDispatch } from "../../redux/store";
import { getUser } from "../../redux/userSlice";
import Header from "./Header";
import Footer from "./Footer";
import Wallet_modal from "../modal/wallet_modal";
import BidsModal from "../modal/bidsModal";
import ListModal from "../modal/listModal";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { address } = useAccount();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (address) dispatch(getUser(address));
  }, [address, dispatch]);

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
