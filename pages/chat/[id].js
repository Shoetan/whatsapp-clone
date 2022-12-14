import Head from "next/head";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { auth, dataBase } from "../../firebase";
import { collection,doc, getDoc, query,getDocs, orderBy } from "firebase/firestore";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";



/* ---------------------------STYLES--------------------------------- */

const Container = styled.div`
    display: flex;
`

const ChatContainer = styled.div`
    flex : 1;
    overflow: scroll;
    height:100vh;

    ::-webkit-scrollbar{
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;


`

/* --------------------------------JSX----------------------------- */

/* Props are chat and messages comes from the server side rendering  down below */
const Chat = ({chat, messages}) => {

    const [user] = useAuthState(auth)

    return ( 
        <Container>
            <Head>
                <title>
                    Chat with {getRecipientEmail(chat.users, user)}
                </title>
            </Head>
            
            <Sidebar/>
            <ChatContainer>
                <ChatScreen chat = {chat} messages = {messages}/>
            </ChatContainer>
        </Container>
     );
}
 
export default Chat;




/* -------------------------SERVER SIDE RENDERING---------------------- */

export async function getServerSideProps(context) {


    /* get the document based on the id from the chats collection in firestore */
    const chatRef = doc(dataBase, 'chats', context.query.id)

    //Prepare message on the server

    /* The getDocs function from firebase gets all the document data from a collection. Below will go into the chats collection and get the messages array */
    const messageReference = await getDocs(query(collection(chatRef, 'messages'), orderBy('timestamp', 'asc')))

    const messages = messageReference.docs.map(doc => ({
        id : doc.id,
        ...doc.data()
    })).map(messages =>({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }))

    //prepare the chats

    /* The getDoc function from firebase returns a specific document with a specific id */
    const chatRes = await getDoc(chatRef)

    const chat ={
        id : chatRes.id,
        ...chatRes.data()
    }

    //console.log(chat, messages)

    return {
        props:{
            messages: JSON.stringify(messages),
            chat : chat
        }
    }

}

