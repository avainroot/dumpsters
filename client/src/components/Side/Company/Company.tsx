import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@components/ui/combobox";
import { getCompanies } from "@lib/queries";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import CreateCompany from "./CreateCompany";

const Company = ({
  value,
  onChange,
  error,
}: {
  value: number | null;
  onChange: (value: number | null) => void;
  error?: boolean;
}) => {
  const { data } = useQuery(getCompanies());

  const companies = useMemo(() => {
    if (!data) return [];
    return data.map(({ name }) => name);
  }, [data]);

  const selectedValue = useMemo(
    () => data?.find(({ id }) => id === value)?.name || null,
    [value, data],
  );

  const handleSelect = (v: string | null) => {
    const companyId = data?.find(({ name }) => name === v)?.id || null;
    onChange(companyId);
  };

  return (
    <div className="flex items-center gap-1">
      <Combobox
        items={companies}
        value={selectedValue}
        onValueChange={handleSelect}
      >
        <ComboboxInput
          placeholder="Выберите управляющую компанию"
          aria-invalid={error}
          className="flex-1"
        />
        <ComboboxContent>
          <ComboboxEmpty>Компаний не найдено</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      <CreateCompany onCreate={onChange} />
    </div>
  );
};

export default Company;
