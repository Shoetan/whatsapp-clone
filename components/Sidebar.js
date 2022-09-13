import { Avatar, IconButton,Button} from "@mui/material";
import styled from "styled-components";
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from 'email-validator'
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Sidebar = () => {

    const createChat = () =>{

       const input = prompt('Enter Email')

       if (!input) return null

       if (EmailValidator.validate(input)){
        // We need to add the chat into the DB 'Chats' collection
       }

    }





    return ( 
        <Container>
            <Header>
                <UserAvatar onClick={ ()=>{ auth.signOut()}}/>
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

            {/* List of chats */}
        </Container>
     );
}
 
export default Sidebar;



const Container = styled.div ``

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
    border-radius: 2px;
`

const SearchInput = styled.input`
    outline: none;
    border: none;
    flex:1;
    font-family: Arial, Helvetica, sans-serif;
`

const SidebarButton = styled(Button)`
    cursor: pointer ;
    width: 100%;
    color : black;
    background-color: grey;

    :hover{
        background-color: grey;
        opacity: 0.8;
    }

`