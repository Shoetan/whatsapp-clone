import { useAuthState} from 'react-firebase-hooks/auth'
import Loading from '../components/Loading'
import Login from '../components/Login'
import { auth } from '../firebase'


import '../styles/styles.css'
function MyApp({ Component, pageProps }) {
  const [user,loading] = useAuthState(auth)


  if(true) return <Loading/>

  if (!user) return <Login/>

  return <Component {...pageProps} />
}

export default MyApp
