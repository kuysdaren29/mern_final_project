import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useJournalsContext } from '../hooks/useJournalsContext';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Alert, Snackbar } from '@mui/material';
import * as React from 'react';

const JournalDetails = ({ journal }) => {

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const { dispatch } = useJournalsContext()
  const { user } = useAuthContext()

const handleClick = async () => {
  if (!user) {
    return
  }
  const response = await fetch('/api/journals/' + journal._id, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
    
  })
  const json = await response.json()
  
  if(response.ok) {
    dispatch({type: 'DELETE_JOURNALS', payload: json})
  }
}



const navigate = useNavigate();

  const navigatetoModify = (journal) => {
    
    navigate('/modify', { state: journal });
  };
  return (
                <div>
                  <Snackbar 
                          open={open} 
                          anchorOrigin= {{vertical: 'top', horizontal: 'right'}}
                          transitionDuration={{ enter: 1000, exit: 5000 }}
                          onClose={handleClose}>
              
              <Alert onClose={handleClose} 
                          severity="info" 
                          sx={{ width: '100%', fontFamily: "Poppins" }}>
                          Journal Deleted!
                          </Alert></Snackbar>
      <button onClick={() => navigatetoModify(journal)} className='journal-details'> 
        <div className='journal-time'>
            {formatDistanceToNow(new Date(journal.createdAt), { addSuffix: true})} 
        </div>
       <div className='journal-title'> 
            {journal.title}
        </div>
        <div className='journal-note'>
            <div className='a'>{journal.note}</div>
        </div>
      </button>
      <div className='delete-icon' onClick={handleClick}>
        <DeleteRoundedIcon sx={{ fontSize: 27 }}/>
       </div>
       
    </div>
  )
}

export default JournalDetails

