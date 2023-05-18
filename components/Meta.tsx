import Head from "next/head";

const Meta = ({ title, keyword, desc }: {title: string, keyword?: string, desc?: string}) => {
  return (
    <div>
      <Head>
        <title>{title} | Moondogs NFT Marketplace</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content={desc} />
        <meta name="keyword" content={keyword} />
      </Head>
    </div>
  );
};

Meta.defaultProps = {
  title: "Moondogs | NFT Marketplace",
  keyword:
    "bitcoin, blockchain, coredao, crypto, crypto collectibles, crypto marketplace, cryptocurrency, digital items, market, nft, nft marketplace, nft next js, NFT react, non-fungible tokens, virtual asset, wallet",
  desc: "The world's first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items.",
};

export default Meta;
