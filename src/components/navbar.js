import { useNavigate } from 'react-router-dom';
export default function NavBar(props){
    const navigate=useNavigate();
    let signout=()=>{
        document.cookie = `isLoggedIn=false; path=/`;
        props.setLog(false);
        navigate("/");
    }
    if(props.isLogged===false)
    {
        return(
            <div className="py-3 z-[10] outlin bg-[#ffffffc0] backdrop-blur-sm   fixed w-full flex justify-between">
    
                <div 
                onClick={()=>navigate("/")}
                className="cursor-pointer text-2xl mx-4 outlin px-3 py-2 text-blue-700 font-semibold">
                    findmybuddy
                </div>
                <div className=" outlin flex justify-center items-center mx-6">
                    <button 
                    onClick={()=>{
                        navigate("/login")
                    }}
                    className="
                    font-light rounded-sm 
                    outline bg-blue-700 text-white text-xl px-3 py-1">
                        Login
                    </button>
                </div>
            </div>
        )
    }
    else
    {
        return(
            <div className="py-3 z-[10] outlin bg-[#ffffffc0] backdrop-blur-sm fixed w-full flex justify-between">
    
                <div 
                 onClick={()=>navigate("/")}
                className="cursor-pointer text-2xl mx-4 outlin px-3 py-2 text-blue-700 font-semibold">
                    findmybuddy
                </div>
                <div className=" outlin flex justify-center items-center mx-6">
                    <button 
                    onClick={signout}
                    className="
                    font-light rounded-sm 
                    outline bg-blue-700 text-white text-xl px-3 py-1">
                        Log Out
                    </button>
                </div>
            </div>
        )
    }
}