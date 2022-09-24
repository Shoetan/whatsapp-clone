
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, dataBase } from "../firebase"
import { useRouter } from "next/router";
import { Avatar, IconButton } from "@mui/material";
import getRecipientEmail from "../utils/getRecipientEmail";
import { AttachFile, Mic } from "@mui/icons-material";
import { MoreVert } from "@mui/icons-material";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, orderBy, query,addDoc,setDoc,where,serverTimestamp } from "firebase/firestore";
import Message from "./Message";
import { InsertEmoticon } from "@mui/icons-material";
import MicIcon from '@mui/icons-material/Mic';
import { useState } from "react";
import TimeAgo from "timeago-react";
import { useRef } from "react";

/* -------------------------STYLES------------------------------------ */

const Container = styled.div`
`
const Header = styled.div`
    position: sticky;
    background-color: #ffffff;
    z-index: 100;
    top:0;
    display : flex;
    padding : 11px;
    height:80px;
    border-bottom: 1px solid whitesmoke;
    align-items: center;

`
const UserAvatar = styled(Avatar)`
`
const ChatInfo = styled.div`
    margin-left: 15px;
    flex: 1;
    > h3 {
        margin-bottom: 5px;
        color: black;
    }
    
    > p{
        font-size: 14px;
        color: gray;
    }
`
const HeaderIcons = styled.div`
`

const MessageContainer = styled.div`
    min-height: 90vh;
    background-color: #e5ded8;
    padding: 30px;
`

const EndOfMessage = styled.div`
`

const InputContainer = styled.form`
    display:flex;
    align-items: center;
    padding:10px;
    position: sticky;
    z-index: 100;
    bottom : 0 ;
    background-color: white;


`

const Input = styled.input`
    flex: 1;
    padding: 20px;    
    background-color: #e5ded8;
    border-radius: 10px;
    outline:0;
    border: none;
    margin-left: 15px;
    margin-right: 15px;

`


/* --------------------------------------JSX--------------------------------------*/

const ChatScreen = ({chat, messages}) => {

    const [user] = useAuthState(auth)

    const router = useRouter()

    const recipientEmail = getRecipientEmail(chat.users, user)

    const userCollectionRef = collection(dataBase, "users")

    const chatCollectionRef = collection(dataBase, "chats")

    const [input, setInput] = useState('')

    const endOfMessageRef = useRef(null)

    const [messagesSnapshot] = useCollection ( query(collection(doc(chatCollectionRef, router.query.id,), "messages"),orderBy("timestamp", "asc")))

    const [recipientSnapshot] = useCollection(query(userCollectionRef), where('enail', '==', getRecipientEmail(chat.users,user)))

    const recipient = recipientSnapshot?.docs?.[0]?.data()

     

    /* Below function will show the messages on the screen if the user is logged in else user the server  generated  content and it is a self evoking function */

   const showMessage = ()=>{
    if(messagesSnapshot){
        return messagesSnapshot.docs.map(message =>(
            <Message
                key = {message.id}
                user = {message.data().user}
                message = {{
                    ...message.data(),
                    timestamp : message.data().timestamp?.toDate().getTime()

                }}
            />
        ))
    }
    else{

        /* Get the message information from the server generated content */
        return JSON.parse(messages).map(message =>(
            <Message key = {message.id} user ={message.user} message = {message}   />
        ))
    }
   }

   /* Function to make the message snap to the bottom */
   const scrollToBottom = () =>{
        endOfMessageRef.current.scrollIntoView({
            behavior : "smooth",
            block : "start",
        })
   }
   

                    /* This function called send message will do two things:
                    
                            (i) Will update the user collection with the current timestamp of the logged in user
                            
                            (ii) Will go the chats collection and update the messages array with a message object based on the ID of the recipient user
                    
                    */
   const sendMessage = (e) =>{
        e.preventDefault()

        /* Updates the user lastseen to the current time once a message is sent */
        setDoc(doc(userCollectionRef, user.uid),{
            lastSeen:serverTimestamp()
        },
        {merge: true}
        )


        /* create or update the message array with an object in the chats collection based on the id of the specific chat of the user */

        addDoc(collection (doc(chatCollectionRef, router.query.id),'messages'),
        {
            timestamp: serverTimestamp(),
            message : input,
            user : user.email,
            photoUrl : user.photoURL
        }
        )

        setInput('')
        scrollToBottom()

   }

    return ( 
        <Container>
            <Header>

            { recipient ? (<UserAvatar src = { recipient?. photoURL}/>) : ( <UserAvatar>{recipientEmail[0].toUpperCase()}</UserAvatar>)}

                {/* <UserAvatar>{recipientEmail[0].toUpperCase()}</UserAvatar> */}

                <ChatInfo>
                    <h3>{recipientEmail}</h3>

                    {/* Display the last seen of the user */}

                    {recipientSnapshot ? (
                    <p>Last active: {' '}
                    {recipient?.lastSeen?.toDate() ? (
                    <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
                    ): "Unavailable"}
                    </p>
                ) : (
                    <p>Loadind Last active...</p>
                )}
                </ChatInfo>
                <HeaderIcons>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                   <IconButton>
                        <MoreVert/>
                   </IconButton>
                </HeaderIcons>
            </Header>
            <MessageContainer>
                    {showMessage()}
                    <EndOfMessage  ref={endOfMessageRef}/>
            </MessageContainer>

                <InputContainer>
                    <IconButton>
                       <InsertEmoticon/>
                    </IconButton>
                    <Input value = {input} onChange = {e=>setInput(e.target.value)}   />
                    <button hidden disabled={!input} type='submit' onClick = {sendMessage}   >Send Message</button>
                    <IconButton>
                       <MicIcon/>
                    </IconButton>   
                </InputContainer>
            

        </Container>
     );
}
 
export default ChatScreen;