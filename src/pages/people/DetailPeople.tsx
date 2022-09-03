import { LinearProgress, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailTools } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { PeopleService } from "../../shared/services/api/people/PeopleService";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { VTextField } from "../../shared/forms";

interface IFormData {
  email: string;
  cityId: number;
  fullName: string;
}

export const DetailPeople: React.FC = () => {
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

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
          formRef.current?.setData(result);
        }
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    setIsLoading(true);

    if (id === "new") {
      PeopleService.create(dados).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate(`/people/detail/${result}`);
        }
      });
    } else {
      PeopleService.updateById(Number(id), { id, ...dados }).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        }
      });
    }
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
          clickingOnBack={() => navigate("/people")}
          clickingOnDelete={() => handleDelete(Number(id))}
          clickingOnNew={() => navigate("/people/detail/new")}
          clickingOnSave={() => formRef.current?.submitForm()}
          clickingOnSaveAndClose={() => formRef.current?.submitForm()}
        />
      }
    >
      {/* {isLoading && <LinearProgress variant="indeterminate" />} */}
      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField placeholder="Nome completo" name="fullName" />
        <VTextField placeholder="Email" name="email" />
        <VTextField placeholder="Cidade" name="cityId" />
      </Form>
    </LayoutBasePage>
  );
};
