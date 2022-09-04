import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DetailTools, ListingTools } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { CitiesService } from "../../shared/services/api/cities/CitiesService";
import { PeopleService } from "../../shared/services/api/people/PeopleService";

export const Dashboard = () => {
  const [isLoadingPeople, setIsLoadingPeople] = useState(true);
  const [totalCountPeople, setTotalCountPeople] = useState(0);
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [totalCountCities, setTotalCountCities] = useState(0);

  useEffect(() => {
    setIsLoadingPeople(true);

    PeopleService.getAll(1).then((result) => {
      setIsLoadingPeople(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCountPeople(result.countTotal);
      }
    });
  }, [totalCountPeople]);

  useEffect(() => {
    setIsLoadingCities(true);

    CitiesService.getAll(1).then((result) => {
      setIsLoadingCities(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCountCities(result.countTotal);
      }
    });
  }, [totalCountCities]);

  return (
    <LayoutBasePage
      title={"Início"}
      toolbar={<ListingTools showNewButton={false} />}
    >
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de pessoas
                  </Typography>
                  <Box
                    padding={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!isLoadingPeople ? (
                      <Typography variant="h1">{totalCountPeople}</Typography>
                    ) : (
                      <Typography variant="h6">Carregando...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de cidades
                  </Typography>
                  <Box
                    padding={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!isLoadingPeople ? (
                      <Typography variant="h1">{totalCountCities}</Typography>
                    ) : (
                      <Typography variant="h6">Carregando...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBasePage>
  );
};
