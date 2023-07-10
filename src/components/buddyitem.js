export default function BuddyItem(props){

    return (
        <div 
        onClick={()=>{
            props.setC_Name(props.name);
            props.setC_Username(props.username);
            props.setEmail(props.email);
            props.setNumber(props.number);
            props.setContact(true);
        }}
        className="outlin transition-all shadow-sm hover:bg-blue-700 hover:text-white cursor-pointer my-1 px-6 py-3 ">
            {props.name}
        </div>
    )
}