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
  IListingCities,
  CitiesService,
} from "../../shared/services/api/cities/CitiesService";

export const ListingCities: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(3000);
  // const { debounce } = useDebounce(3000, false);
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListingCities[]>([]);
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
      CitiesService.getAll(page, search).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows(result.data);
          setTotalCount(result.countTotal);
        }
      });
    });
  }, [search, page]);

  const handleDelete = (id: number) => {
    if (window.confirm("Realmente deseja apagar?")) {
      CitiesService.deleteById(id).then((result) => {
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

  return (
    <LayoutBasePage
      title="Listagem de cidades"
      toolbar={
        <ListingTools
          showSearchInput
          searchText={search}
          newButtonText="Nova"
          clickingOnNew={() => navigate("/cities/detail/new")}
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
              <TableCell width={100}>A????es</TableCell>
              <TableCell>Nome</TableCell>
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
                    onClick={() => navigate(`/cities/detail/${row.id}`)}
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.name}</TableCell>
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
