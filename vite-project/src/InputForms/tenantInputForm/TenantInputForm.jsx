// input form UI code is generated using Chatgpt 4o, with text list of field and its type alone with sample Material UI textfield  as prompt
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { updateTenant, updateTenantPref } from '../../redux/tenant/tenantReducer';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Box, Grid, Typography, Checkbox, FormControlLabel } from '@mui/material';
import '../inputForm.css';
import { getTenantPrefAsync, getTenantProfileAsync, patchTenantPrefAsync, patchTenantProfileAsync } from '../../redux/tenant/thunks';


export function TenantInputForm() {
  const [customGender, setCustomGender] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  // for user reducer 
  const tenantID = useSelector((state) => {
    // console.log('User state:', state.user);
    return state.user.user.TenantID; 
  });
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const { tenant, tenantPref } = useSelector((state) => state.tenant);
  // grabing tenant profile
  useEffect(() => {
    if (isAuthenticated && tenantID) {
      // console.log('Dispatching getTenantProfileAsync with tenantID:', tenantID);
      dispatch(getTenantProfileAsync(tenantID));
    }
  }, [dispatch, isAuthenticated, tenantID]);
  // grabing tenant preference
  useEffect(() => {
    if (isAuthenticated && tenant.TenantPreferenceID) {
      // console.log(`Fetching tenant preference for tenantPreferenceID: ${tenant.TenantPreferenceID}`);
      dispatch(getTenantPrefAsync(tenant.TenantPreferenceID));
    }

  }, [dispatch, isAuthenticated, tenant.TenantPreferenceID]);

  // generated by Chatgpt4o, which code in current file and “how to handle changes in the form to update the tenant object"
  //name: The name attribute of the input field. value: The value of the input field. type: The type of the input field (e.g., text, checkbox). checked: The checked state of the input field, applicable if the input type is checkbox.
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in tenant) {
      dispatch(updateTenant({ [name]: type === 'checkbox' ? checked : value }));
    } else {
      dispatch(updateTenantPref({ [name]: type === 'checkbox' ? checked : value }));
    }
  };

  // when submit button is hit
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(patchTenantProfileAsync({ tenantID, tenant }));

    if (tenant.TenantPreferenceID) { // Ensure TenantPreferenceID is defined
      dispatch(patchTenantPrefAsync({ tenantPreferenceID: tenant.TenantPreferenceID, tenantPref }));
    } else {
      console.error('TenantPreferenceID undefined. Cannot patch');
    }
    // dispatch(patchTenantPrefAsync({ tenantPreferenceID :tenant.tenantPreferenceID, tenantPref }))
    setIsEditing(false);
  };

  // when edit button is changed : static text -> input form
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // handle genders genrated by chatgpt4o, with textfield UI code as prompt
  const handleGenderChange = (e) => {
    const value = e.target.value;
    if (value === 'self-describe') {
      setCustomGender(customGender);
      dispatch(updateTenant({ gender: customGender }));
    } else {
      setCustomGender('');
      dispatch(updateTenant({ gender: value }));
    }
  };

  const handleCustomGenderChange = (e) => {
    const value = e.target.value;
    setCustomGender(value);
    dispatch(updateTenant({ gender: value }));
  };
  

  // console.log('Tenant data:', tenant);
  // console.log('Tenant preference data:', tenantPref);


  return (
    <>
      {isEditing ? (
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '80ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className='general-input-form'
        >
          <h1>Landlords need to know your ... </h1>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="outlined-number"
                className="age-field"
                label="Age"
                variant="filled"
                required
                type="number"
                name="Age"
                value={tenant.Age || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid>
              <FormControl margin="normal">
                <InputLabel id="demo-simple-select-autowidth-label">Gender *</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  name="Gender"
                  value={tenant.Gender === customGender ? 'self-describe' : tenant.Gender || ''}
                  onChange={handleGenderChange}
                  required
                  label="Gender"
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Non-binary">Non-binary</MenuItem>
                  <MenuItem value="self-describe">Prefer to self-describe</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                className="gender-field"
                label="If you select self-declared, please indicate here"
                variant="filled"
                name="customGender"
                value={customGender || ''}
                onChange={handleCustomGenderChange}
                placeholder="Enter gender here..."
        
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="occupation-field"
                label="Occupation"
                variant="filled"
                name="Occupation"
                value={tenant.Occupation || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="income-field"
                label="Income in $"
                variant="filled"
                name="Income"
                value={tenant.Income || ''}
                onChange={handleChange}
                placeholder=""
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="company-field"
                label="Company"
                variant="filled"
                name="Company"
                value={tenant.Company || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="habit-field"
                label="Habit"
                variant="filled"
                required
                name="Habit"
                value={tenant.Habit || ''}
                onChange={handleChange}
                placeholder="ex: Early Bird, night owl"
                fullWidth
                margin="normal"
              />
            </Grid>
            <h1>You are looking for rent that ...</h1>
            <Grid item xs={12}>
              <TextField
                className="province-field"
                label="Province"
                variant="filled"
                required
                name="Province"
                value={tenantPref.Province || ''}
                onChange={handleChange}
                placeholder="ex: Ontario"
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="city-field"
                label="City"
                variant="filled"
                required
                name="City"
                value={tenantPref.City || ''}
                onChange={handleChange}
                placeholder="ex: Toronto"
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="street-field"
                label="Street"
                variant="filled"
                name="Street"
                value={tenantPref.Street || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="expected-price-field"
                label="Expected Price"
                variant="filled"
                type="number"
                name="ExpectedPrice"
                value={tenantPref.ExpectedPrice || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="max-price-field"
                label="Max Price"
                variant="filled"
                type="number"
                name="MaxPrice"
                value={tenantPref.MaxPrice || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="start-date-field"
                label="Start Date"
                variant="filled"
                type="date"
                name="StartDate"
                value={tenantPref.StartDate || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="end-date-field"
                label="End Date"
                variant="filled"
                type="date"
                name="EndDate"
                value={tenantPref.EndDate || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl  margin="normal">
                <InputLabel id="duration-select-label">Duration</InputLabel>
                <Select
                  labelId="duration-select-label"
                  id="duration-select"
                  name="Duration"
                  value={tenantPref.Duration || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="<1month">Less than 1 month</MenuItem>
                  <MenuItem value="1month">1 month</MenuItem>
                  <MenuItem value="2months">2 months</MenuItem>
                  <MenuItem value="3months">3 months</MenuItem>
                  <MenuItem value="4months">4 months</MenuItem>
                  <MenuItem value="5months">5 months</MenuItem>
                  <MenuItem value="6months">6 months</MenuItem>
                  <MenuItem value="7months">7 months</MenuItem>
                  <MenuItem value="8months">8 months</MenuItem>
                  <MenuItem value="9months">9 months</MenuItem>
                  <MenuItem value="10months">10 months</MenuItem>
                  <MenuItem value="11months">11 months</MenuItem>
                  <MenuItem value="12months">12 months</MenuItem>
                  <MenuItem value="long-term">Long term</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl  margin="normal">
                <InputLabel id="room-type-select-label">Room Type</InputLabel>
                <Select
                  labelId="room-type-select-label"
                  id="room-type-select"
                  name="RoomType"
                  value={tenantPref.RoomType || ''}
                  onChange={handleChange}
                >
                  <MenuItem value="Studio">Studio</MenuItem>
                  <MenuItem value="1B1B">1 Bedroom 1 bedroom</MenuItem>
                  <MenuItem value="2B2B">2 Bedrooms 2 Bathrooms</MenuItem>
                  <MenuItem value="2B1B">2 Bedrooms 1 Bathrooms</MenuItem>
                  <MenuItem value="3B+sB">3 Bedrooms+ shared Bathroom</MenuItem>
                  <MenuItem value="3B+3B+">3+ Bedrooms 3+Bathrooms</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={tenantPref.isOwnPet || false} onChange={handleChange} name="isOwnPet" />}
                label="Allow Pet"
              />
              <FormControlLabel
                control={<Checkbox checked={tenantPref.isSmoke || false} onChange={handleChange} name="isSmoke" />}
                label="Allow Smoke"
              />
              <FormControlLabel
                control={<Checkbox checked={tenantPref.isParty || false} onChange={handleChange} name="isParty" />}
                label="Allow Party"
              />
              <FormControlLabel
                control={<Checkbox checked={tenantPref.isWeed || false} onChange={handleChange} name="isWeed" />}
                label="Allow Weed"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="num-of-parking-field"
                label="Number of Parking"
                variant="filled"
                type="number"
                name="NumOfParking"
                value={tenantPref.NumOfParking || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="num-of-resident-field"
                label="Number of Resident"
                variant="filled"
                type="number"
                name="NumOfResident"
                value={tenantPref.NumOfResident || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                className="button"
                type="submit"
                variant="contained"
                color="primary"
              >
                Save
              </Button>
              <Button
                className="button"
                variant="contained"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      ) : (
          <Box className="general-input-form">
            <Typography variant="h4" className="header">Landlord need to know your...</Typography>
            <Typography className="list-item">Age: {tenant.Age}</Typography>
            <Typography className="list-item">Gender: {tenant.Gender || 'N/A'}</Typography>
            <Typography className="list-item">Occupation: {tenant.Occupation || 'N/A'}</Typography>
            <Typography className="list-item">Income: {tenant.Income || 'N/A'}</Typography>
            <Typography className="list-item">Company: {tenant.Company || 'N/A'}</Typography>
            <Typography className="list-item">Habit: {tenant.Habit || 'N/A'}</Typography>

            <Typography variant="h4" className="header">You are looking for rent that...</Typography>
            <Typography className="list-item">Province: {tenantPref.Province || 'N/A'}</Typography>
            <Typography className="list-item">City: {tenantPref.City || 'N/A'}</Typography>
            <Typography className="list-item">Street: {tenantPref.Street || 'N/A'}</Typography>
            <Typography className="list-item">Expected Price: {tenantPref.ExpectedPrice || 'N/A'}</Typography>
            <Typography className="list-item">Max Price: {tenantPref.MaxPrice || 'N/A'}</Typography>
            <Typography className="list-item">Start Date: {tenantPref.StartDate || 'N/A'}</Typography>
            <Typography className="list-item">End Date: {tenantPref.EndDate || 'N/A'}</Typography>
            <Typography className="list-item">Duration: {tenantPref.Duration || 'N/A'}</Typography>
            <Typography className="list-item">Room Type: {tenantPref.RoomType || 'N/A'}</Typography>
            <Typography className="list-item">Own Pet: {tenantPref.isOwnPet ? 'Yes' : 'No'}</Typography>
            <Typography className="list-item">Smoke: {tenantPref.isSmoke ? 'Yes' : 'No'}</Typography>
            <Typography className="list-item">Party: {tenantPref.isParty ? 'Yes' : 'No'}</Typography>
            <Typography className="list-item">Weed: {tenantPref.isWeed ? 'Yes' : 'No'}</Typography>
            <Typography className="list-item">Number of Parking: {tenantPref.NumOfParking || 'N/A'}</Typography>
            <Typography className="list-item">Number of Resident: {tenantPref.NumOfResident || 'N/A'}</Typography>
            <Button variant="contained" color="primary" className="button" onClick={handleEdit}>
              Edit Preference
            </Button>
          </Box>
      )}
    </>
  );
}
