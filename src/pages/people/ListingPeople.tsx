import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ListingTools } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePage } from "../../shared/layouts";
import { PeopleService } from "../../shared/services/api/people/PeopleService";

export const ListingPeople: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000);
  // const { debounce } = useDebounce(3000, false);

  const search = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  useEffect(() => {
    debounce(() => {
      PeopleService.getAll(1, search).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);
        }
      });
    });
  }, [search]);

  return (
    <LayoutBasePage
      title="Listagem de pessoas"
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
