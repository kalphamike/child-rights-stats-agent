import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, Typography, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../components/iconify';
import { Link } from 'react-router-dom';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputs = ({currentTarget: input}) => {
    setUser({...user, [input.name]: input.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user);

    axios.post('http://localhost:5000/api/user/signin', user)
    .then(response => {
      localStorage.setToken('userToken', response.data.token);
      localStorage.setToken('userEmail', response.data.user.email);
      
      console.log(response.data);

      //Checking user role
      if(response.data.user.role === 'Agent') {
        navigate('/dashboard/app', { replace: true });
      } else {
        navigate('http://localhost:3000/', { replace: true });
      }
    })
    .catch(error => setError(error))
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Sign in to Child Rights System
      </Typography>

      <Typography variant="body2" sx={{ mb: 5 }}>
        Don’t have an account? {''}
        <Link to={'/auth/signup'}>Get Started</Link>
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField name="email" value={user.email} onChange={handleInputs} label="Email address" />
          <TextField name="password" value={user.password} onChange={handleInputs} label="Password" type={showPassword ? 'text' : 'password'} InputProps={{endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
              </IconButton>
            </InputAdornment>
          ),}}/>
        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{marginTop: 5}}>
          Sign in
        </LoadingButton>
      </form>
    </>
  );
}
