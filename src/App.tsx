import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { SideMenu } from "./shared/components";
import { AppThemeProvider, DrawerProvider } from "./shared/contexts";
import "./shared/forms/YupTranslations";

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <SideMenu>
            <AppRoutes />
          </SideMenu>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
