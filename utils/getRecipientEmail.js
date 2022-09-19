
/* Utililty function called getrecipientemail will take in two parameter on of which is the current logged in user the other is the users array from the chats collection in firebase that stores a session between the current logged in user and the inputted email address I wish to have a chat with  */

const getRecipientEmail = (users, userLoggedIn) => 
    users?.filter((userToFilter)=>userToFilter!==userLoggedIn?.email)[0]


    export default getRecipientEmail