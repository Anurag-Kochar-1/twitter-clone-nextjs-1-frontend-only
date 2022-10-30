import React from 'react'
import SearchBar from './SearchBar/SearchBar'
import TimeLine from './TimeLine/TimeLine'


function Widgets() {
  return (
    <div className='hidden lg:inline-block max-h-screen col-span-2 px-2 mt-2 overflow-y-scroll overflow-x-hidden scrollbar-hide dark:bg-[#121212]'>

        <SearchBar />

        <TimeLine  />   
        
    </div>
  )
}

export default Widgets