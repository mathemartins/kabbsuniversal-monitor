import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// firebase imports
import { getDatabase, ref, onValue, query, orderByChild } from 'firebase/database';
// import BajajAreaChartCard from 'views/dashboard/Default/BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

export const Trips = ({ isLoading }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [last5Trips, setLast5Trips] = useState([]);

  useEffect(() => {
    // Fetch the last 5 trips when the component mounts
    const fetchLast5Trips = () => {
      const db = getDatabase();
      const rideRequestsRef = ref(db, 'All Ride Requests');
      console.log(rideRequestsRef);
      const allTripsQuery = query(rideRequestsRef, orderByChild('time'));

      onValue(allTripsQuery, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const trips = Object.values(data);
          setLast5Trips(trips); // Set the state with all fetched trips
        } else {
          setLast5Trips([]); // Handle the case where there are no trips
        }
      });
    };

    fetchLast5Trips(); // Call the fetch function
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false} style={{ maxWidth: '700px', margin: 'auto' }}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Trips/Requests</Typography>
                  </Grid>
                  <Grid item>
                    <MoreHorizOutlinedIcon
                      fontSize="small"
                      sx={{
                        color: theme.palette.primary[200],
                        cursor: 'pointer'
                      }}
                      aria-controls="menu-popular-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    />
                    <Menu
                      id="menu-popular-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      <MenuItem onClick={handleClose}> Today</MenuItem>
                      <MenuItem onClick={handleClose}> This Month</MenuItem>
                      <MenuItem onClick={handleClose}> This Year </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: '16px !important' }}>
                {/* <BajajAreaChartCard /> */}
              </Grid>

              <Grid item xs={12}>
                <Grid container direction="column">
                  {last5Trips.map((trip, index) => (
                    <Grid item key={index}>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Typography variant="subtitle1" color="inherit">
                            Driver: {trip.driverName}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                ₦{trip.fareAmount}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Avatar
                                variant="rounded"
                                sx={{
                                  width: 16,
                                  height: 16,
                                  borderRadius: '5px',
                                  backgroundColor: theme.palette.success.light,
                                  color: theme.palette.success.dark,
                                  ml: 2
                                }}
                              >
                                <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                              </Avatar>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Divider sx={{ my: 1.5 }} />
                      <Grid item>
                        <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                          Rider: {trip.username}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2" sx={{ color: theme.palette.orange.dark }}>
                          Destination: {trip.destinationAddress}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
                <Divider sx={{ my: 1.5 }} />
              </Grid>
            </Grid>
          </CardContent>
          {/* <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" disableElevation>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions> */}
        </MainCard>
      )}
    </>
  );
};

Trips.propTypes = {
  isLoading: PropTypes.bool
};
