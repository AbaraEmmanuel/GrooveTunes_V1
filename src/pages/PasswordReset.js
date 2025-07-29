import React, { useState } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Paper, 
  Alert,
  useTheme,
  useMediaQuery,
  Fade,
  IconButton,
  InputAdornment  // Added this import
} from '@mui/material';
import { 
  ArrowBack,
  Email,
  MusicNote
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';  // Added Link here
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);
    
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Check your inbox for further instructions.');
      setTimeout(() => navigate('/login'), 5000);
    } catch (err) {
      setError(err.message || 'Failed to send password reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(29,185,84,0.05) 0%, rgba(255,255,255,1) 100%)',
        py: isMobile ? 4 : 8,
        position: 'relative',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 30%, rgba(29,185,84,0.08) 0%, transparent 60%)',
          zIndex: 0
        }
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ 
          mb: isMobile ? 4 : 6,
          textAlign: 'center',
          pt: isMobile ? 4 : 8
        }}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              position: 'absolute',
              left: isMobile ? 16 : 40,
              top: isMobile ? 16 : 40,
              color: '#1DB954',
              backgroundColor: 'rgba(29, 185, 84, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(29, 185, 84, 0.2)'
              }
            }}
          >
            <ArrowBack />
          </IconButton>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            mb: 3,
            mt: isMobile ? 4 : 0
          }}>
            <MusicNote sx={{ 
              fontSize: 48, 
              color: '#1DB954',
              mr: 2,
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.1)' },
                '100%': { transform: 'scale(1)' }
              }
            }} />
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                fontWeight: 900,
                background: 'linear-gradient(to right, #1DB954, #1ED760)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px',
                fontSize: isMobile ? '2.5rem' : '3rem'
              }}
            >
              GrooveTunes
            </Typography>
          </Box>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
            Reset your account password
          </Typography>
        </Box>

        <Fade in={true} timeout={600}>
          <Paper 
            elevation={isMobile ? 0 : 4} 
            sx={{ 
              p: isMobile ? 3 : 4,
              borderRadius: '20px',
              boxShadow: isMobile ? 'none' : '0 12px 40px rgba(0, 0, 0, 0.12)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(8px)',
              transform: 'translateY(0)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: isMobile ? 'none' : 'translateY(-4px)',
                boxShadow: isMobile ? 'none' : '0 16px 48px rgba(0, 0, 0, 0.15)'
              }
            }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              align="center" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                mb: 4,
                color: 'text.primary'
              }}
            >
              Reset Your Password
            </Typography>

            <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
              Enter your email address and we'll send you a link to reset your password.
            </Typography>

            {message && (
              <Alert 
                severity="success" 
                sx={{ 
                  mb: 3,
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: 'success.light'
                }}
              >
                {message}
              </Alert>
            )}

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: 'error.light'
                }}
              >
                {error}
              </Alert>
            )}

            <form onSubmit={handlePasswordReset}>
              <Box mb={4}>
                <TextField
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    sx: {
                      borderRadius: '12px',
                      backgroundColor: 'background.paper',
                      '&:hover fieldset': {
                        borderColor: '#1DB954 !important'
                      }
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    )
                  }}
                  InputLabelProps={{
                    sx: {
                      color: 'text.secondary'
                    }
                  }}
                />
              </Box>

              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth 
                size="large"
                disabled={isLoading}
                sx={{ 
                  py: 1.8,
                  borderRadius: '14px',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  boxShadow: '0 4px 20px rgba(29, 185, 84, 0.3)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(29, 185, 84, 0.4)',
                    backgroundColor: '#1ED760'
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {isLoading ? 'Sending Email...' : 'Send Reset Link'}
              </Button>

              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Remember your password?{' '}
                  <Link 
                    to="/login" 
                    style={{ 
                      textDecoration: 'none',
                      color: '#1DB954',
                      fontWeight: 600
                    }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Box>
            </form>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default PasswordReset;