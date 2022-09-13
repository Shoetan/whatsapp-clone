import { useAuthState} from 'react-firebase-hooks/auth'
import Loading from '../components/Loading'
import Login from '../components/Login'
import { auth, dataBase } from '../firebase'
import { collection, serverTimestamp, setDoc, addDoc } from 'firebase/firestore'

import '../styles/styles.css'
import { useEffect } from 'react'
function MyApp({ Component, pageProps })
 {
  const [user,loading] = useAuthState(auth)

  const dbReference = collection(dataBase, 'users')

  const data = {
    //email: user.email,
    lastSeen : serverTimestamp(),
    //photoUrl: user.photoURL
  }


  useEffect(()=>{

    addDoc(dbReference,data)
    .then(()=>{
      console.log('Successfully added the data to the database');
    })
    .catch(err=>{
      console.log(err.message)
    });
  })

  if(loading) return <Loading/>

  if (!user) return <Login/>

  return <Component {...pageProps} />
}

export default MyApp
