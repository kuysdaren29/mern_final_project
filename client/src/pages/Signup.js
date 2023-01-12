import { Button, CssBaseline, 
    FormControl, FormControlLabel, Grid, 
    Switch, 
    TextField, } from '@mui/material';
import React, { useState } from 'react'
import '../sytles/SignupStyle.css'
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom'
import { useSignup } from '../hooks/useSignup';


// A0 --- Styled MUITextfield Component 


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


const Signup = () => {

const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmpassword, setConfirmpassword] = useState('')
const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) =>{
     e.preventDefault()

     await signup(username, email, password)
}

// A3 --- password value, and showpassword in switchHandler
const [values, setValues] = React.useState({  
   
    password: '',
    confirmpassword: '',
    showPassword: false,
    showconfirmpassword: false
  });
  const [checked, setChecked] = React.useState(false)

  const switchHandler = (event) =>{
      setChecked(event.target.checked)
      setValues({
        ...values,
        showPassword: !values.showPassword,
        showconfirmpassword: !values.showconfirmpassword
      });
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
 
  // A4 --- Styled MUISwitch component to connect with showPassword
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
      color: '#808080'
  },
  }

  const Illustration = new URL('../images/createAcc_illustration.png', import.meta.url)

return (
<div className='sign-up-holder'>
  <div className='main'>
  <div className='vector-contain'>
    <img className='pic' src={Illustration} alt='illustration'/> 
    </div>
    <div className='hold'>
    <div className='sign-hero'>
      <h3> START FOR FREE. </h3>
    <h4>
      CREATE 
      <span>NEW ACCOUNT</span>.
    </h4>
    <p className='sub-caps'> Already have an account?
      <span><Link style={{
        textDecoration: 'none',
        color:'#2196f3', 
        fontWeight: '500'
        }} 
        to='/login'> Login </Link></span> </p> </div>
    
    <form className='signup' onSubmit={handleSubmit}>
       {error &&  <div className='error'>{error}</div>}                                               
      <FormControl fullWidth sx={{ mt: 2}}>
      <Grid container spacing={1}>

      <Grid item xs={12}>
      <FormControl fullWidth sx={{fontFamily: "Popppins"}}> 
      <CssFilledInput 
           variant="filled"
           label="Username"
           name="username"
           autoComplete="name"
           sx={{fontFamily: "Poppins",}}
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
      </Grid>

      <Grid item xs={12}>
      <FormControl fullWidth> 
      <CssFilledInput
           variant="filled"
           id="email"
           label="Email Adress"
           name="email"
           autoComplete="email"
           value= {email}
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
              fontSize: "0.8rem"
            }
           }}
           onChange= {(e) =>setEmail(e.target.value)}
           autoFocus />
       </FormControl>
      </Grid>

      <Grid item xs={12}>
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
            type={values.showPassword ? 'text' : 'password'}
            value={`${values.password}${password}`} 
            onChange={(e) =>setPassword(e.target.value)&&handleChange('password')}
            sx={{borderRadius: "10px"}}
            label="Password"
          /> 
          </FormControl>
          </Grid>
          <Grid item xs={12}>
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
            id="confirmpassword"
            name="confirmpassword"
            type={values.showconfirmpassword ? 'text' : 'password'}
            value={`${values.confirmpassword}${confirmpassword}`} 
            onChange={(e) =>setConfirmpassword(e.target.value)&&handleChange('confirmpassword')}
            sx={{borderRadius: "10px"}}
            label=" Re-enter Password "
          />
          
          <FormControl sx={{mt:1}}>
            <FormControlLabel 
            control={<Android12Switch defaultChecked={checked} onChange={switchHandler} />}
            label="Show Password"
            sx={{...formControlLabelStyle}}
            />
        </FormControl>       
          </FormControl>
          </Grid>

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
                       borderRadius: 6, 
                       height:'5ch', 
                       fontWeight:'500',
                       hover:'#004d40',
                        } } 
                       margin= "normal"
                       variant="contained"  
                       size="large"
                       color="secondary"
                       >
                      SIGN UP 
        </Button>
        </FormControl>
           </Grid>
           </Grid>
      </FormControl>
     
      </form>
    </div>
    </div>
  </div>
)
}

export default Signup

