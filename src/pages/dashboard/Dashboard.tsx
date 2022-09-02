import { DetailTools, ListingTools } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";

export const Dashboard = () => {
  return (
    // ListingTools showSearchInput newButtonText="Novo"
    <LayoutBasePage
      title={"Início"}
      toolbar={
        <DetailTools
          showNewButton
          showSaveAndCloseButton
          loadingShowSaveAndCloseButton
          showBackButton={false}
        />
      }
    >
      Testando
    </LayoutBasePage>
  );
};
