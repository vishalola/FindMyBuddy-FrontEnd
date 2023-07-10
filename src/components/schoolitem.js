import axios from "axios"
import BuddyItem from "./buddyitem"
export default function SchoolItem(props){

    let handleClick=()=>{
        axios.post("https://findmybuddy-backend.onrender.com/getBuddy",{
            "school":props.name
        }).then(res=>{
            let data=res.data
            props.setBuddyList([]);
            for(let i=0;i<data.length;i++)
            {
                if(data[i].userName!==props.username)
                props.setBuddyList(list=>[...list,
                    <BuddyItem 
                    key={i}
                    name={data[i].Name }
                    username={data[i].userName}
                    email={data[i].Email}
                    number={data[i].Number}
                    setC_Name={props.setC_Name} setC_Username={props.setC_Username} setEmail={props.setEmail} setNumber={props.setNumber} setContact={props.setContact}/>
                ])
            }
        })
    }
    return (
        <div 
        onClick={handleClick}
        className="outlin transition-all shadow-sm hover:bg-blue-700 hover:text-white cursor-pointer my-1 px-6 py-3 ">
            {props.name}
        </div>
    )
}