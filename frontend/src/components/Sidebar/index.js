import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import SidebarContent from './SidebarContent';
import { AppBar, IconButton, styled, Toolbar, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import colors from '../../constants/colors';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  React.useEffect(() => {
    setMobileOpen(true)
  }, [location]);

  return (
    <Box
      component="nav"
      sx={{ display: 'flex' }}
    >
      <AppBar component="nav" sx={{ backgroundColor: '#000' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { sm: 'flex' } }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{}}
            >
              <FontAwesomeIcon icon={faBars} style={{ color: colors.dark.primary, fontSize: 30 }} />
            </IconButton>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        container={container}
        variant="persistent"
        open={!mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        className="drawerSidebar"
        PaperProps={{
          sx: {
            backgroundColor: "#313131",
            color: "#fff",
          }
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <DrawerHeader>
          <span style={{marginRight: 'auto', fontWeight: 'bold'}}>UpforceTech Test</span>
          <IconButton onClick={handleDrawerToggle}>
            <FontAwesomeIcon icon={faAngleLeft} style={{ color: colors.dark.primary, fontSize: 30 }} />
          </IconButton>
        </DrawerHeader>
        <SidebarContent />
      </Drawer>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
