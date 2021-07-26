import "./signup.css"
import RoomIcon from '@material-ui/icons/Room';
import {useState,useRef} from 'react';
import axios from "axios";
import CancelIcon from '@material-ui/icons/Cancel';

export default function Singup({setShowRegister}) {

    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const newUser = {
            username:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value
        }
        try{
            await axios.post('/users/register',newUser);
            setSuccess(true);
            setFailure(false);
            
        }catch(err){
            setFailure(true);
            setSuccess(false);
            console.log(err);
        }
    }
    return (
        <div className="registerContainer">
            <div className="logo">
                <RoomIcon style={{color:"slateblue"}}/>
                Favorite Pin
            </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="username" ref={nameRef}/>
                    <input type="email" placeholder="email" ref={emailRef}/>
                    <input type="password" placeholder="password" ref={passwordRef}/>
                    <button type="submit"><p>Signup</p></button>
                    {success &&
                    <span className="btn success">Registered. Please Login now!</span>
                    }
                    {failure && 
                    <span className="btn failure">Something went wrong</span>
                    }
                </form>
            <CancelIcon className="registerCancel" onClick={()=>setShowRegister(false)}/>            
        </div>
    )
}
