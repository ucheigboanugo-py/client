import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, MenuItem, Alert, Stepper, Step, StepLabel, Checkbox, FormControlLabel, Paper, Avatar, LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

// You can replace this with your own image or animation component
const OnboardingVisual = () => (
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
      Complete your profile to start consulting with patients online.
    </Typography>
  </Box>
);

const steps = [
  'Personal Info',
  'Professional Credentials',
  'Upload Docs',
  'Schedule Availability',
  'Bank Info',
  'Review & Submit'
];

const initialForm = {
  fullName: '',
  gender: '',
  dob: '',
  phone: '',
  email: '',
  profilePicture: null,
  specialty: '',
  yearsOfExperience: '',
  qualifications: '',
  licenseNumber: '',
  issuingCouncil: '',
  licenseCountry: '',
  certifications: '',
  govId: null,
  licenseUpload: null,
  passportPhoto: null,
  employer: '',
  clinicAddress: '',
  workingHours: '',
  consultationFee: '',
  bankAccountName: '',
  bankAccountNumber: '',
  bankName: '',
  bvn: '',
  payoutFrequency: '',
  preferredLanguage: '',
  timeZone: '',
  notificationPreferences: [],
  username: '',
  password: '',
  consent: false,
  videoBio: null,
};

const payoutOptions = ['Weekly', 'Monthly'];
const notificationOptions = ['SMS', 'Email', 'App'];

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 32px rgba(80, 120, 200, 0.12)',
  overflow: 'visible', // Allow content to expand
  display: 'flex',
  minHeight: 0, // Remove fixed minHeight
  maxWidth: 1100,
  margin: '48px auto',
  width: '95vw',
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
  overflowY: 'visible', // Allow form to grow
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

const ProfileOnboardingForm = ({ role = 'doctor', onComplete }) => {
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

  const handleNotificationChange = (e) => {
    setForm(prev => ({
      ...prev,
      notificationPreferences: typeof e.target.value === 'string'
        ? e.target.value.split(',')
        : e.target.value
    }));
  };

  const validateStep = () => {
    setError('');
    switch (step) {
      case 0:
        if (!form.fullName || !form.gender || !form.dob || !form.phone || !form.email) {
          setError('Please fill all required personal info fields.');
          return false;
        }
        return true;
      case 1:
        if (!form.specialty || !form.yearsOfExperience || !form.qualifications ||
            !form.licenseNumber || !form.issuingCouncil || !form.licenseCountry) {
          setError('Please fill all required professional fields.');
          return false;
        }
        return true;
      case 2:
        if (!form.govId || !form.licenseUpload || !form.passportPhoto) {
          setError('Please upload all required documents.');
          return false;
        }
        return true;
      case 3:
        return true;
      case 4:
        if (!form.bankAccountName || !form.bankAccountNumber || !form.bankName || !form.payoutFrequency) {
          setError('Please fill all required bank info fields.');
          return false;
        }
        return true;
      case 5:
        if (!form.preferredLanguage || !form.timeZone || !form.username || !form.password || !form.consent) {
          setError('Please complete all required fields and accept terms.');
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
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
              <Avatar
                src={form.profilePicture ? URL.createObjectURL(form.profilePicture) : undefined}
                sx={{ width: 72, height: 72, mb: 1, bgcolor: '#e3e9f7', color: '#4f8cff' }}
              >
                <PersonIcon fontSize="large" />
              </Avatar>
              <Button variant="outlined" component="label" size="small">
                {form.profilePicture ? 'Change Photo' : 'Upload Photo'}
                <input type="file" name="profilePicture" accept="image/*" hidden onChange={handleChange} />
              </Button>
            </Box>
            <TextField label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} required fullWidth margin="normal" />
            <TextField select label="Gender" name="gender" value={form.gender} onChange={handleChange} required fullWidth margin="normal">
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <TextField label="Date of Birth" name="dob" type="date" value={form.dob} onChange={handleChange} required fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
            <TextField label="Phone Number" name="phone" value={form.phone} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Email Address" name="email" value={form.email} onChange={handleChange} required fullWidth margin="normal" />
          </>
        );
      case 1:
        return (
          <>
            <SectionTitle variant="subtitle1">Professional Details</SectionTitle>
            <TextField label="Medical Specialty" name="specialty" value={form.specialty} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Years of Experience" name="yearsOfExperience" value={form.yearsOfExperience} onChange={handleChange} required fullWidth margin="normal" type="number" />
            <TextField label="Qualifications / Degrees" name="qualifications" value={form.qualifications} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Medical License Number" name="licenseNumber" value={form.licenseNumber} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Issuing Medical Council/Board" name="issuingCouncil" value={form.issuingCouncil} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Country/State of License" name="licenseCountry" value={form.licenseCountry} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Certifications (optional)" name="certifications" value={form.certifications} onChange={handleChange} fullWidth margin="normal" />
          </>
        );
      case 2:
        return (
          <>
            <SectionTitle variant="subtitle1">Identity & Document Verification</SectionTitle>
            <Button variant="outlined" component="label" sx={{ mt: 1, mb: 1 }}>
              {form.govId ? 'Change Government ID' : 'Upload Government ID'}
              <input type="file" name="govId" accept="image/*,application/pdf" hidden onChange={handleChange} />
            </Button>
            <Button variant="outlined" component="label" sx={{ mt: 1, mb: 1 }}>
              {form.licenseUpload ? 'Change Medical License' : 'Upload Medical License'}
              <input type="file" name="licenseUpload" accept="image/*,application/pdf" hidden onChange={handleChange} />
            </Button>
            <Button variant="outlined" component="label" sx={{ mt: 1, mb: 1 }}>
              {form.passportPhoto ? 'Change Passport Photo' : 'Upload Passport-style Photo'}
              <input type="file" name="passportPhoto" accept="image/*" hidden onChange={handleChange} />
            </Button>
            <Button variant="outlined" component="label" sx={{ mt: 1, mb: 1 }}>
              {form.videoBio ? 'Change Video Bio' : 'Upload Video Bio (optional)'}
              <input type="file" name="videoBio" accept="video/*" hidden onChange={handleChange} />
            </Button>
          </>
        );
      case 3:
        return (
          <>
            <SectionTitle variant="subtitle1">Clinic / Practice Info</SectionTitle>
            <TextField label="Current Employer / Practice" name="employer" value={form.employer} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Clinic Address" name="clinicAddress" value={form.clinicAddress} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Working Hours / Availability" name="workingHours" value={form.workingHours} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Consultation Fee" name="consultationFee" value={form.consultationFee} onChange={handleChange} fullWidth margin="normal" type="number" />
          </>
        );
      case 4:
        return (
          <>
            <SectionTitle variant="subtitle1">Bank / Payment Info</SectionTitle>
            <TextField label="Bank Account Name" name="bankAccountName" value={form.bankAccountName} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Bank Account Number" name="bankAccountNumber" value={form.bankAccountNumber} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Bank Name" name="bankName" value={form.bankName} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="BVN / NIN" name="bvn" value={form.bvn} onChange={handleChange} fullWidth margin="normal" />
            <TextField select label="Preferred Payout Frequency" name="payoutFrequency" value={form.payoutFrequency} onChange={handleChange} required fullWidth margin="normal">
              {payoutOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </TextField>
          </>
        );
      case 5:
        return (
          <>
            <SectionTitle variant="subtitle1">System Preferences & Credentials</SectionTitle>
            <TextField label="Preferred Language" name="preferredLanguage" value={form.preferredLanguage} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Time Zone" name="timeZone" value={form.timeZone} onChange={handleChange} required fullWidth margin="normal" />
            <TextField select
              label="Notification Preferences"
              name="notificationPreferences"
              value={form.notificationPreferences}
              onChange={handleNotificationChange}
              SelectProps={{ multiple: true }}
              fullWidth
              margin="normal"
            >
              {notificationOptions.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </TextField>
            <TextField label="Username" name="username" value={form.username} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required fullWidth margin="normal" />
            <FormControlLabel
              control={<Checkbox checked={form.consent} onChange={handleChange} name="consent" />}
              label={
                <Typography variant="body2">
                  I consent to the <a href="#" style={{ color: '#4f8cff' }}>Terms</a> and <a href="#" style={{ color: '#4f8cff' }}>Privacy Policy</a>
                </Typography>
              }
              sx={{ mt: 1 }}
            />
            <Box mt={2} textAlign="center">
              <Typography variant="caption" color="text.secondary">
                Your information is securely stored and never shared without your consent.
              </Typography>
            </Box>
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
      setTimeout(() => {
        setLoading(false);
        onComplete(form);
      }, 1200);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => setStep(prev => prev - 1);

  return (
    <StyledPaper elevation={0}>
      <LeftCard>
        <Stepper activeStep={step} alternativeLabel sx={{ mb: 3 }}>
          {steps.map(label => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
        {loading && <LinearProgress sx={{ mb: 2 }} />}
        <Box component="form" onSubmit={handleNext}>
          <Typography variant="h5" mb={2} textAlign="center" sx={{ fontWeight: 700, color: '#222' }}>
            Doctor Onboarding
          </Typography>
          {renderStep()}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Box mt={4} display="flex" justifyContent="space-between">
            <Button disabled={step === 0 || loading} onClick={handleBack} variant="outlined" color="primary">
              Back
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? 'Saving...' : step === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Box>
      </LeftCard>
      <RightCard>
        <OnboardingVisual />
      </RightCard>
    </StyledPaper>
  );
};

export default ProfileOnboardingForm;