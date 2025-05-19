import React, { useState } from 'react';
import { Box, Typography, Button, Card, Grid } from '@mui/material';
import EmailForm from './EmailForm';

const SignupLoginPage = ({ role, onBack, onAuthSuccess }) => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
return (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f4f6f8',
      padding: 2,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        maxWidth: 900,
        backgroundColor: 'white',
        borderRadius: 4,
        boxShadow: 3,
        overflow: 'hidden',
      }}
    >
      {/* Left section - Marketing Content */}
      <Box
        sx={{
          width: '50%',
          backgroundColor: '#eef5f9',
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box mb={2}>
          <img src="/logo.svg" alt="Harper Logo" style={{ height: 32 }} />
        </Box>
        <Typography variant="h6" gutterBottom>
          Increase Your Clinical Revenue with CallMed Linq
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          🗓️ Easy Appointment Booking<br />
          💳 Increase Clinical Billing<br />
          ❤️ Improve Patient Outcomes
        </Typography>
        <Typography variant="caption" sx={{ mt: 'auto' }}>
          © 2024 CallMed Linq &nbsp; • &nbsp; <a href="#">Privacy</a> &nbsp;•&nbsp; <a href="#">Terms</a>
        </Typography>
      </Box>

      {/* Right section - Form Card */}
      <Box
        sx={{
          width: '50%',
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom textAlign="center">
          Get started with CallMed Linq
        </Typography>
        <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
          See how CallMed Linq can revolutionize your pharmacy operations
        </Typography>
        <EmailForm
          role={role}
          isLogin={isLogin}
          onAuthSuccess={onAuthSuccess}
        />
        <Typography variant="body2" mt={2} textAlign="center">
          Already have an account?{' '}
          <Button onClick={() => setIsLogin(!isLogin)} size="small">
            {isLogin ? 'Sign Up' : 'Login'}
          </Button>
        </Typography>
      </Box>
    </Box>
  </Box>
);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f6f8',
        padding: 2,
      }}
    >
      <Card sx={{ display: 'flex', width: '90%', maxWidth: 1000, borderRadius: 3, boxShadow: 3 }}>
        <Grid container>
          {/* Left Panel */}
          <Grid item xs={12} md={5} sx={{ backgroundColor: '#f9fafb', padding: 4 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Increase Your Clinical Revenue with CallMed
            </Typography>
            <Typography variant="body2" paragraph>
              ✅ <strong>Easy Appointment Booking:</strong> Facilitate seamless scheduling between patients and doctors.
            </Typography>
            <Typography variant="body2" paragraph>
              ✅ <strong>Accurate Clinical Billing:</strong> Automate the billing process with greater precision.
            </Typography>
            <Typography variant="body2">
              ✅ <strong>Improve Patient Outcomes:</strong> Track performance and outcomes with smart insights.
            </Typography>

            <Box mt={6}>
              <Typography variant="caption" color="text.secondary">
                © 2024 CallMed · <a href="#">Privacy & Terms</a>
              </Typography>
            </Box>
          </Grid>

          {/* Right Panel */}
          <Grid item xs={12} md={7} sx={{ padding: 4 }}>
            <Typography variant="h6" gutterBottom>
              {isLogin ? 'Login to Your Account' : 'Get Started with CallMed'}
            </Typography>
            <Typography variant="body2" mb={3} color="text.secondary">
              {isLogin
                ? 'Access your CallMed dashboard and tools.'
                : 'See how CallMed can streamline your operations.'}
            </Typography>

            {!showEmailForm ? (
              <Box display="flex" flexDirection="column" gap={2}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setShowEmailForm(true);
                    setIsLogin(false);
                  }}
                >
                  Sign up with Email
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setShowEmailForm(true);
                    setIsLogin(true);
                  }}
                >
                  Login with Email
                </Button>
                <Button
                  variant="text"
                  color="secondary"
                  sx={{ mt: 2 }}
                  onClick={onBack}
                >
                  &larr; Back
                </Button>
              </Box>
            ) : (
              <EmailForm role={role} isLogin={isLogin} onAuthSuccess={onAuthSuccess} />
            )}

            {showEmailForm && (
              <Box mt={2}>
                <Typography variant="body2">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                  <Button variant="text" size="small" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Sign up' : 'Login'}
                  </Button>
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default SignupLoginPage;