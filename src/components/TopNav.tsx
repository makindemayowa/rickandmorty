import {
    AppBar,
    Toolbar,
    Typography
} from '@material-ui/core';

export default function TopNav() {
  return (
    <AppBar position="fixed" color="inherit">
        <Toolbar>
            <Typography variant="h6">
                Rick And Morty
            </Typography>
        </Toolbar>
    </AppBar>
  );
}
