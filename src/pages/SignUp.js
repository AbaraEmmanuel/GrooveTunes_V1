import React, { useState } from "react";
import { 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper, 
  Box, 
  Grid, 
  Alert,
  useTheme,
  useMediaQuery,
  Divider,
  IconButton,
  InputAdornment,
  Fade
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff,
  ArrowBack,
  HowToReg,
  MusicNote
} from "@mui/icons-material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/homepage");
    } catch (err) {
      setError(err.message || 'Signup failed. Ensure your password is 6 characters or more.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
          background: 'radial-gradient(circle at 80% 20%, rgba(29,185,84,0.08) 0%, transparent 60%)',
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
            Create your account to start streaming
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
              Join GrooveTunes
            </Typography>

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

            <form onSubmit={handleSignUp}>
              <Box mb={4}>
                <TextField
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 3 }}
                  InputProps={{
                    sx: {
                      borderRadius: '12px',
                      backgroundColor: 'background.paper',
                      '&:hover fieldset': {
                        borderColor: '#1DB954 !important'
                      }
                    }
                  }}
                  InputLabelProps={{
                    sx: {
                      color: 'text.secondary'
                    }
                  }}
                />
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  fullWidth
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 3 }}
                  InputProps={{
                    sx: {
                      borderRadius: '12px',
                      backgroundColor: 'background.paper',
                      '&:hover fieldset': {
                        borderColor: '#1DB954 !important'
                      }
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                          sx={{ color: 'text.secondary' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  InputLabelProps={{
                    sx: {
                      color: 'text.secondary'
                    }
                  }}
                />
                <TextField
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  fullWidth
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    sx: {
                      borderRadius: '12px',
                      backgroundColor: 'background.paper',
                      '&:hover fieldset': {
                        borderColor: '#1DB954 !important'
                      }
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                          sx={{ color: 'text.secondary' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
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
                startIcon={<HowToReg />}
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
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <Divider sx={{ my: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?
                </Typography>
              </Divider>

              <Button
                component={Link}
                to="/login"
                variant="outlined"
                color="primary"
                fullWidth
                size="large"
                sx={{
                  py: 1.5,
                  borderRadius: '14px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textTransform: 'none',
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px',
                    backgroundColor: 'rgba(29, 185, 84, 0.08)'
                  }
                }}
              >
                Sign In Instead
              </Button>
            </form>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default SignUp;