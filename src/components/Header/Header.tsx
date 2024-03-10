import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = () => {
  return (
    <AppBar position="absolute">
    <Toolbar>
      <Typography variant="h6">Books library</Typography>
    </Toolbar>
  </AppBar>
  );
};

export default Header;
