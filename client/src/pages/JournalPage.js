import { Alert, Button, FormControl, TextField } from '@mui/material'
import { useState } from 'react'
import { styled } from '@mui/material/styles';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useNavigate } from "react-router-dom";
import '../sytles/JornalFormStyle.css'
import { useJournalsContext } from '../hooks/useJournalsContext';
import { useAuthContext } from "../hooks/useAuthContext";
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';




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
const JournalPage = () => {

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

const { dispatch } = useJournalsContext()
const { user } = useAuthContext()

const [title, setTitle] = useState('')
const [note, setNote] = useState('')
const [error, setError] = useState(null)
const [emptyFields, setEmptyFields] = useState([])

const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user){
      setError('You must be logged in')
      return
    }

    const journal = {title, note}

    const response = await fetch('api/journals/post', {
        method: 'POST',
        body: JSON.stringify(journal),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    })

    const json =  await response.json()

    if (!response.ok) {
        setError(json.error)
        setEmptyFields(json.emptyFields)
        setOpen(false);
        
    }
    if (response.ok) {
        setOpen(true);
        setTitle('')
        setNote('')
        setError(null)
        setEmptyFields([])
        console.log('New Journal Added', json)
        dispatch({type: 'CREATE_JOURNAL', payload: json})
    }
}



const navigate = useNavigate();

const backHome = () => {
 
  navigate('/');
};

    return(
       
        <div className='form-contain'>
        <div className='create-form-contain'> 
        <form className='journal-form' onSubmit={handleSubmit}>
            <button className='back-icon' onClick={backHome}>
                <ArrowBackIosRoundedIcon sx={{ fontSize: 25 }} />
             </button>
             {error && <div className='error'>{error}</div>}
               <Snackbar  
                          open={open} 
                          anchorOrigin= {{vertical: 'top', horizontal: 'center'}}
                          autoHideDuration={1000}
                          transitionDuration={{ enter: 1000, exit: 2000 }}
                          onClose={handleClose}>
              
              <Alert onClose={handleClose} 
                          severity="success" 
                          sx={{ width: '100%', fontFamily: "Poppins" }}>
                          New Journal Created!
                          </Alert></Snackbar>
              <FormControl fullWidth sx={{ mt: 2, fontFamily: "Inter"}}> 
              <CssFilledInput 
                   id="filled-multiline-flexible"
                   multiline
                   variant="filled"
                   label="Title"
                   name="title"
                   autoComplete="none"
                   type="text"
                   value={title}
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
                   onChange={(e) =>setTitle(e.target.value)}
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
                   overflow="hidden"
                   value={note}
                   sx={{fontFamily: "Poppins", marginBottom: 2}}
                   InputLabelProps={{
                    style: {
                      fontFamily: "Poppins",
                      fontSize: "0.9rem",
                      paddingLeft: "28px",
                      paddingTop: "4px",
                      paddingBottom: "15px",
                      
                    }
                  }}
                  InputProps={{
                    style: {
                      fontFamily: "Poppins",
                      fontSize: "0.9rem",
                    }
                   }}
                   onChange={(e) =>setNote(e.target.value)}
                   autoFocus />
              </FormControl>
    
              <FormControl margin='normal'>
                            <Button 
                            disableElevation={true}
                                        type="submit"
                                        sx={ { 
                                        fontFamily: "Poppins",
                                        fontSize: '0.9rem', 
                                        color: '#fefefe',
                                        borderRadius: 100, 
                                        height:'0ch',
                                        width: '10rem',
                                        fontWeight:'500',
                                        hover:'#004d40',
                                        padding: "25px",
                                            } } 
                                        margin= "normal"
                                        variant="contained"  
                                        color="secondary"
                                        >
                                        SAVE 
                            </Button>
                            </FormControl>
                           
        </form>
        <div className='create-hero-holder'>
            <h2> WRITE NEW 
              <span> MOMENTUM!</span> </h2>
              <p> “And by the way, everything in life is writable about if you have the outgoing guts to do it,
                 and the imagination to improvise. The worst enemy to creativity is self-doubt.”
                  ―Sylvia Plath, The Unabridged Journals of Sylvia Plath </p>
           </div>
        </div>
        </div>
    )
}

export default JournalPage
