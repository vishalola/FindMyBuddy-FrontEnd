import TextField from '@mui/material/TextField'
import { Button} from '@mui/material'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react'
export default function Login(props){
    const [passCheck,setPassCheck]=useState(true);
    const [userCheck,setUserCheck]=useState(true);
    const navigate=useNavigate();
    function setLoggedInCookie() {
        // Set the cookie expiration to a future date (e.g., 30 days)
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);
      
        document.cookie = `isLoggedIn=true; expires=${expiryDate.toUTCString()}; path=/`;
      }
    let handleClick=(e)=>{
        e.preventDefault();
        let username=e.target[0].value
        let password=e.target[2].value
        axios.post("https://findmybuddy-backend.onrender.com/login",{
            "username":username,
            "password":password
        }).then(res=>{
            let data=res.data;
            if(data.found)
            {
                if(data.match)
                {
                    // Password Match
                    axios.post("https://findmybuddy-backend.onrender.com/userDetail",{
                        "username":username
                    }).then(res=>{
                        let details=res.data;
                        document.cookie = `UserName=${encodeURIComponent(details.userName)}; path=/`;
                        props.setName(details.Name);
                        props.setEmail(details.Email)
                        props.setNumber(details.Number);
                        props.setUserName(details.userName);
                        props.setLog(true);
                        setLoggedInCookie();
                        navigate("/profile");
                    })
                    
                }
                else
                {
                    // Password didn't match
                    setPassCheck(false);
                }
            }
            else
            {
                // User not found
                setUserCheck(false)
            }
        })
    }
    return (
        <div className="h-[100vh] flex justify-center items-center">
            
            <div className="outlin shadow-2xl  border-b-[4px] border-b-blue-700  w-[350px]">
                <div className="
                p-3 text-4xl
                outlin flex mt-8 mb-4 font-light text-blue-700  items-center justify-center">
                    Log In
                </div>
                <form  onSubmit={handleClick} className="outlin mx-8 p-2 flex justify-center px-4 flex-col gap-4  mb-12">
                    <TextField required  error={!userCheck} onChange={()=>setUserCheck(true)} label="Username" variant="outlined" />
                    <TextField required onChange={()=>setPassCheck(true)} error={!passCheck} type="password" label="Password" variant="outlined" />
                    <Button className='!bg-blue-700' type='submit' variant='contained'>Log In</Button>
                    <div onClick={()=>navigate("/signup")} className='text-sm outlin text-right cursor-pointer hover:underline'>
                    ...sign up instead?
                    </div>
                </form>
                
            </div>
        
        </div>
    )
}