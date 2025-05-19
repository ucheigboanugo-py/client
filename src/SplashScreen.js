import React, { useState, useEffect } from 'react';
import './SplashScreen.css';
import logo from './logo.svg';
import { Box, Card, CardContent, Typography, Button, Grid, IconButton, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SignupLoginPage from './SignupLoginPage'; // <-- Import your new component
import ProfileOnboardingForm from './ProfileOnboardingForm';
import PatientOnboardingForm from './PatientOnboardingForm';
import { useNavigate } from 'react-router-dom';

const SignupChoice = ({ onSelect }) => (
  <Box
    className="signup-choice-container"
    sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e3e9f7 100%)',
    }}
  >
    <Typography
      variant="h4"
      sx={{
        color: '#222',
        mb: 4,
        fontWeight: 500,
        fontFamily: 'Inter, Segoe UI, Helvetica Neue, Arial, sans-serif',
      }}
    >
      Sign up or Login as
    </Typography>
    <Grid container spacing={4} justifyContent="center">
      <Grid item>
        <Card sx={{ minWidth: 260, borderRadius: 4, boxShadow: 3, p: 2 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ color: '#4f8cff', mb: 2, fontWeight: 500 }}>
              Medical Practitioner
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: 2, fontWeight: 500, mb: 2 }}
              onClick={() => onSelect('doctor')}
            >
              Sign up/Login as Doctor
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ minWidth: 260, borderRadius: 4, boxShadow: 3, p: 2 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ color: '#4f8cff', mb: 2, fontWeight: 500 }}>
              Patient
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: 2, fontWeight: 500, mb: 2 }}
              onClick={() => onSelect('patient')}
            >
              Sign up/Login as Patient
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

const SplashScreen = () => {
  const [showChoice, setShowChoice] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPatientOnboarding, setShowPatientOnboarding] = useState(false);
  const navigate = useNavigate();


  // Helper to handle successful auth (Email)
  const handleAuthSuccess = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('jwt', token);
    if (user.role === 'doctor') {
      setShowOnboarding(true);
    } else if (user.role === 'patient') {
      setShowPatientOnboarding(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowChoice(true), 2000);
    return () => clearTimeout(timer);
  }, []);

 if (showOnboarding && user) {
    return (
      <ProfileOnboardingForm
        role={user.role}
        onComplete={() => {
          setShowOnboarding(false);
          navigate('/dashboard'); // Redirect to dashboard after doctor onboarding
        }}
      />
    );
  }

  if (showPatientOnboarding && user && user.role === 'patient') {
    return (
      <PatientOnboardingForm
        onComplete={() => {
          setShowPatientOnboarding(false);
          navigate('/dashboard'); // Redirect to patient dashboard
        }}
      />
    );
  }

  if (user && token) {
    return (
      <Box className="dashboard-page" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #e3e9f7 100%)' }}>
        <Typography variant="h4" sx={{ color: '#222', mb: 2, fontWeight: 500 }}>
          Welcome, {user?.email || 'User'}!
        </Typography>
        <Typography>This is your dashboard.</Typography>
      </Box>
    );
  }
  if (selectedRole) {
    return (
      <SignupLoginPage
        role={selectedRole}
        onBack={() => setSelectedRole(null)}
        onAuthSuccess={handleAuthSuccess}
      />
    );
  }
  if (showChoice) {
    return <SignupChoice onSelect={setSelectedRole} />;
  }
  return (
    <div className="splash-container">
      <img src={logo} className="splash-logo" alt="CallMed Logo" />
    </div>
  );
};


export default SplashScreen;
