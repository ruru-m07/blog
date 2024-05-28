import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import './App.css'
import {Header, Footer} from './components/index'

function App() {
  const [loading , setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
        if(userData) {
          dispatch(login({userData}))
        }
        else {
          dispatch(logout())
        }
    })
    .catch((error) => {
      console.log("error cought",error);
      console.error();
    })
    .finally(() => {setLoading(false)})
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'> 
      <div className='w-full block'>
        <Header />
        <main>
          TODO:{/* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : (<div className='min-h-sceen'> Loading... </div>)
  
}

export default App
