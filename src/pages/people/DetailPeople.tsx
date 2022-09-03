import { useNavigate, useParams } from "react-router-dom";
import { DetailTools } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";

export const DetailPeople: React.FC = () => {
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();

  const handleSave = () => {
    console.log("save");
  };

  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <LayoutBasePage
      title="Detalhe de pessoa"
      toolbar={
        <DetailTools
          newButtonText="Nova"
          showSaveAndCloseButton
          showNewButton={id !== "new"}
          showDeleteButton={id !== "new"}
          clickingOnSave={handleSave}
          clickingOnSaveAndClose={handleSave}
          clickingOnDelete={handleDelete}
          clickingOnNew={() => navigate("/people/detail/new")}
          clickingOnBack={() => navigate("/people")}
        />
      }
    >
      Teste
    </LayoutBasePage>
  );
};
