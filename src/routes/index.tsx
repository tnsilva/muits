import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import {
  Dashboard,
  DetailPeople,
  ListingCities,
  ListingPeople,
} from "../pages";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/home",
        label: "Início",
      },
      {
        icon: "location_city",
        path: "/cities",
        label: "Cidades",
      },
      {
        icon: "people",
        path: "/people",
        label: "Pessoas",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />

      <Route path="/cities" element={<ListingCities />} />
      <Route path="/people" element={<ListingPeople />} />
      <Route path="/people/detail/:id" element={<DetailPeople />} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
