import styled from "styled-components";
import { Avatar } from "@mui/material";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, dataBase } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { useRouter } from "next/router";


/* -----------------------------STYLES---------------------- */

const UserAvatar = styled(Avatar)`
    margin : 5px;
    margin-right : 15px;
`

const Container = styled.div `
    display: flex;
    align-items : center;
    cursor : pointer;
    padding: 5px;
    word-break : break-word;
    :hover{
        background-color: #e9eaeb;
    }
`

/* ----------------------JSX------------------- */


const ChatsSection = ({id , users}) => {

    const router =  useRouter()


/* Reference to the users collection in firebase  */

    const dbRef = collection(dataBase, "users")

    /* returns a user object of the currently signed in use using the react-firebase-hooks */

    const [user] = useAuthState(auth)

    /* Utility function to get the email of the recipient of the chat */

    const recipientEmail = getRecipientEmail(users, user)

    /* Query to the DB in firebase to return a reference to where the email property is equal to the receivers email  */

    const recipientRef = query(dbRef, where ("email", "==", recipientEmail))

    /* Real time listener to users collection in firebase using the useCollection function from react-firebase-hooks */

    const [recipientSnapshot] = useCollection(recipientRef) 

    const recipient = recipientSnapshot?.docs?.[0]?.data()

    /* directs to the chat window */

    const goToChat =  () =>{
        router.push(`/chat/${id}`)
    }

    return ( 
        <Container onClick={goToChat}>

        { recipient ? (<UserAvatar src = { recipient?. photoURL}/>) : ( <UserAvatar>{recipientEmail[0].toUpperCase()}</UserAvatar>)}
           
            <p>{recipientEmail}</p>
        </Container>
     );
}
 
export default ChatsSection;