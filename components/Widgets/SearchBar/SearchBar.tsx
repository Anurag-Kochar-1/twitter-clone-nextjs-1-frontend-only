import React from 'react'
import {FiSearch} from "react-icons/fi"

function SearchBar() {

  return (
    <div className='flex items-center space-x-2 bg-gray-100 p-3 rounded-full mt-2 mb-4 dark:bg-[#202020] '>
        <FiSearch className='W-5 h-5 text-gray-400'/>
        <input 
        type="text" 
        placeholder='Search Twitter' 
        className='bg-transparent outline-none flex-1 border-none' />
    </div>
  )
}

export default SearchBar