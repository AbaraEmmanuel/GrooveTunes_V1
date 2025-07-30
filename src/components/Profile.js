import React, { useState, useEffect } from 'react';
import { 
  Container,
  Typography,
  Box,
  Avatar,
  Button,
  Divider,
  TextField,
  Grid,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  Toolbar,
  CircularProgress
} from '@mui/material';
import { 
  Edit,
  LockReset,
  Visibility,
  VisibilityOff,
  CheckCircle,
  Warning,
  Home,
  QueueMusic,
  Search,
  Logout,
  Security
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { reauthenticateWithCredential, EmailAuthProvider, updateEmail, updateProfile } from 'firebase/auth';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
  });
  const [securityDialog, setSecurityDialog] = useState({
    open: false,
    type: '', // 'password' or 'email'
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    loading: false
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          const userData = userDoc.data();
          
          setFormData({
            displayName: userData?.displayName || currentUser.displayName || '',
            email: currentUser.email || '',
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
          showSnackbar('Error loading profile data', 'error');
        }
      }
    };
    
    fetchUserData();
  }, [currentUser]);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Update in Firestore
      await setDoc(doc(db, 'users', currentUser.uid), {
        displayName: formData.displayName,
        email: formData.email
      }, { merge: true });

      // Update in Firebase Auth
      if (formData.email !== currentUser.email) {
        setSecurityDialog({
          open: true,
          type: 'email',
          currentPassword: '',
          newPassword: formData.email,
          confirmPassword: '',
          loading: false
        });
        return;
      }

      if (formData.displayName !== currentUser.displayName) {
        await updateProfile(auth.currentUser, {
          displayName: formData.displayName
        });
      }

      showSnackbar('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      showSnackbar(error.message || 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSecuritySubmit = async () => {
    setSecurityDialog(prev => ({ ...prev, loading: true }));
    
    try {
      const { currentPassword, newPassword, type } = securityDialog;
      
      // Reauthenticate user
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      
      if (type === 'email') {
        await updateEmail(auth.currentUser, newPassword);
        showSnackbar('Email updated successfully!');
      }
      
      setSecurityDialog(prev => ({ ...prev, open: false }));
    } catch (error) {
      console.error("Security operation failed:", error);
      showSnackbar(error.message || 'Security verification failed', 'error');
    } finally {
      setSecurityDialog(prev => ({ ...prev, loading: false }));
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f5f5f5, #ffffff)',
      pb: 8
    }}>
      {/* App Bar */}
      <Box sx={{ 
        backgroundColor: '#121212',
        backgroundImage: 'linear-gradient(rgba(29, 185, 84, 0.2), rgba(29, 185, 84, 0))',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        mb: 4
      }}>
        <Container maxWidth="xl">
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #1DB954, #1ED760)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: isMobile ? '1.25rem' : '1.5rem'
              }}>
                GrooveTunes
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" component={Link} to="/homepage" sx={{ mr: isMobile ? 0 : 2, color: '#ffffff' }}>
                <Home />
              </IconButton>
              <IconButton color="inherit" component={Link} to="/playlist" sx={{ mr: isMobile ? 0 : 2, color: '#ffffff' }}>
                <QueueMusic />
              </IconButton>
              <IconButton color="inherit" component={Link} to="/search" sx={{ mr: isMobile ? 0 : 2, color: '#ffffff' }}>
                <Search />
              </IconButton>
              <Button variant="outlined" color="inherit" onClick={handleLogout} startIcon={<Logout />} sx={{ 
                ml: 2, color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.3)',
                '&:hover': { borderColor: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.1)' }
              }}>
                {!isMobile && 'Logout'}
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ 
          p: 4, borderRadius: '16px',
          background: 'linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(245,245,245,0.9))'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #1DB954, #1ED760)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Your Profile
            </Typography>
            {!editMode && (
              <Button variant="contained" startIcon={<Edit />} onClick={() => setEditMode(true)} sx={{
                backgroundColor: '#1DB954', '&:hover': { backgroundColor: '#1ED760' }
              }}>
                Edit Profile
              </Button>
            )}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: isMobile ? '100%' : '200px' }}>
              <Avatar sx={{ width: 120, height: 120, mb: 2, bgcolor: '#1DB954', fontSize: '3rem' }}>
                {currentUser?.displayName?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                {currentUser?.displayName || 'User'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentUser?.email || 'user@example.com'}
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
              {editMode ? (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth label="Display Name" name="displayName" value={formData.displayName}
                        onChange={handleChange} variant="outlined" sx={{
                          '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#1DB954' }, '&:hover fieldset': { borderColor: '#1DB954' } }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth label="Email" name="email" type="email" value={formData.email}
                        onChange={handleChange} variant="outlined" sx={{
                          '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#1DB954' }, '&:hover fieldset': { borderColor: '#1DB954' } }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ 
                        p: 2, borderRadius: 1, bgcolor: '#f5f5f5',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                      }}>
                        <Box>
                          <Typography variant="subtitle2">Password</Typography>
                          <Typography variant="body2" color="text.secondary">
                            ••••••••
                          </Typography>
                        </Box>
                        <Button
                          component={Link}
                          to="/reset-password"
                          startIcon={<LockReset />}
                          sx={{ color: '#1DB954', '&:hover': { color: '#1ED760' } }}
                        >
                          Change Password
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button variant="outlined" onClick={() => setEditMode(false)} sx={{
                          borderColor: '#1DB954', color: '#1DB954',
                          '&:hover': { borderColor: '#1ED760', color: '#1ED760' }
                        }}>
                          Cancel
                        </Button>
                        <Button type="submit" variant="contained" disabled={loading} sx={{
                          backgroundColor: '#1DB954', '&:hover': { backgroundColor: '#1ED760' }
                        }}>
                          {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              ) : (
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Display Name
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {currentUser?.displayName || 'Not set'}
                    </Typography>
                    <Divider />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {currentUser?.email || 'Not set'}
                    </Typography>
                    <Divider />
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Password
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="body1">••••••••</Typography>
                      <Button
                        component={Link}
                        to="/password-reset"
                        startIcon={<LockReset />}
                        sx={{ ml: 2, color: '#1DB954', '&:hover': { color: '#1ED760' } }}
                      >
                        Change Password
                      </Button>
                    </Box>
                    <Divider />
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Paper>

        {/* Security Information Section */}
        <Paper elevation={3} sx={{ mt: 4, p: 3, borderRadius: '16px' }}>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', color: '#1DB954' }}>
            <Security sx={{ mr: 1 }} /> Password Security Information
          </Typography>
          <Typography variant="body2" paragraph>
            For your security, GrooveTunes uses industry-standard encryption to protect your credentials. 
            This means we never store or can view your actual password.
          </Typography>
          <Typography variant="body2" paragraph>
            If you need to change your password, please use the "Change Password" option above. You'll 
            receive an email to securely update your credentials.
          </Typography>
          <Box component="ul" sx={{ pl: 2.5, mt: 2, '& li': { mb: 1 } }}>
            <Typography component="li" variant="body2">
              <strong>Never</strong> share your password with anyone
            </Typography>
            <Typography component="li" variant="body2">
              Use a <strong>strong, unique</strong> password for your account
            </Typography>
            <Typography component="li" variant="body2">
              Consider using a <strong>password manager</strong>
            </Typography>
          </Box>
        </Paper>

        {/* Account Security Section */}
        <Paper elevation={3} sx={{ mt: 4, p: 3, borderRadius: '16px', border: '1px solid #ff9800', bgcolor: 'rgba(255, 152, 0, 0.05)' }}>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', color: '#ff9800' }}>
            <Warning sx={{ mr: 1 }} /> Account Security Notice
          </Typography>
          <Typography variant="body2" paragraph>
            Changing your email address will require verification. You may be logged out after making changes to your email.
          </Typography>
          <Typography variant="body2">
            For security reasons, some actions may require you to re-enter your password.
          </Typography>
        </Paper>
      </Container>

      {/* Security Verification Dialog */}
      <Dialog open={securityDialog.open} onClose={() => setSecurityDialog(prev => ({ ...prev, open: false }))}>
        <DialogTitle sx={{ color: '#1DB954', fontWeight: 'bold' }}>
          Security Verification Required
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            To {securityDialog.type === 'email' ? 'change your email' : 'perform this action'}, 
            please verify your identity by entering your current password.
          </Typography>
          <TextField
            fullWidth
            label="Current Password"
            type="password"
            value={securityDialog.currentPassword}
            onChange={(e) => setSecurityDialog(prev => ({ ...prev, currentPassword: e.target.value }))}
            variant="outlined"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSecurityDialog(prev => ({ ...prev, open: false }))} sx={{ color: '#1DB954' }}>
            Cancel
          </Button>
          <Button 
            onClick={handleSecuritySubmit}
            disabled={securityDialog.loading || !securityDialog.currentPassword}
            sx={{ color: '#1DB954', fontWeight: 'bold' }}
          >
            {securityDialog.loading ? <CircularProgress size={24} /> : 'Verify'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;