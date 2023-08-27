// App.js

import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom'; // Import useRoutes

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import MainRoutes from './routes/MainRoutes';
import AuthenticationRoutes from './routes/AuthenticationRoutes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  // Use useRoutes to render the routes
  const routing = useRoutes([MainRoutes, AuthenticationRoutes]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          {routing} {/* Render the routing */}
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
