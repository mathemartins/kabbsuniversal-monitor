import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDatabase, ref, query, orderByChild, limitToLast, onValue } from 'firebase/database';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography, Divider } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import chartData from './chart-data/bajaj-area-chart';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const BajajAreaChartCard = () => {
  const [lastRideRequest, setLastRideRequest] = useState(null);
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const { navType } = customization;

  useEffect(() => {
    // Fetch the last ride request when the component mounts
    const fetchLastRideRequest = async () => {
      const db = getDatabase();
      const rideRequestsRef = ref(db, 'All Ride Requests');
      const lastRideRequestQuery = query(rideRequestsRef, orderByChild('time'), limitToLast(1));

      onValue(lastRideRequestQuery, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const lastRequestKey = Object.keys(data)[0];
          const lastRequest = data[lastRequestKey];
          setLastRideRequest(lastRequest);
        } else {
          setLastRideRequest(null); // Handle the case where there are no ride requests
        }
      });
    };

    fetchLastRideRequest();

    // Cleanup the Firebase database listener when the component unmounts
    return () => {
      // Unsubscribe from the Firebase database when the component unmounts
      // You may need to store the unsubscribe function in a ref or state variable
    };
  }, []);

  const orangeDark = theme.palette.secondary[800];

  useEffect(() => {
    const newSupportChart = {
      ...chartData.options,
      colors: [orangeDark],
      tooltip: {
        theme: 'light'
      }
    };
    ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
  }, [navType, orangeDark]);

  return (
    <>
      {lastRideRequest ? (
        <Card sx={{ bgcolor: 'secondary.light' }}>
          <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="subtitle2" sx={{ color: theme.palette.secondary.dark }}>
                    PickUp: {lastRideRequest.originAddress}
                  </Typography>
                </Grid>
                <Grid item>
                  <Divider sx={{ my: 1.5 }} />
                  <Typography variant="subtitle2" sx={{ color: theme.palette.secondary.dark }}>
                    DropOff: {lastRideRequest.destinationAddress}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                    ₦{lastRideRequest.fareAmount}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ color: theme.palette.grey[800] }}>
                Driver: {lastRideRequest.driverName} | Phone: {lastRideRequest.driverPhone}
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="subtitle2" sx={{ color: theme.palette.grey[800] }}>
                Rider: {lastRideRequest.username} | Phone: {lastRideRequest.phone}
              </Typography>
            </Grid>
          </Grid>
        <Chart {...chartData} />
      </Card>
      ) : (
        <p>No ride requests available.</p>
      )}
    </>
  );
};

export default BajajAreaChartCard;
