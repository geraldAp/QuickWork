import { useContext } from "react"
import { ProjectsContext } from "../context/ProjectContext"
import { AuthContext } from "../context/AuthContext"



export const useLogout = () => {
  const { dispatch } = useContext(AuthContext)
   // since they are both called dispatch we destructor it and give it another name
  const { dispatch: dispatchWorkouts } = useContext(ProjectsContext)

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
      // next thing for avoiding flashes of other workouts
    dispatchWorkouts({ type: 'SET_PROJECTS', payload: null })
  }
  return { logout }
}