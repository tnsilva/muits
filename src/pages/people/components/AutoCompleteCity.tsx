import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../shared/hooks";
import { CitiesService } from "../../../shared/services/api/cities/CitiesService";
import { TAutoCompleteOption } from "../types";

interface IAutoCompleteCityProps {
  isExternalLoading?: boolean;
}

export const AutoCompleteCity: React.FC<IAutoCompleteCityProps> = ({
  isExternalLoading = false,
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField("cityId");

  const { debounce } = useDebounce();

  const [selectedId, setSelectedId] = useState<number | undefined>(
    defaultValue
  );

  const [options, setOptions] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [registerField, fieldName, selectedId]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CitiesService.getAll(1, search).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          //   alert(result.message);
        } else {
          console.log(result);
          setOptions(
            result.data.map((city) => ({
              id: Number(city.id),
              label: city.name,
            }))
          );
        }
      });
    });
  }, [search]);

  const selectedOption = useMemo(() => {
    if (!selectedId) return null;
    const selected = options.find((option) => option.id === selectedId);
    if (!selectedId) return null;
    return selected;
  }, [selectedId, options]);

  return (
    <Autocomplete
      openText="Abrir"
      closeText="Fechar"
      noOptionsText="Sem opções"
      loadingText="Carregando..."
      disablePortal
      options={options}
      loading={isLoading}
      value={selectedOption}
      disabled={isExternalLoading}
      onInputChange={(_, newValue) => setSearch(newValue)}
      popupIcon={
        isExternalLoading || isLoading ? (
          <CircularProgress size={28} />
        ) : undefined
      }
      onChange={(_, newValue) => {
        setSelectedId(newValue?.id);
        setSearch("");
        clearError();
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          error={!!error}
          helperText={error}
          label="Cidade"
        />
      )}
    />
  );
};
