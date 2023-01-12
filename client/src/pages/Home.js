import { useEffect } from "react"
import { Button, FormControl, } from '@mui/material'
import { useNavigate } from "react-router-dom";
import JournalDetails from '../components/JournalDetails'
import '../sytles/HomeStyle.css'
import { useJournalsContext } from "../hooks/useJournalsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from '../hooks/useLogout'

const Home = () => {

  const {journals, dispatch} = useJournalsContext()
  const {user} = useAuthContext()
  
  useEffect(() =>{
    const fetchJournals = async () => {
      const response = await fetch('/api/journals', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      
      if (response.ok){
        dispatch({type: 'SET_JOURNALS', payload: json})
      }
    }

   if (user) {
    fetchJournals()
   }
  }, [dispatch, user])

  const navigate = useNavigate();

  const navigateToForm = () => {
   
    navigate('/create');
  };

  
  const { logout } = useLogout()
  const handleClick = () => {
    logout()
  }

  return (
    <div className='homepage'> 
    <div className='home-container'>
       <div className='hero-holder'>
        <h1> WELCOME 
        {user && (<span className="user-email"> {user.username}!</span>)}
          </h1>
          <p> “It's worth making time to find the things that really stir your soul. 
            That's what makes you really feel alive. You have to say 'no' to other 
            things you're used to, and do it with all your heart.”
          ― Roy T. Bennett</p>
       </div>
       
       <div className='journals'> 
       <div className='signout'>
       <h4 onClick={handleClick}> SIGN OUT </h4> </div>
       
                <FormControl margin='normal' sx={{ mt: 9, mb: 5}}>
                        <Button 
                        onClick={navigateToForm}
                        disableElevation={true}
                                    sx={ { 
                                      fontFamily: "Poppins",
                                      fontSize: '0.9rem', 
                                      color: '#fefefe',
                                      borderRadius: 100, 
                                      height:'0ch',
                                      width: '15rem',
                                      fontWeight:'500',
                                      hover:'#004d40',
                                      padding: "25px",
                                    } } 
                                    margin= "normal"
                                    variant="contained"  
                                    color="secondary"
                                    >
                                    ADD NEW ENTRY  
                        </Button>
                        </FormControl>
                     
        <div className='journal-holder'>
        {journals && journals.map((journal) => (
          <JournalDetails key={journal._id} journal={journal}/>
        ))}
        </div>
       </div>
    </div>
    </div>
    


  )
}

export default Home