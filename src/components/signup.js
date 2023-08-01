import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton';

import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import image from '../assets/buddy.svg'

export default function SignUp(){
    const [passCheck,setPassCheck]=useState(false);
    const [userCheck,setUserCheck]=useState(false);
    const [load,setLoading]=useState(false);
    const navigate=useNavigate();
    let handleClick=(e)=>{
        setLoading(true);
        e.preventDefault();
        let username=e.target[0].value
        let name=e.target[2].value
        let email=e.target[4].value
        let number=e.target[6].value
        let password=e.target[8].value
        let confirmPass=e.target[10].value
        if(password!==confirmPass)
        {
            // password didn't match with confirmPassword;
            setPassCheck(true)
            setLoading(false);
        }
        else
        {
            // password matched
            setPassCheck(false);
            axios.post("https://findmybuddy-backend.onrender.com/addUser",{
                "name":name,
                "username":username,
                "email":email,
                "number":number,
                "password":password
            }).then(res=>{
                setLoading(false);
                let check=res.data;
                if(check)
                {
                    // user credentials added to database.
                    navigate("/login")
                }
                else
                {
                    // User already exists
                    setUserCheck(true);
                }
            })
        }

    }
    return (
        <div className="h-[100vh] flex justify-center items-center ">
            <img className={ `z-[-10] fixed outlin h-[200px] object-cover bottom-0`} alt="missing" src={image}/>
            
            <div className="outlin shadow-2xl bg-white  border-b-[4px] border-b-blue-700  w-[380px]">
                <div className="
                p-3 text-4xl
                md:text-3xl
                outlin flex mt-4 mb-4 font-light text-blue-700  items-center justify-center">
                    Sign Up
                </div>
                <form  onSubmit={handleClick} className="outlin mx-8 p-2 flex justify-center px-4 flex-col gap-4 mb-12 ">
                    <TextField required error={userCheck} onChange={()=>setUserCheck(false)} label="Username" variant="outlined" />
                    <TextField required  label="Full Name" variant="outlined" />
                    <TextField required type="email" label="Email" variant="outlined" />
                    <TextField required  type="phone" label="Phone" variant="outlined" />
                    <TextField required  type="password" label="Password" variant="outlined" />
                    <TextField onChange={()=>setPassCheck(false)} required error={passCheck}  type="password" label="Confirm Password" variant="outlined" />
                    <LoadingButton loading={load} type='submit' className={`${!load?'!bg-blue-700':''}`} variant='contained'>Sign Up</LoadingButton>
                </form>
            </div>
        
        </div>
    )
}