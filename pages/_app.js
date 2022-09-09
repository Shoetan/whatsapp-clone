import { useAuthState} from 'react-firebase-hooks/auth'
import Login from '../components/Login'
import { auth , dataBase } from '../firebase'


import '../styles/styles.css'
function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth)

  if (!user) return <Login/>

  return <Component {...pageProps} />
}

export default MyApp
