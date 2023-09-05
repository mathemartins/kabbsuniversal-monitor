import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, Divider } from '@mui/material';
import { gridSpacing } from 'store/constant';

import Autocomplete from '@mui/material/Autocomplete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'; 
import MenuItem from '@mui/material/MenuItem';

const FormContainer = styled('div')({
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  textAlign: 'center',
});

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

const banksInNigeria = [
  'AMJU Unique Microfinance',
  'Fidelity Bank',
  'Access Bank',
  'Zenith Bank',
  'Guaranty Trust Bank (GTB)',
  'First Bank of Nigeria',
  'United Bank for Africa (UBA)',
  'Ecobank Nigeria',
  'Union Bank of Nigeria',
  'Sterling Bank',
  'Wema Bank',
  'Stanbic IBTC Bank',
  'Standard Chartered Bank',
  'Citibank Nigeria',
  'Polaris Bank',
  'Heritage Bank',
  'Keystone Bank',
  'Providus Bank',
  'Titan Trust Bank',
  'SunTrust Bank',
  'Globus Bank',
  'Jaiz Bank',
  'Rand Merchant Bank (RMB)',
  'KUDA Microfinance',
  'Palmpay'
];

const statesInNigeria = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT (Abuja)',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
];


const UploadInput = styled('input')({
  display: 'none',
});

const ProfilePictureLabel = styled('label')({
  cursor: 'pointer',
  backgroundColor: '#2196F3',
  color: 'white',
  padding: '10px',
  borderRadius: '5px',
  textAlign: 'center',
  '&:hover': {
    backgroundColor: '#1976D2',
  },
});

const ProfilePicturePreview = styled('img')({
  maxWidth: '100px',
  maxHeight: '100px',
  objectFit: 'cover',
  borderRadius: '50%',
  margin: '10px auto',
});

import firebase from 'firebase/compat/app'; // Import firebase using the compat version
import 'firebase/compat/auth';

import { getDatabase, ref, push } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCn2tSTHL6OuA81-nmSNBD_6UJ7vqfnmBI",
  authDomain: "kabbsuniversal-6efda.firebaseapp.com",
  databaseURL: "https://kabbsuniversal-6efda-default-rtdb.firebaseio.com",
  projectId: "kabbsuniversal-6efda",
  storageBucket: "kabbsuniversal-6efda.appspot.com",
  messagingSenderId: "149772945905",
  appId: "1:149772945905:web:b92b928062231bf263dc50",
  measurementId: "G-29JX5K8EVJ",
};


const app = firebase.initializeApp(firebaseConfig);
const db = getDatabase(app);
const driversRef = ref(db, 'drivers');

export const RegisteredDrivers = ({ isLoading }) => {
  const [currentTab, setCurrentTab] = useState(1);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const [driverInfo, setDriverInfo] = useState({
    email: '',
    fullName: '',
    phoneNumber: '',
    address: '',
    state: '',
  });

  const [vehicleInfo, setVehicleInfo] = useState({
    carColor: '',
    carModel: '',
    plateNumber: '',
    kabbsType: '',
    accountNumber: '',
    accountName: '',
    selectedBank: null,
    driverLicense: '',
    otherVehicleDocs: '',
    profilePicture: null,
  });

  // Error state for validation
  const [errors, setErrors] = useState({
    email: '',
    fullName: '',
    phoneNumber: '',
  });

  const theme = useTheme();

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setVehicleInfo({
          ...vehicleInfo,
          profilePicture: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const handleSubmitDriverInfo = (e) => {
    e.preventDefault();
    // Validation before submission for driver info
    validateEmail(driverInfo.email);
    validateFullName(driverInfo.fullName);
    validatePhoneNumber(driverInfo.phoneNumber);

    // If driver info is valid, move to the next tab
    if (!errors.email && !errors.fullName && !errors.phoneNumber) {
      handleTabChange(2);
    }
  };

  const handleSubmitVehicleInfo = (e) => {
    e.preventDefault();
    // Validation before submission for vehicle info
    // Implement validation for vehicle fields if needed

    // If vehicle info is valid, move to the final tab
    handleTabChange(3);
  };
  
  const registerNewDriver = () => {
    const newDriverData = {
      car_details: {
        car_color: vehicleInfo.carColor,
        car_model: vehicleInfo.carModel,
        plate_number: vehicleInfo.plateNumber,
        type: vehicleInfo.kabbsType,
        license: vehicleInfo.driverLicense,
        other_docs: vehicleInfo.otherVehicleDocs,
      },
      finance: {
        bank_name: vehicleInfo.selectedBank,
        bank_account_number: vehicleInfo.accountNumber,
        bank_account_name: vehicleInfo.accountName,
      },
      email: driverInfo.email,
      name: driverInfo.fullName,
      phone: driverInfo.phoneNumber,
      address: driverInfo.address,
      state: driverInfo.state,
    };

    // Push the new driver data to the 'drivers' ref, which will automatically generate a unique key
    push(driversRef, newDriverData)
      .then((newDriverRef) => {
        // newDriverRef.key contains the auto-generated UID for the new driver
        const newDriverUID = newDriverRef.key;
        console.log('New Driver UID:', newDriverUID);

        // Reset the form or perform any other necessary actions
        // Show success notification
        setSuccessSnackbarOpen(true);

        setDriverInfo({
          email: '',
          fullName: '',
          phoneNumber: '',
          address: '',
          state: '',
        });

        setVehicleInfo({
          carColor: '',
          carModel: '',
          plateNumber: '',
          kabbsType: '',
          accountNumber: '',
          accountName: '',
          selectedBank: null,
          driverLicense: '',
          otherVehicleDocs: '',
          profilePicture: null,
        });

        setCurrentTab(1);
      })
      .catch((error) => {
        console.error('Error adding data:', error.message);
      });
  };

  const handleFinalSubmission = () => {
    // Call the function to register a new driver with the provided email
    registerNewDriver(driverInfo.email);
  };

  const handleSuccessSnackbarClose = () => {
    setSuccessSnackbarOpen(false);
  };

  const validateEmail = (value) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!value.match(emailRegex)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email address',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }
  };

  const validateFullName = (value) => {
    if (value.length < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fullName: 'Full name must be at least 3 characters long',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, fullName: '' }));
    }
  };

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^\d{10}$/; // Assuming 10-digit phone number
    if (!value.match(phoneRegex)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: 'Invalid phone number (10 digits required)',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: '' }));
    }
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>

            <FormContainer>
              <Typography variant="h4" sx={{ color: theme.palette.orange.dark }}>
                {currentTab === 1
                  ? 'Driver Registration'
                  : currentTab === 2
                  ? 'Vehicle Registration'
                  : 'Final Submission'}
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              
              {currentTab === 1 && (
                <Form onSubmit={handleSubmitDriverInfo}>
                  <TextField
                    label="Email"
                    type="email"
                    value={driverInfo.email}
                    onChange={(e) =>
                      setDriverInfo({ ...driverInfo, email: e.target.value })
                    }
                    required
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <TextField
                    label="Full Name"
                    value={driverInfo.fullName}
                    onChange={(e) =>
                      setDriverInfo({ ...driverInfo, fullName: e.target.value })
                    }
                    required
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                  />
                  <TextField
                    label="Phone Number"
                    type="tel"
                    value={driverInfo.phoneNumber}
                    onChange={(e) =>
                      setDriverInfo({
                        ...driverInfo,
                        phoneNumber: e.target.value,
                      })
                    }
                    required
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                  />
                  <TextField
                    label="Driver's Home Address"
                    value={driverInfo.address}
                    onChange={(e) =>
                      setDriverInfo({ ...driverInfo, address: e.target.value })
                    }
                  />
                  <TextField
                    label="State"
                    value={driverInfo.state}
                    onChange={(e) =>
                      setDriverInfo({
                        ...driverInfo,
                        state: e.target.value,
                      })
                    }
                    select
                  >
                    {statesInNigeria.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button type="submit" variant="contained" color="primary">
                    Next
                  </Button>
                </Form>
              )}

              {currentTab === 2 && (
                <Form onSubmit={handleSubmitVehicleInfo}>
                  <TextField
                    label="Account Number"
                    value={vehicleInfo.accountNumber}
                    onChange={(e) =>
                      setVehicleInfo({
                        ...vehicleInfo,
                        accountNumber: e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Account Name"
                    value={vehicleInfo.accountName}
                    onChange={(e) =>
                      setVehicleInfo({
                        ...vehicleInfo,
                        accountName: e.target.value,
                      })
                    }
                  />
                  <Autocomplete
                    options={banksInNigeria}
                    value={vehicleInfo.selectedBank}
                    onChange={(event, newValue) =>
                      setVehicleInfo({
                        ...vehicleInfo,
                        selectedBank: newValue,
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Bank Name"
                        variant="outlined"
                      />
                    )}
                  />
                  <TextField
                    label="Driver's License"
                    value={vehicleInfo.driverLicense}
                    onChange={(e) =>
                      setVehicleInfo({
                        ...vehicleInfo,
                        driverLicense: e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Other Vehicle Documents"
                    value={vehicleInfo.otherVehicleDocs}
                    onChange={(e) =>
                      setVehicleInfo({
                        ...vehicleInfo,
                        otherVehicleDocs: e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Car Color"
                    value={vehicleInfo.carColor}
                    onChange={(e) =>
                      setVehicleInfo({
                        ...vehicleInfo,
                        carColor: e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Car Model"
                    value={vehicleInfo.carModel}
                    onChange={(e) =>
                      setVehicleInfo({
                        ...vehicleInfo,
                        carModel: e.target.value,
                      })
                    }
                  />
                  <TextField
                    label="Plate Number"
                    value={vehicleInfo.plateNumber}
                    onChange={(e) =>
                      setVehicleInfo({
                        ...vehicleInfo,
                        plateNumber: e.target.value,
                      })
                    }
                  />
                  <Autocomplete
                    options={['kabbs-regular', 'kabbs-go', 'kabbs-x']}
                    value={vehicleInfo.kabbsType}
                    onChange={(event, newValue) =>
                      setVehicleInfo({
                        ...vehicleInfo,
                        kabbsType: newValue,
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="KABBS Type"
                        variant="outlined"
                      />
                    )}
                  />

                  <ProfilePictureLabel>
                    Upload Profile Picture
                    <UploadInput
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                    />
                  </ProfilePictureLabel>
                  {vehicleInfo.profilePicture && (
                    <ProfilePicturePreview
                      src={vehicleInfo.profilePicture}
                      alt="Profile"
                    />
                  )}
                  <Button
                    onClick={() => handleTabChange(1)}
                    variant="outlined"
                    color="primary"
                  >
                    Previous
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Next
                  </Button>
                </Form>
              )}

              {currentTab === 3 && (
                <Form>
                  {/* Display a summary of the entered information */}
                  <Typography variant="h6">Driver Information:</Typography>
                  <Typography>Email: {driverInfo.email}</Typography>
                  <Typography>Full Name: {driverInfo.fullName}</Typography>
                  <Typography>Phone Number: {driverInfo.phoneNumber}</Typography>
                  <Typography>Driver&apos;s Home Address: {driverInfo.address}</Typography>

                  <Typography variant="h6">Vehicle Information:</Typography>
                  <Typography>Account Number: {vehicleInfo.accountNumber}</Typography>
                  <Typography>Account Name: {vehicleInfo.accountName}</Typography>
                  <Typography>Bank Name: {vehicleInfo.selectedBank}</Typography>
                  <Typography>Driver&apos;s License: {vehicleInfo.driverLicense}</Typography>
                  <Typography>
                    Other Vehicle Documents: {vehicleInfo.otherVehicleDocs}
                  </Typography>
                  {vehicleInfo.profilePicture && (
                    <ProfilePicturePreview
                      src={vehicleInfo.profilePicture}
                      alt="Profile"
                    />
                  )}

                  <Button
                    onClick={() => handleTabChange(2)}
                    variant="outlined"
                    color="primary"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleFinalSubmission}
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </FormContainer>
          </Grid>
        </Grid>
      )}

      {/* Success Snackbar */}
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={5000} // Adjust the duration as needed
        onClose={handleSuccessSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSuccessSnackbarClose}
          severity="success"
        >
          Form submitted successfully!
        </MuiAlert>
      </Snackbar>
    </>
  );
};

RegisteredDrivers.propTypes = {
  isLoading: PropTypes.bool,
};