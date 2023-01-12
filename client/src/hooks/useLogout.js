import { useAuthContext } from './useAuthContext'
import { useJournalsContext } from './useJournalsContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: journalDispatch } = useJournalsContext()



    const logout = () =>{
      localStorage.removeItem('user')
       
      dispatch({type: 'LOGOUT'})
      journalDispatch({type: 'SET_JOURNALS', payload: null})
    }

    return {logout}
}