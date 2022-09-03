import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailTools } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { PeopleService } from "../../shared/services/api/people/PeopleService";

export const DetailPeople: React.FC = () => {
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (id !== "new") {
      setIsLoading(true);
      PeopleService.getById(Number(id)).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate("/people");
        } else {
          setName(result.fullName);
          console.log(result);
        }
      });
    }
  }, [id]);

  const handleSave = () => {
    console.log("save");
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Realmente deseja apagar?")) {
      PeopleService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso.");
          navigate("/people");
        }
      });
    }
  };

  return (
    <LayoutBasePage
      title={id === "new" ? "Nova pessoa" : name}
      toolbar={
        <DetailTools
          newButtonText="Nova"
          showSaveAndCloseButton
          showNewButton={id !== "new"}
          showDeleteButton={id !== "new"}
          clickingOnSave={handleSave}
          clickingOnSaveAndClose={handleSave}
          clickingOnBack={() => navigate("/people")}
          clickingOnDelete={() => handleDelete(Number(id))}
          clickingOnNew={() => navigate("/people/detail/new")}
        />
      }
    >
      {isLoading && <LinearProgress variant="indeterminate" />}
    </LayoutBasePage>
  );
};
