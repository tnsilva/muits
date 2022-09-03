import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface IDetailToolsProps {
  newButtonText?: string;

  showNewButton?: boolean;
  showBackButton?: boolean;
  showDeleteButton?: boolean;
  showSaveButton?: boolean;
  showSaveAndCloseButton?: boolean;

  loadingShowNewButton?: boolean;
  loadingShowBackButton?: boolean;
  loadingShowDeleteButton?: boolean;
  loadingShowSaveButton?: boolean;
  loadingShowSaveAndCloseButton?: boolean;

  clickingOnNew?: () => void;
  clickingOnBack?: () => void;
  clickingOnDelete?: () => void;
  clickingOnSave?: () => void;
  clickingOnSaveAndClose?: () => void;
}

export const DetailTools: React.FC<IDetailToolsProps> = ({
  newButtonText = "Novo",

  showNewButton = true,
  showBackButton = true,
  showDeleteButton = true,
  showSaveButton = true,
  showSaveAndCloseButton = false,

  loadingShowNewButton = false,
  loadingShowBackButton = false,
  loadingShowDeleteButton = false,
  loadingShowSaveButton = false,
  loadingShowSaveAndCloseButton = false,

  clickingOnNew,
  clickingOnBack,
  clickingOnDelete,
  clickingOnSave,
  clickingOnSaveAndClose,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const theme = useTheme();

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      {showSaveButton && !loadingShowSaveButton && (
        <Button
          color="primary"
          disableElevation
          variant="contained"
          startIcon={<Icon>save</Icon>}
          onClick={clickingOnSave}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar
          </Typography>
        </Button>
      )}

      {loadingShowSaveButton && <Skeleton width={110} height={60} />}

      {showSaveAndCloseButton &&
        !loadingShowSaveAndCloseButton &&
        !smDown &&
        !mdDown && (
          <Button
            color="primary"
            disableElevation
            variant="outlined"
            startIcon={<Icon>save</Icon>}
            onClick={clickingOnSaveAndClose}
          >
            <Typography
              variant="button"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              Salvar e fechar
            </Typography>
          </Button>
        )}

      {loadingShowSaveAndCloseButton && !smDown && !mdDown && (
        <Skeleton width={180} height={60} />
      )}

      {showDeleteButton && !loadingShowDeleteButton && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>delete</Icon>}
          onClick={clickingOnDelete}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Apagar
          </Typography>
        </Button>
      )}

      {loadingShowDeleteButton && <Skeleton width={110} height={60} />}

      {showNewButton && !loadingShowNewButton && !smDown && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>add</Icon>}
          onClick={clickingOnNew}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {newButtonText}
          </Typography>
        </Button>
      )}

      {loadingShowNewButton && !smDown && <Skeleton width={110} height={60} />}

      {showBackButton &&
        (showNewButton ||
          showDeleteButton ||
          showBackButton ||
          showSaveAndCloseButton) && (
          <Divider variant="middle" orientation="vertical" />
        )}

      {showBackButton && !loadingShowBackButton && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>arrow_back</Icon>}
          onClick={clickingOnBack}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Voltar
          </Typography>
        </Button>
      )}

      {loadingShowBackButton && <Skeleton width={110} height={60} />}
    </Box>
  );
};
