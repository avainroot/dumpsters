import { useQuery } from "@tanstack/react-query";
import Mark from "../Mark/Mark";
import { getLocations } from "@lib/queries";

const Locations = () => {
  const { data } = useQuery(getLocations());
  return data?.map((marker) => <Mark key={marker.id} {...marker} />);
};

export default Locations;
