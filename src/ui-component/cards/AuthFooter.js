// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://kabbsuniversal.com" target="_blank" underline="hover">
      KABBS Universal
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://kabbsuniversal.com" target="_blank" underline="hover">
      &copy; kabbsuniversal.com
    </Typography>
  </Stack>
);

export default AuthFooter;
