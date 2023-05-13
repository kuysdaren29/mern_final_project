import { useEffect, useState } from "react"
import { Button, FormControl, } from '@mui/material'
import { useNavigate } from "react-router-dom";
import JournalDetails from '../components/JournalDetails'
import '../sytles/HomeStyle.css'
import { useJournalsContext } from "../hooks/useJournalsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from '../hooks/useLogout'
import paragraphs from "../components/QuoteDisplay";

const Home = () => {



  const [currentIndex, setCurrentIndex] = useState(0);

  

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % paragraphs.length);
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]);

  const {journals, dispatch} = useJournalsContext()
  const {user} = useAuthContext()
  const [showData, setShowData] = useState(false);
  
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

  const newIllustration = new URL('../images/empty_data.png', import.meta.url)

  const handleShowData = () => {
    setShowData(!showData);
  };

  return (
    <div className='homepage'> 
    <div className='home-container'>
       <div className='hero-holder'>
        <h1> WELCOME 
        {user && (<span className="user-email"> {user.username}!</span>)}
          </h1>
          <p style={{fontFamily:'Inter'}}>{paragraphs[currentIndex]}</p>
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
       


        {/* <div>
      {journals && journals.length > 0 ? (
        <p>This is a message instead of the actual value</p>
      ) : (
        <img style={{width:'40rem', display:'block', margin:'auto'}} src={newIllustration} alt="Illustration" />
      )}
    </div> */}


        <div>
      {journals ? (
        journals.length > 0 ? (
          <span>
            {journals && journals.map((journal) => (
          <JournalDetails key={journal._id} journal={journal}/>
        ))}
          </span>
        ) : (
          <p style={{ width:'13rem', 
          display:'block', 
          margin:'auto',
          textAlign: 'center',
          color: '#808080'}}>No data available.</p>
        )
      ) : (
        <p>Loading data...</p>
      )}
      {!journals || (journals && journals.length === 0) ? (
        <img style={{width:'37rem', display:'block', margin:'auto'}} src={newIllustration} alt="Illustration" />
      ) : null}
    </div>




        {/* <div>
      {journals ? (
        <span>
         {journals && journals.map((journal) => (
          <JournalDetails key={journal._id} journal={journal}/>
        ))}
        </span>
      ) : (
        <div>
          <p>NO AVAILABLE DATA...</p>
          <img style={{width:'20rem'}} src={newIllustration} alt="Illustration" />
        </div>
      )}
    </div> */}

        {/* {journals && journals.map((journal) => (
          <JournalDetails key={journal._id} journal={journal}/>
        ))} */}
        </div>
       </div>
    </div>
    </div>
    


  )
}

export default Home