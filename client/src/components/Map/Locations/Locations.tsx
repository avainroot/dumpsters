import useLocations from "@hooks/useLocations";
import Mark from "../Mark/Mark";

const Locations = () => {
  const { locations } = useLocations();
  return locations.map((marker) => <Mark key={marker.id} {...marker} />);
};

export default Locations;
