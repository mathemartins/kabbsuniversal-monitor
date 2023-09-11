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
    return <div>Loading...</div>;
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
    </div>
  );
};
