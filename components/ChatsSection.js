import styled from "styled-components";

/* -----------------------------STYLES---------------------- */

import { Avatar } from "@mui/material";

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






const ChatsSection = ({id , users}) => {
    return ( 
        <Container>
        <UserAvatar/>
            <p>{users[1]}</p>
        </Container>
     );
}
 
export default ChatsSection;