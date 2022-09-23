import { Avatar, IconButton,Button} from "@mui/material";
import styled from "styled-components";
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from 'email-validator'
import { auth, dataBase } from "../firebase";
import { addDoc, collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatsSection from "../components/ChatsSection"


 
/* ---------------------STYLES-------------------- */


const Container = styled.div `
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height:100vh;
    min-width :300px;
    max-width :350px;
    overflow-y: scroll;

    ::-webkit-scrollbar{
        display: none;
    }

    -ms-overflow-style : none;
    scrollbar-width: none;

`

const Header = styled.div`
    display: flex;
    position: sticky;
    top:0;
    background-color:white;
    z-index: 1;
    justify-content: space-between;
    margin-top: 5px;
    align-items:center;
    padding:12px;
    height:80px;
    border-bottom: 1px solid whitesmoke;

`

const UserAvatar = styled(Avatar)`
    cursor: pointer;
    

    :hover{
        opacity:0.8;
    }
`

const IconsContainer = styled.div``

const Search = styled.div `
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 10px;
    margin: 15px;
    background-color: aliceblue;
`

const SearchInput = styled.input`
    outline: none;
    border: none;
    flex:1;
    font-family: Arial, Helvetica, sans-serif;
    font-size: medium;
    background-color: aliceblue;
`

const SidebarButton = styled(Button)`
    cursor: pointer ;
    width: 100%;
    color : black;
    background-color: grey;

    :hover{
        background-color: blue;
        opacity: 0.8;
    }

`

/* ----------------------------JSX--------------------- */

const Sidebar = () => {


    /* Auth change hook from react-firebase-hooks. The hook returns an object with the details of the current logged in user */
    const [user] = useAuthState(auth)


    const dbRef = collection(dataBase, "chats")

    /* Query the DB to return a reference from the DBref where the users array contains the email from the logged in user (user.email) */

    const userChatRef = query(dbRef , where("users", "array-contains" , user.email))


    /* useCollection is a real time listener from the react-firebase-hooks. This hooks to the database and updates as changes occur to the database */

    const [chatsSnapshot] = useCollection(userChatRef)



      /* We need to add the chat into the DB 'Chats' collection */

    const createChat = () =>{

       const input = prompt('Enter Email')

       if (!input) return null

       if (EmailValidator.validate(input) && !ifChatExits(input) && input !== user.email)
       {
             /* Add the object users with an array containing the email of the current loggedin user and the email of the chat recipient */
            addDoc(dbRef,
            {
                users: [user.email, input],
            })
            .then(()=>{
                console.log('users addded succesfully to the DB')
            })
            .catch((err)=>{
                console.log(err.message);
            })
      
       }

    }

    /* Check if the chat already exists by mapping through the chatsSnapshot docs and for each chat assign the chat data which consists of the users array and in the users array find a user the is equal to the recipient email */

    const ifChatExits = (recipientEmail)=>

        !!chatsSnapshot?.docs.find((chat) => chat.data().users.find((user) => user === recipientEmail)?.length > 0)
     

    return ( 
        <Container>
            <Header>
                    {/* Check if the user object returned has a photoUrl or else use the first letter of the email address */}
                {
                    user.photoUrl ? (<UserAvatar src = { user.photoUrl}/>): ( <UserAvatar onClick={ ()=> auth.signOut()}>{user.email[0].toUpperCase()} </UserAvatar>)
                }

                <IconsContainer>
                    <IconButton>
                         <ChatIcon/>
                    </IconButton>
                    <IconButton>
                         <MoreVertIcon/>
                    </IconButton>
                </IconsContainer>
            </Header>
            <Search>
                <SearchIcon/>
                <SearchInput placeholder="search in Chats"/>
            </Search>
            <SidebarButton onClick={createChat}>
                start a new chat
            </SidebarButton>

            { chatsSnapshot ?. docs.map(chat =>(
                <ChatsSection key = {chat.id} id = {chat.id} users = {chat.data().users} />
            ))}
        </Container>
     );
}
 
export default Sidebar;



