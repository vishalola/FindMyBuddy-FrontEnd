import {FaUserCircle} from 'react-icons/fa'
import { Autocomplete,TextField } from '@mui/material'
import SchoolItem from './schoolitem';
import ContactCard from './contact';
import { useState,useEffect } from 'react';
import axios from 'axios';
import image from '../assets/background-wide.jpeg'
import image2 from '../assets/background.jpeg'
import Skeleton from '@mui/material/Skeleton';
export default function Profile(props){
    const [loading,setLoading]=useState(true);
    const [schoolLoad,setSchoolLoading]=useState(false);

    const [showContact,setContact]=useState(false);
    const [c_name,setC_Name]=useState('Sahil Yadav');
    const [c_username,setC_Username]=useState('ysahil');
    const [c_email,setEmail]=useState('sahil555@gmail.com');
    const [c_number,setNumber]=useState('8003912438');
    const [schoollist,setSchoolList]=useState([]);
    const [buddylist,setBuddyList]=useState([]);
    const [selectedSchool,setSelectedSchool]=useState('');
    const availableSchools = [
        { title: "St. Xavier's School, Behror", year: 1994 },
        { title: "Sachdeva Millenium School", year: 1972 },
        { title: "Gyan Mata Vidya Vihar Sen. Sec. School, Nanded", year: 1974 },
        
      ];

      useEffect(()=>{

        if(props.isLogged===true)
        {
            axios.post("https://findmybuddy-backend.onrender.com/getSchool",{
                "username":props.username
            }).then(res=>{
                setLoading(false);
                setSchoolLoading(true);
                let data=res.data
                for(let i=0;i<data.length;i++)
                {
                    setSchoolList(list=>[...list,<SchoolItem key={i} username={props.username}  setBuddyList={setBuddyList} name={data[i]}
                        setC_Name={setC_Name} setC_Username={setC_Username} setEmail={setEmail} setNumber={setNumber} setContact={setContact}
                    />])
                }
            })
        }
    },[props.isLogged,props.username])

    let addSchool=()=>{
        if(selectedSchool.length!==0)
        {
            let exists=false;
            for(let i=0;i<schoollist.length;i++)
            {
                if(schoollist[i].props.name===selectedSchool)
                {   
                    exists=true;
                }
            }
            if(!exists)
            {
                axios.post("https://findmybuddy-backend.onrender.com/addSchool",{
                    "username":props.username,
                    "school":selectedSchool
                }).then(()=>{
                    setSchoolList(list=>[...list,<SchoolItem key={schoollist.length} username={props.username} setBuddyList={setBuddyList} name={selectedSchool}
                        setC_Name={setC_Name} setC_Username={setC_Username} setEmail={setEmail} setNumber={setNumber} setContact={setContact}
                    />])
                })
            }
        }
    }
      
    if(props.isLogged===false)
    {
        return(
            <div className="h-full w-full flex justify-center items-center">
            <img className={ `z-[-10] fixed outlin h-full w-full object-cover object-bottom`} alt="missing" src={window.outerWidth<=650?image2:image}/>
                <div className='border-b-4 border-blue-700 text-3xl p-3 bg-[#ffffffad] backdrop-blur-sm  '>
                    You're not <div className='text-blue-700 inline'>logged</div> in
                </div>
            </div>
        )
    }
    else
    {
        return(
            
            <div className=" h-full w-full flex justify-center items-center md:items-start ">
            <img className={ `z-[-10] fixed outlin h-full w-full object-cover object-bottom`} alt="missing" src={window.outerWidth<=650?image2:image}/>
                {showContact && <ContactCard name={c_name} username={c_username} email={c_email} setContact={setContact} number={c_number} />}
                <div className="bg-white relative w-[90%] h-[60vh] md:h-fit md:mt-32  overflow-scroll shadow-xl border-b-4 border-blue-700 flex md:flex-col ">
                    <div className="outlin w-[80%] md:w-full  h-fit">
                            <div className='outlin  flex items-center p-3'>
                                <div className='mx-4 text-6xl text-blue-700'>
                                <FaUserCircle/>
                                </div>
                                <div className='outlin'>
                                    {loading?<Skeleton variant='text' width={100} height={50}/>:
                                        <div className='text-2xl text-blue-700'>
                                            {props.name}
                                        </div>}
                                        
                                    <div className='text-sm text-gray-500'>
                                        {props.email}
                                    </div>
                                    <div className='text-sm text-gray-500'>
                                        {props.number}
                                    </div>
                                </div>
                            </div>
                            <div className='outlin flex  px-3 py-2'>
                                <Autocomplete
                                onChange={(e,value)=>{
                                    setSelectedSchool(value);
                                }}
                                className='w-full'
                                options={availableSchools.map((option) => option.title)}
                                renderInput={(params) => <TextField {...params} label="Search Your School" />}
                                />
                                <button
                                onClick={addSchool}
                                className='rounded px-6 bg-blue-700 text-white mx-3'>
                                    Add
                                </button>
                            </div>
                            <div className='outlin m-2'>
                                <div className='outlin px-2 py-2 text-lg font-semibold text-gray-500'>
                                    Your Schools
                                </div>
                                <div className='overflow-scroll outlin h-[250px] mx-1 shadow-inner'>
                                {schoolLoad?schoollist:<Skeleton variant="rectangular " height={250}/>
}
                                </div>
                            </div>
                    </div>
                    <div className="shadow-xl w-[300px] md:w-full">
                            <div className='outlin px-3 py-2 text-2xl text-blue-700'>
                                Buddies
                            </div>
                            <div className=' px-2 outlin  h-[400px] overflow-scroll'>
                                {buddylist}
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}