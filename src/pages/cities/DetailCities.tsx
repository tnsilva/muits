import { Box, LinearProgress, Paper, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailTools } from "../../shared/components";
import { LayoutBasePage } from "../../shared/layouts";
import { CitiesService } from "../../shared/services/api/cities/CitiesService";
import { VForm, VTextField, useVForm, IVFormsErrors } from "../../shared/forms";
import * as yup from "yup";

interface IFormData {
  name: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  name: yup.string().required().min(3),
});

export const DetailCities: React.FC = () => {
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
      CitiesService.getById(Number(id)).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate("/cities");
        } else {
          setName(result.name);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({ name: "" });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((validateData) => {
        setIsLoading(true);

        if (id === "new") {
          CitiesService.create(validateData).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate("/cities");
              } else {
                navigate(`/cities/detail/${result}`);
              }
            }
          });
        } else {
          CitiesService.updateById(Number(id), { id, ...validateData }).then(
            (result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate("/cities");
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
      CitiesService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso.");
          navigate("/cities");
        }
      });
    }
  };

  return (
    <LayoutBasePage
      title={id === "new" ? "Nova cidade" : name}
      toolbar={
        <DetailTools
          newButtonText="Nova"
          showSaveAndCloseButton
          showNewButton={id !== "new"}
          showDeleteButton={id !== "new"}
          clickingOnSave={save}
          clickingOnSaveAndClose={saveAndClose}
          clickingOnBack={() => navigate("/cities")}
          clickingOnDelete={() => handleDelete(Number(id))}
          clickingOnNew={() => navigate("/cities/detail/new")}
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
                  name="name"
                  disabled={isLoading}
                  label="Nome"
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBasePage>
  );
};
