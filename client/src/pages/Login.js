import { Button, CssBaseline, 
    FormControl, FormControlLabel, FormHelperText, Grid, 
    Switch, 
    TextField, } from '@mui/material';
import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import '../sytles/LoginStyle.css'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin';

    const CssFilledInput = styled(TextField)({
        '& .MuiFilledInput-root': {
          borderBottom: "none",
          borderRadius: "10px",
        },
    
        '& .MuiFilledInput-input': {
          paddingLeft: "22px",
          paddingBottom: "12px",
          paddingTop: "32px"
        },
    
    
        '& .MuiFilledInput-root:before': {
          borderBottom: "none",
        },
    
        '& .MuiFilledInput-root:after': {
          borderBottom: "none",
        },
    
        '& .MuiFilledInput-root:hover:not(.Mui-disabled):before': {
          borderBottom: "none",
        },
      
      });

const Login = () => {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const{ loginUser, isLoading, error } = useLogin()

   
    const handleSubmit = async (e) => {
      e.preventDefault()

      await loginUser(username, password)
    }

    const [values, setValues] = React.useState({  
       
        password: '',
        showPassword: false,
        
      });
      const [checked, setChecked] = React.useState(false)
    
      const switchHandler = (event) =>{
          setChecked(event.target.checked)
          setValues({
            ...values,
            showPassword: !values.showPassword,
          });
      };
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
     
     
      const Android12Switch = styled(Switch)(({ theme }) => ({
        
        padding: 8,
        '& .MuiSwitch-track': {
          borderRadius: 22 / 2,
          '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
          },
          '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
              )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
          },
          '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
              theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
          },
        },
        '& .MuiSwitch-thumb': {
          boxShadow: 'none',
          width: 16,
          height: 16,
          margin: 2,
        },
      }));
      const formControlLabelStyle = {
        '& .MuiFormControlLabel-label':{
          fontFamily: "Poppins",
          fontSize: '0.9rem',
          color: '#808080',
         
      },
      }

  
    return (
    <div>
       <div className='user-sign'>
    <div className='login-container'>
    <h5>
      LOGIN 
      <span> TO MY ACCOUNT </span> . </h5>
    <p className='sub'> Don't have an account yet? 
    <span><Link style={{
            textDecoration: 'none',
            color:'#2196f3', 
            fontWeight: '500'
            }} 
            to='/Sign-up'> Sign up </Link></span> </p>
    
    <form onSubmit={handleSubmit}>
    {error &&  <div className='error'>{error}</div>}  
    <FormControl fullWidth sx={{ mt: 2, fontFamily: "Popppins"}}> 
          <CssFilledInput 
               variant="filled"
               label="Username"
               name="username"
               autoComplete="name"
               sx={{fontFamily: "Poppins", marginBottom: 2}}
               InputLabelProps={{
                style: {
                  fontFamily: "Poppins",
                  paddingLeft: "13px",
                  paddingTop: "4px",
                  paddingBottom: "15px"
                }
              }}
              InputProps={{
                style: {
                  fontFamily: "Poppins",
                  fontSize: "0.9rem"
                }
               }}
               value={username}
               onChange= {(e) =>setUsername(e.target.value)}
               autoFocus />
          </FormControl>

          <FormControl fullWidth>
              <CssFilledInput
                variant="filled"
                InputLabelProps={{
                  style: {
                    fontFamily: "Poppins",
                    paddingLeft: "13px",
                    paddingTop: "4px",
                    paddingBottom: "15px"
                  }
                }}
                inputProps={{ 
                  style:{
                    fontFamily: "Poppins",
                    fontSize: "0.9rem"
                  }
                }}
                id="password"
                name="password"
                sx={{borderRadius: "10px"}}
                label="Password"
                type={values.showPassword ? 'text' : 'password'}
                value={`${values.password}${password}`} 
                onChange={(e) =>setPassword(e.target.value)&&handleChange('password')}
              />
              <FormHelperText 
                sx={{fontFamily: "Poppins"}}
                >
                </FormHelperText>
                <FormControl sx={{mt:1, ml: 1, mb: 3}}>
                <FormControlLabel 
                control={<Android12Switch defaultChecked={checked} onChange={switchHandler} />}
                label="Show Password"
                sx={{...formControlLabelStyle}}
                />
            </FormControl>            
              </FormControl>
           
 
              <Grid item xs={12}>
              <FormControl fullWidth margin='normal' >
            <CssBaseline/>
            <Button 
            disableElevation={true}
            type="submit"
            disabled={isLoading}          
                           sx={ { 
                           fontFamily: "Poppins",
                           fontSize: '0.9rem', 
                           color: '#fefefe',
                           borderRadius: 100, 
                           height:'5ch', 
                           fontWeight:'500',
                           hover:'#004d40',
                           padding: "30px",
                            } } 
                           margin= "normal"
                           variant="contained"  
                           size="large"
                           color="secondary"
                           >
                          SIGN IN 
            </Button>
            </FormControl>
               </Grid>
      </form>
    </div>
  </div>
    </div>
  )
}

export default Login

