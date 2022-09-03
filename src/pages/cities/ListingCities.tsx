import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ListingTools } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";

export const ListingCities: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  useEffect(() => {
    
  }, []);

  return (
    <LayoutBasePage
      title="Listagem de cidades"
      toolbar={
        <ListingTools
          showSearchInput
          searchText={search}
          newButtonText="Nova"
          changingSearchText={(text) =>
            setSearchParams({ busca: text }, { replace: true })
          }
        />
      }
    ></LayoutBasePage>
  );
};
