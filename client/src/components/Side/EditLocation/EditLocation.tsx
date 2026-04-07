import { useQuery } from "@tanstack/react-query";
import LocationForm from "../LocationForm/LocationForm";
import { getLocation } from "@lib/queries";
import { Loader } from "@components";
import { locationTranform } from "@lib/utils";

interface IEditLocation {
  locationId: number;
}

const EditLocation = ({ locationId }: IEditLocation) => {
  const { data, isPending } = useQuery(getLocation(locationId));

  if (isPending) return <Loader />;

  if (!data) return <div>Не удалось получить данные площадки</div>;

  return <LocationForm defaultValues={locationTranform(data)} />;
};

export default EditLocation;
