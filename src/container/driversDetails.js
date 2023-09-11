import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue, off } from 'firebase/database';

export const DriversDetails = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState(null); // State to store the driver details

  useEffect(() => {
    // Fetch the drivers data from Firebase rdb
    const database = getDatabase();
    const driversRef = ref(database, 'drivers'); // Use the ref method to reference the 'drivers' node

    const onDataChange = (snapshot) => {
      const drivers = snapshot.val();

      if (drivers) {
        // Find the driver with the matching ID
        const matchedDriver = Object.values(drivers).find((driver) => driver.id === id);

        if (matchedDriver) {
          setDriver(matchedDriver); // Set the matching driver in the state
        }
      }
      console.log(drivers);
    };
    // Set up the Firebase listener for the 'drivers' node
    const driversListener = onValue(driversRef, onDataChange);

    // Cleanup the Firebase listener when the component unmounts
    return () => {
      off(driversRef, 'value', driversListener);
    };
  }, [id]);

  if (!driver) {
    return <div>No details</div>;
  }
  // const stringValue = driversDetails[key].ratings;
  // const numberValue = parseFloat(stringValue).toFixed(1);
  // const formattedValue = numberValue.replace(/\.(\d)$/, '.$1');

  return (
    <div>
      <h1>Driver Details</h1>
      <p>Name: {driver.name}</p>
      <p>Phone Number: {driver.phone}</p>
      <p>Email: {driver.email}</p>

      <div style={{ marginTop: '3rem' }}>
        <h1>Car Details</h1>
        <p>Car Model: {driver.car_details.car_model}</p>
        <p>Plate Number: {driver.car_details.plate_number}</p>
        <p>Car Color: {driver.car_details.car_color}</p>
      </div>
    </div>
  );
};
