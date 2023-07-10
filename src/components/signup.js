import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function SignUp(){
    let [passCheck,setPassCheck]=useState(false);
    const [userCheck,setUserCheck]=useState(false);
    const navigate=useNavigate();
    let handleClick=(e)=>{
        e.preventDefault();
        let username=e.target[0].value
        let name=e.target[2].value
        let email=e.target[4].value
        let number=e.target[6].value
        let password=e.target[8].value
        let confirmPass=e.target[10].value
        if(password!==confirmPass)
        {
            setPassCheck(true)
        }
        else
        {
            setPassCheck(false);
            axios.post("https://findmybuddy-backend.onrender.com/addUser",{
                "name":name,
                "username":username,
                "email":email,
                "number":number,
                "password":password
            }).then(res=>{
                let check=res.data;
                if(check)
                {
                    navigate("/login")
                }
                else
                {
                    // UserName already exists
                    setUserCheck(true);
                }
            })
        }
        
    
        //Send this username, password to server.

    }
    return (
        <div className="h-[100vh] flex justify-center items-center md:items-end">
            
            <div className="outlin shadow-2xl  border-b-[4px] border-b-blue-700  w-[400px]">
                <div className="
                p-3 text-4xl
                outlin flex mt-4 mb-4 font-light text-blue-700  items-center justify-center">
                    Sign Up
                </div>
                <form  onSubmit={handleClick} className="outlin mx-8 p-2 flex justify-center px-4 flex-col gap-4 mb-8 ">
                    <TextField required error={userCheck} onChange={()=>setUserCheck(false)} label="Username" variant="outlined" />
                    <TextField required  label="Full Name" variant="outlined" />
                    <TextField required type="email" label="Email" variant="outlined" />
                    <TextField required  type="phone" label="Phone" variant="outlined" />
                    <TextField required  type="password" label="Password" variant="outlined" />
                    <TextField onChange={()=>setPassCheck(false)} required error={passCheck}  type="password" label="Confirm Password" variant="outlined" />
                    <Button type='submit' className='!bg-blue-700' variant='contained'>Sign Up</Button>
                </form>
            </div>
        
        </div>
    )
}