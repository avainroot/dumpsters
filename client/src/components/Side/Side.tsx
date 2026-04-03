import { Sheet } from "@components/ui/sheet";
import { useMapStore } from "@/store";
import CreateLocation from "./CreateLocation/CreateLocation";
// import EditLocation from "./EditLocation/EditLocation";

const Side = () => {
  const { sheet, close } = useMapStore();
  return (
    <Sheet
      open={sheet !== null}
      onOpenChange={(open) => !open && close()}
      modal={false}
    >
      <CreateLocation />
      {/* <EditLocation /> */}
    </Sheet>
  );
};

export default Side;
