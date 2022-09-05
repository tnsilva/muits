import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { Login, SideMenu } from "./shared/components";
import {
  AppThemeProvider,
  AuthProvider,
  DrawerProvider,
} from "./shared/contexts";
import "./shared/forms/YupTranslations";

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <DrawerProvider>
            <BrowserRouter>
              <SideMenu>
                <AppRoutes />
              </SideMenu>
            </BrowserRouter>
          </DrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};
