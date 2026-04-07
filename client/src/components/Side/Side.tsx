import { Sheet } from "@components/ui/sheet";
import { useMapStore } from "@/store";
import LocationForm from "./LocationForm/LocationForm";
import { defaultValuesPrepare } from "@lib/utils";
import EditLocation from "./EditLocation/EditLocation";
import SideWrapper from "./SideWrapper/SideWrapper";

const Side = () => {
  const { sheet, open, onOpenChange } = useMapStore();
  const isEdit = sheet?.mode === "edit";
  return (
    <Sheet {...{ open, onOpenChange }}>
      <SideWrapper>
        {isEdit ? (
          <EditLocation locationId={sheet.locationId} />
        ) : (
          <LocationForm
            defaultValues={defaultValuesPrepare(sheet?.coordinates)}
          />
        )}
      </SideWrapper>
    </Sheet>
  );
};

export default Side;
