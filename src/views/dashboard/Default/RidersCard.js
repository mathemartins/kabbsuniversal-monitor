import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// firebase imports
import { getDatabase, ref, onValue, off } from 'firebase/database';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

// ==============================|| DASHBOARD - TOTAL INCOME RIDERS CARD ||============================== //

const RidersCard = ({ isLoading }) => {
    
  const [ridersCount, setRidersCount] = useState(0);
  useEffect(() => {
    // Fetch the riders data from Firebase rdb
    const database = getDatabase();
    const ridersRef = ref(database, 'users'); // Use the ref method to reference the 'drivers' node
  
    const onDataChange = (snapshot) => {
      // Count the number of drivers
      const riders = snapshot.val();
      if (riders) {
        const ridersKeys = Object.keys(riders);
        setRidersCount(ridersKeys.length);
      }
    };
  
    // Set up the Firebase listener for the 'drivers' node
    const ridersListener = onValue(ridersRef, onDataChange);
  
    // Cleanup the Firebase listener when the component unmounts
    return () => {
      off(ridersRef, 'value', ridersListener);
    };
  }, []);

  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      backgroundColor: theme.palette.warning.light,
                      color: theme.palette.warning.dark
                    }}
                  >
                    <StorefrontTwoToneIcon fontSize="inherit" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45
                  }}
                  primary={<Typography variant="h4">{ridersCount}</Typography>}
                  secondary={
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: theme.palette.grey[500],
                        mt: 0.5
                      }}
                    >
                      Total Riders
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

RidersCard.propTypes = {
  isLoading: PropTypes.bool
};

export default RidersCard;
