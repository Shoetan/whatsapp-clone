import { Button } from '@mui/material';
import Head from 'next/head';
import styled from 'styled-components'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase'


const Login = () => {

const signIn = () =>{

    signInWithPopup( auth, provider)
        .then((result) =>{

            console.log(result)

        })
        .catch((error) =>{
            alert(error.message);
        })

}


    return ( 
        <Container>
              <Head>
                <title>Login</title>
              </Head>

              <LoginContainer>
                <Logo
                   src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png'
                />

                <LoginButton onClick={signIn}>Login with google</LoginButton>
              </LoginContainer>
        </Container>
     );
}
 
export default Login;


const Container = styled.div`
   border: 2px solid black;
   height:100vh;
   display:grid;
   place-items: center;
   background-color: whitesmoke;
`

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color:#ffffff;
    padding: 20px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

`

const Logo = styled.img`
 height:250px;
 width:250px;
 margin-bottom: 50px;

`

const LoginButton = styled(Button)`
    background-color: #c1c1c1;
    color: black;
    padding: 5px;
    margin : 5px;

    :hover{
        background-color: whitesmoke;
        border: 1px solid black
    }
`