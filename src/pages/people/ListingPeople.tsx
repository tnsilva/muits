import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ListingTools } from "../../shared/components";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePage } from "../../shared/layouts";
import {
  IListingPeople,
  PeopleService,
} from "../../shared/services/api/people/PeopleService";

export const ListingPeople: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000);
  // const { debounce } = useDebounce(3000, false);

  const [rows, setRows] = useState<IListingPeople[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const search = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PeopleService.getAll(1, search).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);
          setRows(result.data);
          setTotalCount(result.countTotal);
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
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 1, width: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome completo</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>Ações</TableCell>
                <TableCell>{row.fullName}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </LayoutBasePage>
  );
};
