import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../assets/buddy.svg'
export default function Login(props){

    const [passCheck,setPassCheck]=useState(true);
    const [userCheck,setUserCheck]=useState(true);
    const [load,setLoading]=useState(false);
    const navigate=useNavigate();
    function setLoggedInCookie() {
        // setting up cookie in browser for 30 dates from time of log in 
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);
        document.cookie = `isLoggedIn=true; expires=${expiryDate.toUTCString()}; path=/`;
      }
    let handleClick=(e)=>{
        setLoading(true);
        e.preventDefault();
        let username=e.target[0].value
        let password=e.target[2].value
        
        // verifying from server if user exists: 
        axios.post("https://pdzpip9igu.ap-southeast-1.awsapprunner.com/login",{
            "username":username,
            "password":password
        }).then(res=>{
            setLoading(false);
            let data=res.data;
            if(data.found)
            {
                if(data.match)
                {
                    //User data and  Password Match ,  then get user details and redirect to profile page.
                    axios.post("https://pdzpip9igu.ap-southeast-1.awsapprunner.com/userDetail",{
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
            <img className={ `z-[-10] fixed outlin h-[200px] object-cover bottom-0`} alt="missing" src={image}/>
            
            <div className="outlin bg-white shadow-2xl  border-b-[4px] border-b-blue-700  w-[400px]">
                <div className="
                p-3 text-4xl
                outlin flex mt-8 mb-4 font-light text-blue-700  items-center justify-center">
                    Log In
                </div>
                <form  onSubmit={handleClick} className="outlin mx-8 p-2 flex justify-center px-4 flex-col gap-4  mb-12">
                    <TextField required  error={!userCheck} onChange={()=>setUserCheck(true)} label="Username" variant="outlined" />
                    <TextField required onChange={()=>setPassCheck(true)} error={!passCheck} type="password" label="Password" variant="outlined" />
                    <LoadingButton loading={load}  className={`${!load?'!bg-blue-700':''}`} type='submit' variant='contained'>Log In</LoadingButton>
                    <div onClick={()=>navigate("/signup")} className='text-sm outlin text-right cursor-pointer hover:underline'>
                    ...sign up instead?
                    </div>
                </form>
                
            </div>
        
        </div>
    )
}
