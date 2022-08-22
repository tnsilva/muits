import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";

interface IListingToolsProps {
  searchText?: string;
  showSearchInput?: boolean;
  changingSearchText?: (newText: string) => void;
  newButtonText?: string;
  showNewButton?: boolean;
  clickingOnNew?: () => void;
}

export const ListingTools: React.FC<IListingToolsProps> = ({
  searchText = "",
  changingSearchText,
  showSearchInput = false,
  clickingOnNew,
  newButtonText = "Novo",
  showNewButton = true,
}) => {
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
      {showSearchInput && (
        <TextField
          size="small"
          value={searchText}
          placeholder="Pesquisar"
          onChange={(e) => changingSearchText?.(e.target.value)}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {showNewButton && (
          <Button
            color="primary"
            disableElevation
            variant="contained"
            onClick={clickingOnNew}
            endIcon={<Icon>add</Icon>}
          >
            {newButtonText}
          </Button>
        )}
      </Box>
    </Box>
  );
};
