import { ListingTools } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";

export const Dashboard = () => {
  return (
    <LayoutBasePage title={"Início"} toolbar={<ListingTools showSearchInput newButtonText="Novo"/>}>
      Testando
    </LayoutBasePage>
  );
};
