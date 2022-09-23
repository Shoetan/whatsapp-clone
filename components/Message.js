import styled from "styled-components";







/* -------------------------------------STYLES---------------------------------- */


const Container = styled.div``


/* -----------------------------------JSX----------------------------------- */

const Message = ({ user, message}) => {
    return ( 

        <Container>
            <p>{message}</p>
        </Container>
     );
}
 
export default Message;{}