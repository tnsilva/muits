import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ListingTools } from "../../shared/components";
import { Environment } from "../../shared/environment";
import { useDebounce } from "../../shared/hooks";
import { LayoutBasePage } from "../../shared/layouts";
import {
  CitiesService,
  IListingCities,
} from "../../shared/services/api/cities/CitiesService";
import {
  IListingPeople,
  PeopleService,
} from "../../shared/services/api/people/PeopleService";

export const ListingPeople: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000);
  // const { debounce } = useDebounce(3000, false);
  const navigate = useNavigate();

  const [cities, setCities] = useState<IListingCities[]>([]);
  const [rows, setRows] = useState<IListingPeople[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const search = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get("page") || "1");
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PeopleService.getAll(page, search).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows(result.data);
          // setRows(result.data.map(r => ({})));
          setTotalCount(result.countTotal);
        }
      });
    });
  }, [search, page]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CitiesService.getAll(1, search).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          //   alert(result.message);
        } else {
          console.log(result);
          setCities(result.data);
        }
      });
    });
  }, [search]);

  const handleDelete = (id: number) => {
    if (window.confirm("Realmente deseja apagar?")) {
      PeopleService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows((oldRows) => {
            return [...rows.filter((oldRow) => Number(oldRow.id) !== id)];
          });
          alert("Registro apagado com sucesso.");
        }
      });
    }
  };

  // const cityPeople = useMemo(() => {
  //   if (!cities) return null;
  //   const cit = options.find((option) => option.id === selectedId);
  //   if (!selectedId) return null;
  //   return selected;
  // }, [selectedId, options]);

  return (
    <LayoutBasePage
      title="Listagem de pessoas"
      toolbar={
        <ListingTools
          showSearchInput
          searchText={search}
          newButtonText="Nova"
          clickingOnNew={() => navigate("/people/detail/new")}
          changingSearchText={(text) =>
            setSearchParams({ search: text, page: "1" }, { replace: true })
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
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome completo</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Cidade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(Number(row.id))}
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/people/detail/${row.id}`)}
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.fullName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.EMPTY_LISTING}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}

            {totalCount > 0 && totalCount > Environment.LINE_LIMIT && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={page}
                    count={Math.ceil(totalCount / Environment.LINE_LIMIT)}
                    onChange={(_, newPage) =>
                      setSearchParams(
                        { search, page: newPage.toString() },
                        { replace: true }
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBasePage>
  );
};
