import { useAuthState} from 'react-firebase-hooks/auth'
import Loading from '../components/Loading'
import Login from '../components/Login'
import { auth, dataBase } from '../firebase'
import { serverTimestamp, setDoc,doc, collection } from 'firebase/firestore'
import '../styles/styles.css'
import { useEffect } from 'react'



function MyApp({ Component, pageProps })

 {

  /* Auth change hook from react firebase hooks */

  const [user, loading] = useAuthState(auth)


  //console.log(user.uid);


  useEffect(()=>{

    if (user){

      setDoc(doc(dataBase,'users', user.uid),{
        lastSeen: serverTimestamp(), 
        email: user.email,
        photoUrl: user.photoURL
      },

      {merge:true}
      )

    }

 }
 ,[user])
 

  if(loading) return <Loading/>

  if (!user) return <Login/>

  return <Component {...pageProps} />
}

export default MyApp
