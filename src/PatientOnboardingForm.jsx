import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, MenuItem, Alert, Stepper, Step, StepLabel, Checkbox, FormControlLabel, Paper, LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';

const steps = [
  'Personal Info',
  'Account Credentials',
  'Emergency Contact',
  'Medical History',
  'Health & Lifestyle',
  'Insurance Info',
  'Payment Preferences',
  'Consent & Agreements',
  'Documents Upload',
  'Review & Submit'
];

const initialForm = {
  // Step 1: Personal Info
  firstName: '',
  middleName: '',
  lastName: '',
  gender: '',
  dob: '',
  phone: '',
  email: '',
  address: '',
  nationality: '',
  stateOfOrigin: '',
  maritalStatus: '',
  // Step 2: Credentials
  username: '',
  password: '',
  confirmPassword: '',
  otpPreference: '',
  // Step 3: Emergency Contact
  emergencyName: '',
  emergencyRelationship: '',
  emergencyPhone: '',
  emergencyAddress: '',
  // Step 4: Medical History
  allergies: '',
  chronicConditions: '',
  pastSurgeries: '',
  medications: '',
  familyHistory: '',
  // Step 5: Health & Lifestyle
  bloodGroup: '',
  height: '',
  weight: '',
  smoking: '',
  alcohol: '',
  preferredLanguage: '',
  preferredDoctorGender: '',
  preferredConsultType: '',
  // Step 6: Insurance
  hasInsurance: '',
  insuranceProvider: '',
  insuranceNumber: '',
  insuranceExpiry: '',
  insuranceCard: null,
  // Step 7: Payment
  paymentMethod: '',
  cardDetails: '',
  bankDetails: '',
  // Step 8: Consent
  terms: false,
  privacy: false,
  dataConsent: false,
  emergencyConsent: false,
  // Step 9: Documents
  govId: null,
  insuranceCardUpload: null,
  passportPhoto: null,
};

const maritalOptions = ['Single', 'Married', 'Divorced', 'Widowed'];
const genderOptions = ['Male', 'Female', 'Other'];
const consultTypes = ['Video', 'In-Person', 'Chat'];
const paymentMethods = ['Card', 'Bank Transfer', 'Wallet'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 32px rgba(80, 120, 200, 0.12)',
  overflow: 'visible',
  display: 'flex',
  minHeight: 0,
  maxWidth: 1100,
  margin: '48px auto',
  width: '95vw',
}));

const StepperSide = styled(Box)(({ theme }) => ({
  width: 200,
  background: 'linear-gradient(135deg, #e3e9f7 0%, #f8fafc 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: theme.spacing(4, 2),
  borderRight: `1.5px solid ${theme.palette.primary.light}`,
  minHeight: '100%',
}));

const StepLabelBox = styled(Box)(({ theme, active }) => ({
  width: '100%',
  padding: theme.spacing(1.2, 2),
  marginBottom: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  background: active ? theme.palette.primary.main : 'transparent',
  color: active ? '#fff' : theme.palette.text.primary,
  fontWeight: active ? 700 : 400,
  cursor: 'pointer',
  transition: 'all 0.2s',
  fontSize: 15,
  boxShadow: active ? '0 2px 8px rgba(80,120,200,0.08)' : 'none',
  '&:hover': {
    background: active ? theme.palette.primary.main : theme.palette.action.hover,
  },
}));

const LeftCard = styled(Box)(({ theme }) => ({
  flex: 1.2,
  background: theme.palette.background.paper,
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  minWidth: 340,
  minHeight: '100%',
  overflowY: 'visible',
}));

const RightCard = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 320,
  background: 'linear-gradient(135deg, #e3e9f7 0%, #f8fafc 100%)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  overflow: 'visible',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  letterSpacing: 0.5,
}));

const PatientOnboardingForm = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setForm(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateStep = () => {
    setError('');
    switch (step) {
      case 0:
        if (!form.firstName || !form.lastName || !form.gender || !form.dob || !form.phone || !form.email || !form.address || !form.nationality || !form.stateOfOrigin || !form.maritalStatus) {
          setError('Please fill all required personal info fields.');
          return false;
        }
        return true;
      case 1:
        if (!form.username || !form.password || !form.confirmPassword) {
          setError('Please fill all required account fields.');
          return false;
        }
        if (form.password !== form.confirmPassword) {
          setError('Passwords do not match.');
          return false;
        }
        return true;
      case 2:
        if (!form.emergencyName || !form.emergencyRelationship || !form.emergencyPhone) {
          setError('Please fill all required emergency contact fields.');
          return false;
        }
        return true;
      case 7:
        if (!form.terms || !form.privacy || !form.dataConsent || !form.emergencyConsent) {
          setError('Please accept all consents and agreements.');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <SectionTitle variant="subtitle1">Basic Personal Information</SectionTitle>
            <Box display="flex" gap={2}>
              <TextField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} required fullWidth margin="normal" />
              <TextField label="Middle Name" name="middleName" value={form.middleName} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} required fullWidth margin="normal" />
            </Box>
            <TextField select label="Gender" name="gender" value={form.gender} onChange={handleChange} required fullWidth margin="normal">
              {genderOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </TextField>
            <TextField label="Date of Birth" name="dob" type="date" value={form.dob} onChange={handleChange} required fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
            <TextField label="Phone Number" name="phone" value={form.phone} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Email Address" name="email" value={form.email} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Residential Address" name="address" value={form.address} onChange={handleChange} required fullWidth margin="normal" />
            <Box display="flex" gap={2}>
              <TextField label="Nationality" name="nationality" value={form.nationality} onChange={handleChange} required fullWidth margin="normal" />
              <TextField label="State of Origin" name="stateOfOrigin" value={form.stateOfOrigin} onChange={handleChange} required fullWidth margin="normal" />
            </Box>
            <TextField select label="Marital Status" name="maritalStatus" value={form.maritalStatus} onChange={handleChange} required fullWidth margin="normal">
              {maritalOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </TextField>
          </>
        );
      case 1:
        return (
          <>
            <SectionTitle variant="subtitle1">Account Credentials</SectionTitle>
            <TextField label="Username" name="username" value={form.username} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="2FA/OTP Preference (optional)" name="otpPreference" value={form.otpPreference} onChange={handleChange} fullWidth margin="normal" />
          </>
        );
      case 2:
        return (
          <>
            <SectionTitle variant="subtitle1">Emergency Contact</SectionTitle>
            <TextField label="Full Name" name="emergencyName" value={form.emergencyName} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Relationship" name="emergencyRelationship" value={form.emergencyRelationship} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Phone Number" name="emergencyPhone" value={form.emergencyPhone} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Address (optional)" name="emergencyAddress" value={form.emergencyAddress} onChange={handleChange} fullWidth margin="normal" />
          </>
        );
      case 3:
        return (
          <>
            <SectionTitle variant="subtitle1">Medical History</SectionTitle>
            <TextField label="Allergies" name="allergies" value={form.allergies} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Chronic Conditions" name="chronicConditions" value={form.chronicConditions} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Past Surgeries or Hospitalizations" name="pastSurgeries" value={form.pastSurgeries} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Current Medications" name="medications" value={form.medications} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Family Medical History" name="familyHistory" value={form.familyHistory} onChange={handleChange} fullWidth margin="normal" />
          </>
        );
      case 4:
        return (
          <>
            <SectionTitle variant="subtitle1">Health Preferences & Lifestyle</SectionTitle>
            <Box display="flex" gap={2}>
              <TextField select label="Blood Group" name="bloodGroup" value={form.bloodGroup} onChange={handleChange} fullWidth margin="normal">
                {bloodGroups.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
              </TextField>
              <TextField label="Height (cm)" name="height" value={form.height} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="Weight (kg)" name="weight" value={form.weight} onChange={handleChange} fullWidth margin="normal" />
            </Box>
            <TextField label="Smoking (Yes/No)" name="smoking" value={form.smoking} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Alcohol Usage (Yes/No)" name="alcohol" value={form.alcohol} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Preferred Language" name="preferredLanguage" value={form.preferredLanguage} onChange={handleChange} fullWidth margin="normal" />
            <TextField select label="Preferred Doctor Gender" name="preferredDoctorGender" value={form.preferredDoctorGender} onChange={handleChange} fullWidth margin="normal">
              <MenuItem value="">No Preference</MenuItem>
              {genderOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </TextField>
            <TextField select label="Preferred Consultation Type" name="preferredConsultType" value={form.preferredConsultType} onChange={handleChange} fullWidth margin="normal">
              {consultTypes.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </TextField>
          </>
        );
      case 5:
        return (
          <>
            <SectionTitle variant="subtitle1">Insurance Information</SectionTitle>
            <TextField select label="Do you have health insurance?" name="hasInsurance" value={form.hasInsurance} onChange={handleChange} fullWidth margin="normal">
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </TextField>
            <TextField label="Insurance Provider" name="insuranceProvider" value={form.insuranceProvider} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Insurance Number / ID" name="insuranceNumber" value={form.insuranceNumber} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Expiry Date" name="insuranceExpiry" type="date" value={form.insuranceExpiry} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
            <Button variant="outlined" component="label" sx={{ mt: 1, mb: 1 }}>
              {form.insuranceCard ? 'Change Insurance Card' : 'Upload Insurance Card (optional)'}
              <input type="file" name="insuranceCard" accept="image/*,application/pdf" hidden onChange={handleChange} />
            </Button>
          </>
        );
      case 6:
        return (
          <>
            <SectionTitle variant="subtitle1">Payment Preferences</SectionTitle>
            <TextField select label="Preferred Payment Method" name="paymentMethod" value={form.paymentMethod} onChange={handleChange} fullWidth margin="normal">
              {paymentMethods.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </TextField>
            <TextField label="Card Details" name="cardDetails" value={form.cardDetails} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Bank Details" name="bankDetails" value={form.bankDetails} onChange={handleChange} fullWidth margin="normal" />
          </>
        );
      case 7:
        return (
          <>
            <SectionTitle variant="subtitle1">Consent & Agreements</SectionTitle>
            <FormControlLabel
              control={<Checkbox checked={form.terms} onChange={handleChange} name="terms" />}
              label="I agree to the Terms and Conditions"
            />
            <FormControlLabel
              control={<Checkbox checked={form.privacy} onChange={handleChange} name="privacy" />}
              label="I acknowledge the Privacy Policy"
            />
            <FormControlLabel
              control={<Checkbox checked={form.dataConsent} onChange={handleChange} name="dataConsent" />}
              label="I consent to the use of my medical data"
            />
            <FormControlLabel
              control={<Checkbox checked={form.emergencyConsent} onChange={handleChange} name="emergencyConsent" />}
              label="I consent to emergency contact notification"
            />
          </>
        );
      case 8:
        return (
          <>
            <SectionTitle variant="subtitle1">Optional Documents Upload</SectionTitle>
            <Button variant="outlined" component="label" sx={{ mt: 1, mb: 1 }}>
              {form.govId ? 'Change Government ID' : 'Upload Government-Issued ID'}
              <input type="file" name="govId" accept="image/*,application/pdf" hidden onChange={handleChange} />
            </Button>
            <Button variant="outlined" component="label" sx={{ mt: 1, mb: 1 }}>
              {form.insuranceCardUpload ? 'Change Insurance Card' : 'Upload Insurance Card'}
              <input type="file" name="insuranceCardUpload" accept="image/*,application/pdf" hidden onChange={handleChange} />
            </Button>
            <Button variant="outlined" component="label" sx={{ mt: 1, mb: 1 }}>
              {form.passportPhoto ? 'Change Passport Photo' : 'Upload Passport Photo (optional)'}
              <input type="file" name="passportPhoto" accept="image/*" hidden onChange={handleChange} />
            </Button>
          </>
        );
      case 9:
        return (
          <>
            <SectionTitle variant="subtitle1">Review & Submit</SectionTitle>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Bio Data</Typography>
              <Typography variant="body2">
                <strong>Name:</strong> {form.firstName} {form.middleName && form.middleName + ' '} {form.lastName}
              </Typography>
              <Typography variant="body2">
                <strong>Gender:</strong> {form.gender} &nbsp; | &nbsp; <strong>DOB:</strong> {form.dob}
              </Typography>
              <Typography variant="body2">
                <strong>Phone:</strong> {form.phone} &nbsp; | &nbsp; <strong>Email:</strong> {form.email}
              </Typography>
              <Typography variant="body2">
                <strong>Address:</strong> {form.address}
              </Typography>
              <Typography variant="body2">
                <strong>Nationality:</strong> {form.nationality} &nbsp; | &nbsp; <strong>State of Origin:</strong> {form.stateOfOrigin}
              </Typography>
              <Typography variant="body2">
                <strong>Marital Status:</strong> {form.maritalStatus}
              </Typography>

              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Emergency Contact</Typography>
              <Typography variant="body2">
                <strong>Name:</strong> {form.emergencyName} &nbsp; | &nbsp; <strong>Relationship:</strong> {form.emergencyRelationship}
              </Typography>
              <Typography variant="body2">
                <strong>Phone:</strong> {form.emergencyPhone}
              </Typography>
              {form.emergencyAddress && (
                <Typography variant="body2">
                  <strong>Address:</strong> {form.emergencyAddress}
                </Typography>
              )}

              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Medical History</Typography>
              {form.allergies && (
                <Typography variant="body2"><strong>Allergies:</strong> {form.allergies}</Typography>
              )}
              {form.chronicConditions && (
                <Typography variant="body2"><strong>Chronic Conditions:</strong> {form.chronicConditions}</Typography>
              )}
              {form.pastSurgeries && (
                <Typography variant="body2"><strong>Past Surgeries/Hospitalizations:</strong> {form.pastSurgeries}</Typography>
              )}
              {form.medications && (
                <Typography variant="body2"><strong>Current Medications:</strong> {form.medications}</Typography>
              )}
              {form.familyHistory && (
                <Typography variant="body2"><strong>Family Medical History:</strong> {form.familyHistory}</Typography>
              )}

              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Insurance & Payment</Typography>
              <Typography variant="body2">
                <strong>Insurance:</strong> {form.hasInsurance === 'Yes'
                  ? `${form.insuranceProvider || ''} (${form.insuranceNumber || 'N/A'})`
                  : 'None'}
              </Typography>
              {form.insuranceExpiry && (
                <Typography variant="body2">
                  <strong>Insurance Expiry:</strong> {form.insuranceExpiry}
                </Typography>
              )}
              <Typography variant="body2">
                <strong>Payment Method:</strong> {form.paymentMethod || 'Not specified'}
              </Typography>
            </Box>
            <FormControlLabel
              control={<Checkbox checked={form.reviewConfirm || false} onChange={e => setForm(f => ({ ...f, reviewConfirm: e.target.checked }))} name="reviewConfirm" />}
              label="I confirm the above information is accurate"
            />
          </>
        );
      default:
        return null;
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    if (step === steps.length - 1) {
      setLoading(true);

      // Prepare form data for backend (handle file uploads)
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      try {
        const res = await fetch('http://localhost:5000/api/patients/onboarding', {
          method: 'POST',
          body: formData,
          // No need for Content-Type, browser sets it for FormData
          credentials: 'include', // if using cookies/session
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || 'Onboarding failed');
          setLoading(false);
          return;
        }
        setLoading(false);
        onComplete(data); // Pass backend response to parent
      } catch (err) {
        setError('Network error. Please try again.');
        setLoading(false);
      }
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/patients/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // your form data
        credentials: 'include', // if you use cookies/auth
      });
      if (!response.ok) throw new Error('Network response was not ok');
      // Optionally handle response data
      onComplete(); // <-- This triggers the redirect in SplashScreen.js
    } catch (err) {
      setError('Network Error. Please Try Again');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => setStep(prev => prev - 1);

  return (
    <StyledPaper elevation={0}>
      <StepperSide>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'primary.main', textAlign: 'left' }}>
          Patient Onboarding
        </Typography>
        {steps.map((label, idx) => (
          <StepLabelBox
            key={label}
            active={idx === step ? 1 : 0}
            onClick={() => setStep(idx)}
          >
            {label}
          </StepLabelBox>
        ))}
      </StepperSide>
      <LeftCard>
        {loading && <LinearProgress sx={{ mb: 2 }} />}
        <Box component="form" onSubmit={handleNext}>
          {renderStep()}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Box mt={4} display="flex" justifyContent="space-between">
            <Button disabled={step === 0 || loading} onClick={handleBack} variant="outlined" color="primary">
              Back
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={loading || (step === steps.length - 1 && !form.reviewConfirm)}>
              {loading ? 'Saving...' : step === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Box>
      </LeftCard>
      <RightCard>
        {/* You can add an illustration or animation here */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            p: 4,
            background: 'linear-gradient(135deg, #e3e9f7 0%, #f8fafc 100%)',
            borderRadius: 3,
          }}
        >
          <img
            src="https://assets-global.website-files.com/5f6b719079b2c51c0b6b3c9b/63e3e6c7e6a1e7b7e4e9d7e7_telemedicine-illustration.svg"
            alt="Telemedicine Illustration"
            style={{ width: '80%', maxWidth: 260, marginBottom: 24 }}
          />
          <Typography variant="h6" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
            Welcome to CallMed!
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Complete your profile to access telemedicine services.
          </Typography>
        </Box>
      </RightCard>
    </StyledPaper>
  );
};

export default PatientOnboardingForm;