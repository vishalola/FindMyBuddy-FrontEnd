import './App.css';
import Login from './components/login';
import SignUp from './components/signup';
import Profile from './components/profile';
import {Route,Routes} from 'react-router-dom'
import Home from './components/homepage';
import NavBar from './components/navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {

  const [log,setLog]=useState(false);
  const [name,setName]=useState('');
  const [username,setUserName]=useState('');

  const [email,setEmail]=useState('');
  const [number,setNumber]=useState('');

  function checkLoggedIn() {
    const cookies = document.cookie.split(';');
  
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'isLoggedIn' && value === 'true') {
        return true;
      }
    }
  
    return false;
  }
  useEffect(()=>{
    if(checkLoggedIn())
    {
      setLog(true);
      let cookies=document.cookie.split(';');
      let username;
      for(let i=0;i<cookies.length;i++)
      {
        const [name, value] = cookies[i].trim().split('=');
        if (name === 'UserName') {
            username=value;
            break;
        }
      }
      axios.post("https://findmybuddy-backend.onrender.com/userDetail",{
        "username":username
      }).then(res=>{
        let details=res.data;
        setName(details.Name);
        setEmail(details.Email)
        setNumber(details.Number);
        setUserName(details.userName);

      })
    }
  },[])

  return (
    <div className="relative h-[99vh]">

        <NavBar isLogged={log} setLog={setLog} />
        <Routes>
          <Route path="/" element={<Home isLogged={log}/>}/>
          <Route path="/login" element={<Login setLog={setLog} setUserName={setUserName} setName={setName} setEmail={setEmail} setNumber={setNumber}/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/profile" element={<Profile name={name} username={username} email={email} number={number} isLogged={log}/>}/>
        </Routes>
    </div>
  );
}

export default App;
