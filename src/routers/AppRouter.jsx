import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { firebase } from '../firebase/firebaseConfig'
import { useDispatch } from 'react-redux'
import { login } from '../actions/auth'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { startLoadingNotes } from '../actions/notes'

export const AppRouter = () => {
  const dispatch = useDispatch()

  const [checking, setChecking] = useState(true)

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName))
        setIsLoggedIn(true)

        dispatch(startLoadingNotes(user.uid))
      } else {
        setIsLoggedIn(false)
      }
      setChecking(false)
    })
  }, [dispatch, setChecking, setIsLoggedIn])

  if (checking) {
    return (
      <h1>Espere...</h1>
    )
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path='/auth/*' element={
              <PublicRoute isAuthenticated={isLoggedIn}>
                <AuthRouter />
              </PublicRoute>
          }
          />
          <Route
            path='/' element={
              <PrivateRoute isAuthenticated={isLoggedIn}>
                <JournalScreen />
              </PrivateRoute>
          }
          />
          <Route path='*' element={<AuthRouter />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
