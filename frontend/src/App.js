import { useEffect, useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import RoomIcon from '@material-ui/icons/Room';
import StarIcon from '@material-ui/icons/Star';
import "./app.css";
import axios from 'axios';
import {format} from 'timeago.js';
import Singup from './Components/Singup';
import Login from './Components/Login'

function App() {
  const storage = window.localStorage;
  const [currentUser,setCurrentUser] = useState(storage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState([]);
  const [title, setTitle] = useState([]);
  const [desc, setDesc] = useState([]);
  const [rating, setRating] = useState(0);
  const [newPlace, setNewPlace] = useState(null);
  const [showRegister,setShowRegister] = useState(false);
  const [showLogin,setShowLogin] = useState(false);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 21.7679,
    longitude: 78.8718,
    zoom: 5
  });


  useEffect(()=>{
    const getPins = async ()=>{
      try{
        const res = await axios.get("/pins");
        setPins(res.data);
      }catch(e){
        console.log(e);
      }
    }
    getPins();
  },[])


  const handleMarkerClick = (id,lat,long)=>{
    setCurrentPlaceId(id);
    setViewport({...viewport, latitude:lat,longitude:long});
  }

  const handleAddClick = (e)=>{
    const [long,lat] = e.lngLat;
    setNewPlace({
      lat,
      long,
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const newPin = {
      username:currentUser,
      title,
      desc,
      rating,
      lat:newPlace.lat,
      long:newPlace.long
    }
    try{
      const res = await axios.post('/pins',newPin);
      setPins([...pins,res.data]);
      setNewPlace(null);
    }catch(e){
      console.log(e);
    }
  }

  const handleLogout = ()=>{
    storage.removeItem("user")
    setCurrentUser(null);
  }
  return (
    <div className="App">
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle="mapbox://styles/anujshaan/ckrk2yr9f09cy17lpz7tx708n"
      onDblClick = {handleAddClick}
    >
      {pins.map(p=>(
        <>
        <Marker latitude={p.lat} longitude={p.long} offsetLeft={-viewport.zoom *3} offsetTop={-viewport.zoom * 6}>
        <RoomIcon 
          style={{
              fontSize:viewport.zoom * 6, 
              color:p.username === currentUser ? "tomato" : "slateblue", 
              cursor:"pointer" 
            } }
          onClick={()=>handleMarkerClick(p._id,p.lat,p.long)}
        />
      </Marker>
      {p._id === currentPlaceId && (

        <Popup
        latitude={p.lat}
        longitude={p.long}
        closeButton={true}
        closeOnClick={false}
        onClose={()=>setCurrentPlaceId(null)}
        anchor="left" >
        <div className="card">
        <label>Place</label>
        <h4>{p.title}</h4>
        <label>Review</label>
        <p className="desc">{p.desc}</p>
        <label>Rating</label>
        <div className="stars">
        {Array(p.rating).fill(<StarIcon className="star" />)}
        </div>
        <label>Information</label>
        <span className="username">Created by <b>{p.username}</b></span>
        <span className="date">{format(p.createdAt)}</span>
        </div>
      </Popup>
          )}
      </>
      ))}
      {newPlace && (

        <Popup
        latitude={newPlace.lat}
        longitude={newPlace.long}
        closeButton={true}
        closeOnClick={false}
        onClose={()=>setNewPlace(null)}
        anchor="left" >
          <div>
            <form onSubmit={handleSubmit}>
              <label>Title:</label>
              <input 
                placeholder="Enter Title"
                onChange={(e)=>setTitle(e.target.value)}
                />
              <label>Review:</label>
              <textarea 
                placeholder="Share your exprience"
                onChange={(e)=>setDesc(e.target.value)}
                />
              <label>Rating:</label>
              <select
                onChange={(e)=>setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button className="submitButton" type="submit">Add Place</button>
            </form>
          </div>
        </Popup>
        )}
        {currentUser ? (
          <button className="button logout" onClick={handleLogout}>Logout: {currentUser}</button>
        ) : 
        (
        <div className="buttons">
          <button 
            className="button login"
            onClick={()=>{setShowLogin(true);setShowRegister(false)}}
            >Login
          </button>
          <button 
            className="button signup"
            onClick={()=>{setShowRegister(true);setShowLogin(false)}}  
            >Signup
          </button>
        </div>
        )}
        {showRegister && <Singup setShowRegister = {setShowRegister}/>}
        {showLogin && <Login setShowLogin = {setShowLogin} storage = {storage} setCurrentUser={setCurrentUser}/>}
        
    </ReactMapGL>
    </div>
  );
}

export default App;
