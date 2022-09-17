import { useAuthState} from 'react-firebase-hooks/auth'
import Loading from '../components/Loading'
import Login from '../components/Login'
import { auth, dataBase } from '../firebase'
import { serverTimestamp, setDoc,doc, collection } from 'firebase/firestore'
import '../styles/styles.css'
import { useEffect } from 'react'



function MyApp({ Component, pageProps })

 {

  /* Auth change hook from react firebase hooks that returns an object with the details of the current logged in user */

  const [user, loading] = useAuthState(auth)


  /* useEffect hooks runs everytime on page mount. Once there is a user or a current loggedin user the setDoc function adds the data the the firestore DB using the user google unique ID */

  useEffect(()=>{

    if (user){

      setDoc(doc(dataBase,'users', user.uid),{
        email : user.email,
        lastSeen: serverTimestamp(),
        photoUrl: user.photoURL
      },
      /* This will stop any additional log in from overwriting the existing details of a logged in user */
      {merge:true}
      )

    }

 }
 ,[user])
 
   /* If the loading object from the useAuthState is on render a loading page */
  if(loading) return <Loading/>

  /* if no user render the login page */
  if (!user) return <Login/>

  return <Component {...pageProps} />
}

export default MyApp
