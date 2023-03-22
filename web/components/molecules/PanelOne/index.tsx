import MapCard from "@web/components/atoms/MapCard";

const PanelOne = () => {
  function handleClick() {
    console.log("Map clicked!");
  }
  return (
    <>
      <MapCard
        onClick={handleClick}
        imgLink="https://wallpapers.com/images/hd/detailed-political-world-map-4k-95i988u3vfbyn93b.jpg"
        title="map 1"
        desc="desc map 1"
        padding="8px"
      />
      <MapCard
        padding="0px 8px 8px 8px"
        onClick={handleClick}
        imgLink="https://wallpapers.com/images/hd/detailed-political-world-map-4k-95i988u3vfbyn93b.jpg"
        title="map 2"
        desc="desc map 2"
      />
    </>
  );
};

export default PanelOne;
