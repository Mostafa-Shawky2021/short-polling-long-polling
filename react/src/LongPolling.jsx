import { useEffect } from 'react';
import {useState} from 'react';
import './short.css';

const LongPolling = ()=>{
    const url = 'http://localhost:3001'
    const [message,setMessage] = useState("");
    const [messages,setMessages] = useState([]);
        
    useEffect( ()=>{
       
        fetch( `${url}/longmessages` )
            .then( ( res )  =>  res.json() )
            .then( ( data ) => setMessages( messages.concat(data) ) ); 
    
        
    },[messages])
    

    const handleSubmit = (e) => {
        e.preventDefault();
    
        fetch( `${url}/longmessages`,{
             method: 'POST',
             headers: {
                'Content-Type': 'application/json',
             },
            
             body:JSON.stringify({ message }),
        }).then( res =>{
            setMessage('')
        })
    };
    return (
       <>
       <div className="container">
            <form onSubmit={handleSubmit}>  
                <div >
                    <label>Message</label>
                    <input name="username" type="text" value={message} onChange={ e => setMessage(e.target.value)} />
                </div>
            </form>
            <ul>
                {
                    messages.map((m,i)=> <li key={i}>{ m.message  }</li>)
                }

            </ul>

        </div>
     
        </>
    )
}

export default LongPolling;