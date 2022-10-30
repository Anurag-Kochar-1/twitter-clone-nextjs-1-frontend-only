import React from 'react'
import { IconType } from 'react-icons'


interface Props {
    Icon:  IconType
    title: string
    onClick?: () => {}
}

function SidebarRow( {Icon, title , onClick}: Props){
  return (

    <div onClick={() => onClick?.() } className='max-w-fit group flex items-center space-x-3 px-4 py-3 rounded-full  hover:bg-gray-100 dark:hover:bg-gray-800 hover:cursor-pointer 
    transition-all duration-200 
    '>
        <Icon className='w-6 h-6 dark:text-white dark:border-none'/>

        <p className='hidden lg:inline-flex group-hover:text-twitter
        text-base font-medium lg:text-xl lg:font-medium
        '> {title} </p>
    </div>
  )
}

export default SidebarRow