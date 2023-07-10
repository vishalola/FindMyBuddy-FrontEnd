import {FaUserCircle} from 'react-icons/fa'
import {RxCross1} from 'react-icons/rx'
export default function ContactCard(props){

    return (
        <div className="fixed md:top-60  border-b-4 border-blue-700 z-[100] shadow-lg rounded-lg min-w-[300px] sm:min-w-[150px] max-w-[90%] py-10 px-4 bg-white flex flex-col ">
            <div 
            onClick={()=>{
                props.setContact(false);
            }}
            className='outlin cursor-pointer text-3xl sm:text-2xl w-fit absolute right-4 top-4'>
                <RxCross1/>
            </div>
            <div className='mb-5  outlin flex-col flex justify-center items-center text-5xl text-blue-700'>
                <FaUserCircle/>
                <div className='mt-2 text-black text-lg'>
                    {props.name}
                </div>
            </div>
            <div className='outlin px-4 mb-2 sm:text-sm flex'>
                <div className='text-gray-500 w-[120px] text-end mr-2'>
                    Username :
                </div>
                <div>
                        {props.username}
                </div>
            </div>
            <div className='outlin mb-2 px-4 sm:text-sm flex'>
                <div className='text-gray-500 w-[120px] text-end mr-2'>
                    Email :
                </div>
                <div>
                        {props.email}
                </div>
            </div>
            <div className='outlin px-4 sm:text-sm flex'>
                <div className='text-gray-500 text-end w-[120px] mr-2'>
                    Phone Number :
                </div>
                <div>
                        {props.number}
                </div>
            </div>
        </div>
    )
}