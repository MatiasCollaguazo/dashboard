import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const popularCities = [
  "Guayaquil",
  "Quito",
  "Cuenca",
  "Santo Domingo",
  "Machala",
  "Manta",
  "Portoviejo",
  "Ambato",
  "Riobamba",
  "Esmeraldas",
  "Ibarra",
];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header({ title, onMenuClick, onSearch }: { title: string, onMenuClick?: () => void, onSearch: (value: string) => void }) {
  const [inputValue, setInputValue] = React.useState("");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ top: 0 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {title}
          </Typography>
          <Search sx={{ position: 'relative', display: 'flex', alignItems: 'center', width: 'auto', maxWidth: '400px' }}>
            <SearchIconWrapper
              sx={{
                position: 'absolute',
                top: '50%',
                left: '0px',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            >
              <SearchIcon />
            </SearchIconWrapper>
            <Autocomplete
              autoHighlight
              freeSolo
              blurOnSelect
              options={popularCities}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                onSearch(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Buscar..."
                  inputProps={{
                    ...params.inputProps,
                    'aria-label': 'search',
                  }}
                  sx={{
                    '& .MuiInputBase-root': {
                      padding: '6px 8px 6px 40px',
                      color: 'white',
                      transition: (theme) => theme.transitions.create('width'),
                      width: '26ch',
                      '&:focus-within': {
                        width: '30ch',
                      },
                    },
                    '& input::placeholder': {
                      color: 'white',
                      opacity: 1,
                    },
                  }}
                />
              )}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
