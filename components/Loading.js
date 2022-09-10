import Image from "next/image";

import Spinner from "react-svg-spinner"


const Loading  = () => {
    return ( 
        <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',
        placeItems: 'center', height: '100vh'}}>
            <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"

            alt="whatsapp Icon"

            width={200}
            height={200}
            />

            <Spinner
                height="60px" width="60px"
                color="#3cbc28"
                gap={1}
                thickness={1}
            />

            
        </div>
     );
}
 
export default Loading ;



