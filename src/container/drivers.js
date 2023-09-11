import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { Link } from 'react-router-dom';

export const Drivers = () => {
  const [driverCount, setDriverCount] = useState(0);
  const [driversDetails, setDriversDetails] = useState(0);

  useEffect(() => {
    // Fetch the drivers data from Firebase rdb
    const database = getDatabase();
    const driversRef = ref(database, 'drivers'); // Use the ref method to reference the 'drivers' node
    console.log(driversRef);
    const onDataChange = (snapshot) => {
      // Count the number of drivers
      const drivers = snapshot.val();
      setDriversDetails(drivers);
      // console.log(drivers);
      if (drivers) {
        const driverKeys = Object.keys(drivers);
        setDriverCount(driverKeys);
      }
    };

    // Set up the Firebase listener for the 'drivers' node
    const driversListener = onValue(driversRef, onDataChange);

    // Cleanup the Firebase listener when the component unmounts
    return () => {
      off(driversRef, 'value', driversListener);
    };
  }, []);

  const names = Object.keys(driversDetails).map((key) => driversDetails[key].name);

  console.log(driverCount, names);

  return (
    <div style={{}}>
      <table style={{ border: '1px solid #BFC0C2', background: '#fff', width: '100%' }}>
        <thead>
          <tr
            style={{
              borderBottom: 'solid 3px blue',
              background: '#EDE6F6',
              color: '#673AB6',
              fontWeight: 'bold',
              marginLeft: '0px',
              marginRight: '0px'
            }}
          >
            <th style={{ width: '5%', paddingTop: '5px', paddingBottom: '5px' }}>S/N</th>

            <th style={{ width: '30%', paddingTop: '5px', paddingBottom: '5px' }}>Name</th>
            <th style={{ width: '20%', paddingTop: '5px', paddingBottom: '5px' }}>Phone Number</th>
            <th style={{ width: '20%', paddingTop: '5px', paddingBottom: '5px' }}>Trip Count</th>

            <th style={{ paddingTop: '5px', paddingBottom: '5px' }}>Earnings</th>
            <th style={{ width: '5%', paddingTop: '5px', paddingBottom: '5px' }}>Status</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>

        {/* <tr>Heloooo</tr>
          <tr>Heloooos</tr> */}
        <tbody style={{}}>
          {Object.keys(driversDetails).map((key, index) => {
            const driver = driversDetails[key];
            const serialNumber = index + 1; // Calculate the serial number

            const stringValue = driversDetails[key].ratings;
            const numberValue = parseFloat(stringValue).toFixed(1); // converts the rating to 2 decimal place
            const formattedValue = numberValue.replace(/\.(\d)$/, '.$1'); // regex string manipulation .. converts string to number

            return (
              <>
                {/* {driversDetails[key].name} */}

                <tr style={{}}>
                  <td style={{ textAlign: 'center', paddingBottom: '1rem' }}>{serialNumber}</td>
                  <td style={{ textAlign: 'center', paddingBottom: '1rem', cursor: 'pointer', color: '#673AB6' }}>
                    <Link to={`/dashboard/drivers/${driversDetails[key].id}`}>{driversDetails[key].name} </Link>
                  </td>
                  <td style={{ textAlign: 'center', paddingBottom: '1rem' }}>{driversDetails[key].phone}</td>
                  <td style={{ textAlign: 'center', paddingBottom: '1rem' }}>
                    {typeof driver.tripHistory === 'object' && driver.tripHistory !== null ? Object.keys(driver.tripHistory).length : 0}
                  </td>
                  <td style={{ textAlign: 'center', paddingBottom: '1rem' }}>{driversDetails[key].ratings ? formattedValue : 0}</td>
                  <td style={{ textAlign: 'center', paddingBottom: '1rem' }}>
                    {driversDetails[key].newRideStatus ? driversDetails[key].newRideStatus : 'idle'}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
        {/* {data.map((item, index) => (
            <tr key={index}>
              <td>{item.column1Data}</td>
              <td>{item.column2Data}</td>
             
            </tr>
          ))} */}
      </table>
    </div>
  );
};
