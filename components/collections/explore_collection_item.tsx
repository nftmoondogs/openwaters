import CollectionCard from "../CollectionCard";

const Explore_collection_item = ({
  collections,
}: {
  collections: Collection[];
}) => {
  return (
    <>
      {collections &&
        collections.map((collection, index) => {
          return <CollectionCard collection={collection} key={index} />;
        })}
    </>
  );
};

export default Explore_collection_item;
