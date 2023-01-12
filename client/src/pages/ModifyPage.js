import * as React from 'react';
import { Alert, Button, FormControl, Snackbar, TextField } from '@mui/material'
import { styled } from '@mui/material/styles';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useNavigate, useLocation  } from "react-router-dom";
import {useEffect, useState} from 'react';
import '../sytles/JornalFormStyle.css'
import { useAuthContext } from "../hooks/useAuthContext";


const CssFilledInput = styled(TextField)({
  '& .MuiFilledInput-root': {
    borderBottom: "none",
    borderRadius: "20px",
  },

  '& .MuiFilledInput-input': {
    paddingLeft: "22px",
    paddingBottom: "12px",
    paddingTop: "10px"
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
const ModifyPage = () => {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
  const navigate = useNavigate();
  const { state } = useLocation(); 
  const [journal, setJournal] = useState('')


  useEffect(() => {
    setJournal(state)
  }, [state])

  const backHome = () => {
    navigate('/');
  };

  
  const { user } = useAuthContext()
  const [error, setError] = useState(null)
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user){
      setError('You must be logged in')
      return
    }
    


    const response = await fetch('api/journals/modify/'+ journal._id ,{
        method: 'PATCH',
        body: JSON.stringify(journal),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }        
    }).then((response) => {
      console.log(response)
      setOpen(true);
     
    }).catch((error) => {
      console.log(error)
    })

    console.log("response", response)

}

    return(
       
        <div className='update-contain'>
        <div className='create-form-contain'> 
        <form className='journal-form'>
            <button className='back-icon' onClick={backHome}>
                <ArrowBackIosRoundedIcon sx={{ fontSize: 25 }} />
             </button>
             {error && <div className='error'>{error}</div>}
             <Snackbar  
                          open={open} 
                          anchorOrigin= {{vertical: 'top', horizontal: 'center'}}
                          autoHideDuration={1000}
                          transitionDuration={{ enter: 1000, exit: 5000 }}
                          onClose={handleClose}>
              
              <Alert onClose={handleClose} 
                          severity="success" 
                          sx={{ width: '100%', fontFamily: "Poppins" }}>
                          Changes Saved!
                          </Alert></Snackbar>
              <FormControl fullWidth sx={{ mt: 2, fontFamily: "Popppins"}}> 
              <CssFilledInput 
                   id="filled-multiline-flexible"
                   multiline
                   variant="filled"
                   label="Title"
                   name="title"
                   autoComplete="none"
                   type="text"
                   value={journal.title}
                   sx={{fontFamily: "Poppins", marginBottom: 2}}
                   InputLabelProps={{
                    style: {
                      fontFamily: "Poppins",
                      fontSize: "0.9rem",
                      paddingLeft: "28px",
                      paddingTop: "4px",
                      paddingBottom: "15px"
                    }
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "Inter",
                      fontWeight: "800",
                      fontSize: "1.4rem"
                    }
                   }}
                 
                   onChange={(e) => {
                    setJournal({...journal, title: e.target.value})
                   }}
                   autoFocus />
              </FormControl>
    
              <FormControl fullWidth sx={{ fontFamily: "Popppins"}}> 
              <CssFilledInput 
                   id="filled-multiline-flexible"
                   multiline
                   rows={12}
                   variant="filled"
                   label="Note"
                   name="note"
                   autoComplete="none"
                   type="text"
                   value={journal.note}
                   sx={{fontFamily: "Poppins", marginBottom: 2}}
                   InputLabelProps={{
                    style: {
                      fontFamily: "Poppins",
                      fontSize: "0.9rem",
                      paddingLeft: "28px",
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
                   onChange={(e) => {
                    setJournal({...journal, note: e.target.value})
                   }}
                   autoFocus />
              </FormControl>
    
              <FormControl margin='normal'>
                            <Button 
                            disableElevation={true}
                                        onClick={handleSubmit}
                                        type="submit"
                                        sx={ { 
                                        fontFamily: "Poppins",
                                        fontSize: '0.9rem', 
                                        color: '#fefefe',
                                        borderRadius: 100, 
                                        height:'0ch',
                                        width: '13rem',
                                        fontWeight:'500',
                                        hover:'#004d40',
                                        padding: "25px",
                                            } } 
                                        margin= "normal"
                                        variant="contained"  
                                        color="secondary"
                                        >
                                        SAVE CHANGES
                            </Button>
                            </FormControl>
                           
        </form>
        <div className='create-hero-holder'>
            <h2> UPDATE YOUR
              <span> MOMENTUM!</span> </h2>
              <p> “And by the way, everything in life is writable about if you have the outgoing guts to do it,
                 and the imagination to improvise. The worst enemy to creativity is self-doubt.”
                  ―Sylvia Plath, The Unabridged Journals of Sylvia Plath </p>
           </div>
        </div>
        </div>
    )
}

export default ModifyPage
