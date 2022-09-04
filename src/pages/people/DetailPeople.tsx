import {
  Box,
  LinearProgress,
  TextField,
  Paper,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailTools } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { PeopleService } from "../../shared/services/api/people/PeopleService";
import { VForm, VTextField, useVForm, IVFormsErrors } from "../../shared/forms";
import * as yup from "yup";

interface IFormData {
  email: string;
  cityId: number;
  fullName: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  fullName: yup.string().required().min(3),
  email: yup.string().required().email(),
  cityId: yup.number().required(),
});

export const DetailPeople: React.FC = () => {
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();

  const {
    formRef,
    save,
    saveAndClose,
    isSaveAndClose,
    // saveAndNew,
    // isSaveAndNew,
  } = useVForm();

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
    } else {
      formRef.current?.setData({ fullName: "", email: "", cityId: "" });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((validateData) => {
        setIsLoading(true);

        if (id === "new") {
          PeopleService.create(validateData).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate("/people");
              } else {
                navigate(`/people/detail/${result}`);
              }
            }
          });
        } else {
          PeopleService.updateById(Number(id), { id, ...validateData }).then(
            (result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate("/people");
                }
              }
            }
          );
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormsErrors = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
        });
        formRef.current?.setErrors(validationErrors);
      });
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
          clickingOnSave={save}
          clickingOnSaveAndClose={saveAndClose}
          clickingOnBack={() => navigate("/people")}
          clickingOnDelete={() => handleDelete(Number(id))}
          clickingOnNew={() => navigate("/people/detail/new")}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          m={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" p={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}
            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name="fullName"
                  disabled={isLoading}
                  label="Nome completo"
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name="email"
                  label="Email"
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name="cityId"
                  label="Cidade"
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBasePage>
  );
};
