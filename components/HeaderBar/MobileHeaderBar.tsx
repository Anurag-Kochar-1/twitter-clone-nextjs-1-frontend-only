import React from 'react'
import { useSession } from "next-auth/react"

import { CgSun } from "react-icons/cg"
import { BsTwitter , BsMoonStarsFill} from "react-icons/bs"

import { useTheme } from "next-themes"

interface Props {
  hydrated:boolean
}

const MobileHeaderBar = ( {hydrated}:Props ) => {

    const {data : session} = useSession()

    const { systemTheme , theme , setTheme } = useTheme()
    const renderThemeChanger = () => {

    if(!hydrated) return null

    const currentTheme = theme === 'system' ? systemTheme : theme

    if(currentTheme === "dark" ) {
      return (
        <BsMoonStarsFill className='w-6 h-6' role="button" 
          onClick={() => setTheme("light")}
        />
      )
    } else {
      return (
        <CgSun className='w-6 h-6' role="button" 
        onClick={() => setTheme("dark")}
      />
      )
    }
  }
    

  return (
    <div className='w-[100%] h-[10vh] flex justify-between items-center z-10 bg-gray-200 border-b border-b-gray-50  border-solid fixed top-0 px-4  
    dark:bg-black
    
    md:hidden '>

        <img src={session?.user?.image || "https://links.papareact.com/gll"} alt="dp" 
          className='h-10 w-10 object-cover rounded-full'
        />

        <p className='text-xl font-bold flex-1 px-3'> Home </p>

        {renderThemeChanger()}
    </div>
  )
}

export default MobileHeaderBar