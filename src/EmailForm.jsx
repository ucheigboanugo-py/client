import React, { useState } from 'react';
import { Box, TextField, Button, CircularProgress, Alert, Snackbar, Divider } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (password) =>
  password.length >= 8;

const EmailForm = ({ isLogin, role, onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Client-side validation
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (!isLogin && !fullName.trim()) {
      setError('Full Name is required.');
      return;
    }

    setLoading(true);
    try {
      const endpoint = isLogin
        ? 'http://localhost:5000/api/auth/login'
        : 'http://localhost:5000/api/auth/signup';
      const body = isLogin
        ? { email, password, role }
        : { email, password, role, fullName };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Authentication failed');
      } else {
        setSuccess(isLogin ? 'Login successful!' : 'Signup successful!');
        setEmail('');
        setPassword('');
        setFullName('');
        onAuthSuccess(data.user, data.token);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
      autoComplete="off"
    >
      {!isLogin && (
        <TextField
          label="Full Name"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          required
          fullWidth
          variant="outlined"
        />
      )}
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        fullWidth
        autoFocus
        variant="outlined"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        fullWidth
        variant="outlined"
        inputProps={{ minLength: 8 }}
        helperText="Minimum 8 characters"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ fontWeight: 500, borderRadius: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : isLogin ? 'Login' : 'Sign Up'}
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
      <Snackbar
        open={!!success}
        autoHideDuration={2000}
        onClose={() => setSuccess('')}
        message={success}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
      <Divider sx={{ my: 2 }}>or</Divider>
      <GoogleLogin
        width="100%"
        onSuccess={async (credentialResponse) => {
          // Send credentialResponse.credential to backend for verification
          try {
            const res = await fetch('/api/auth/google', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ credential: credentialResponse.credential, role }),
            });
            const data = await res.json();
            if (res.ok) {
              onAuthSuccess(data.user, data.token);
            } else {
              alert(data.message || 'Google authentication failed');
            }
          } catch {
            alert('Network error. Please try again.');
          }
        }}
        onError={() => alert('Google authentication failed')}
      />
    </Box>
  );
};

export default EmailForm;