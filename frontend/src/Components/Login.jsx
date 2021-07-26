import "./login.css"
import RoomIcon from '@material-ui/icons/Room';
import {useState,useRef} from 'react';
import axios from "axios";
import CancelIcon from '@material-ui/icons/Cancel';

export default function Login({setShowLogin,storage,setCurrentUser}) {

    const [failure, setFailure] = useState(false);
    const nameRef = useRef();
    const passwordRef = useRef();
    
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const user = {
            username:nameRef.current.value,
            password:passwordRef.current.value
        }
        try{
            const res = await axios.post('/users/login',user);
            storage.setItem("user", res.data.username);
            setCurrentUser(res.data.username)
            setShowLogin(false); 
            setFailure(false);
            
        }catch(err){
            setFailure(true);
            console.log(err);
        }
    }
    return (
        <div className="loginContainer">
            <div className="logo">
                <RoomIcon style={{color:"teal"}}/>
                Favorite Pin
            </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="username" ref={nameRef}/>
                    <input type="password" placeholder="password" ref={passwordRef}/>
                    <button type="submit"><p>Login</p></button>
                    {failure && 
                    <span className="btn failure">Something went wrong</span>
                    }
                </form>
            <CancelIcon className="loginCancel" onClick={()=>setShowLogin(false)}/>            
        </div>
    )
}
