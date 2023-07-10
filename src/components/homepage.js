import image from '../assets/wide.png'
import image2 from '../assets/vertical.jpeg'
import { useNavigate } from 'react-router-dom';
export default function Home(props){

    const navigate=useNavigate();

    if(window.outerWidth<=650)
    {
        return(
            <>
            <img className={ `z-[-10] absolute outlin h-full w-full object-contain object-bottom`} alt="missing" src={image2}/>
            <div className='h-full w-full flex justify-center'>
                <div className='outlin mt-40'>
                    <div>
                        <div className='text-blue-700 outlin text-5xl flex justify-center font-light '>
                            findmybuddy 
                        </div>
                        <div className='text-center mt-2 text-sm text-gray-500'>
                            connect with you friends
                        </div>
                    </div>
                    <div className='text-center outlin my-5'>
                        <button 
                        onClick={()=>{
                            if(props.isLogged)
                                navigate("/profile");
                            else
                                navigate("/signup")

                        }}
                        className='
                        text-xl
                        border-b-2
                        border-blue-700
                        transition-all
                        text-blue-700
                        px-3 py-2  hover:text-white hover:bg-blue-700'>
                            Get Started
                        </button>
                    </div>
                </div>

            </div>
            </>
        )
    }
    else
    {
        return(
            <>
            <img className={ `z-[-10] absolute outlin h-full w-full object-cover`} alt="missing" src={image}/>
            <div className='h-full w-full flex justify-center items-center'>
                <div className='outlin w-[500px] mt-52'>
                    <div>
                        <div className='text-blue-700 outlin text-6xl flex justify-center font-light '>
                            findmybuddy 
                        </div>
                        <div className='text-center mt-2 text-base text-gray-500'>
                            connect with you friends
                        </div>
                    </div>
                    <div className='text-center outlin my-5'>
                        <button 
                        onClick={()=>{
                            if(props.isLogged)
                                navigate("/profile");
                            else
                                navigate("/signup")

                        }}
                        className='
                        text-xl
                        border-b-2
                        border-blue-700
                        transition-all
                        text-blue-700
                        px-3 py-2  hover:text-white hover:bg-blue-700'>
                            Get Started
                        </button>
                    </div>
                </div>

            </div>
            </>
        )
    }
}