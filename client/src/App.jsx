import { Route, Routes } from 'react-router-dom'
import LoggedInRoutes from './routes/LoggedInRoutes'
import NotLoggedInRoutes from './routes/NotLoggedInRoutes'
import LoginScreen from './pages/login/LoginScreen'
import HomeScreen from './pages/home/HomeScreen'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import clientAxios from './utils/axios'
import { addUser } from './store/userReducer'
import './App.css'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : null
    if (token) {
      await clientAxios.get('/auth/current-user', {
        headers: {
          token
        }
      })
        .then(res => {
          localStorage.setItem('token', res.data.token)
          dispatch(addUser(res.data.user));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/"
            element={
              <HomeScreen />
            }
            exact
          />
        </Route>

        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<LoginScreen />} exact />
        </Route>
      </Routes>
    </>
  )
}

export default App
