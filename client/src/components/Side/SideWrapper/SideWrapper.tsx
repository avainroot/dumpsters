import { useMapStore } from "@/store";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@components/ui/sheet";
import type { PropsWithChildren } from "react";

const SideWrapper = ({ children }: PropsWithChildren) => {
  const { open, sheet, sheetReset } = useMapStore();
  const isEdit = sheet?.mode === "edit";
  return (
    <SheetContent
      onAnimationEnd={() => !open && sheetReset()}
      overlayProps={{
        className: "supports-backdrop-filter:backdrop-blur-none",
      }}
    >
      <SheetHeader>
        <SheetTitle>
          {isEdit ? "Редактировать площадку" : "Добавить площадку"}
        </SheetTitle>
        <SheetDescription>Заполните поля:</SheetDescription>
      </SheetHeader>
      {children}
    </SheetContent>
  );
};

export default SideWrapper;
