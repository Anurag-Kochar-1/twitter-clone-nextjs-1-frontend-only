import React from 'react'
import { AiOutlinePlus } from "react-icons/ai"

const TweetButton = () => {
  return (

    <div className=' w-10 h-10 hidden  md:inline-flex  md:justify-center md:items-center rounded-full bg-twitter px-1 py-1  my-3
    lg:w-36 lg:px-5 lg:py-2 lg:text-center lg:my-4 cursor-pointer
    '>
        <AiOutlinePlus className='lg:hidden text-lg font-bold text-white' />
        
        <p className='hidden lg:inline text-white font-medium text-lg'> Tweet </p>
    </div>
  )
}

export default TweetButton