import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material';
import Home from './pages/Home';
import JournalPage from './pages/JournalPage';
import ModifyPage from './pages/ModifyPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useAuthContext } from './hooks/useAuthContext';


const theme = createTheme({
  palette:{
   primary:{
    main: '#00838f'
   },
   secondary: {
    main: '#24c0dc'
   }, 
  }
})



function App() {
  
  const { user } = useAuthContext()
  
  return (
    
  <ThemeProvider theme={theme}>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={user ? <Home/> : <Navigate to="/login"/>}></Route>
        <Route path='/sign-up' element={!user ? <Signup/> : <Navigate to="/"/>}></Route>
        <Route path='/login' element={!user ? <Login/> : <Navigate to="/"/>}></Route>
        <Route path='/create' element={<JournalPage/>}></Route>
        <Route path='/modify' element={<ModifyPage/>}></Route>
      
      </Routes>
     </BrowserRouter>
  </ThemeProvider>
    
  );
}

export default App;
