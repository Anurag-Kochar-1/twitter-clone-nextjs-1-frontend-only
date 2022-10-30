import React, { useState , useEffect } from 'react'
import {BiRefresh} from "react-icons/bi"
import { Tweet } from '../../typings'
import FeedTweetBox from './FeedTweetBox/FeedTweetBox'
import TweetComponent from "../Tweet/Tweet"
import { fetchTweets } from '../../utils/fetchTweets'
import { GetServerSideProps } from 'next'
import { useTheme } from 'next-themes'
import { BsMoonStarsFill } from 'react-icons/bs'
import { CgSun } from 'react-icons/cg'
// import toast , {Toaster} from 'react-hot-toast';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



interface Props {
  tweets : Tweet[]
  hydrated: boolean
}

function Feed( {tweets : tweetsProp, hydrated}:Props ) {
  

  const [tweets, setTweets] = useState <Tweet[]> (tweetsProp)

  const handleRefresh = async () => {
    console.log('refreshing feed.. is executed');
    

    const fetchingNewtweets = await fetchTweets()

    // variable name changed to fetchingNewtweets from tweets
    setTweets(fetchingNewtweets)
    alert("updated")

  }

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



  
  // const [hydrated, setHydrated] = useState<boolean>(false);

  // useEffect(() => {
  //   setHydrated(true)
  //   console.log(`setHydrated is set to true`);
    
  // },[])


  // if(!hydrated) return null

  return (
    <div className='col-span-9 md:col-span-7 lg:col-span-5 border-x max-h-screen overflow-scroll scrollbar-hide dark:border-gray-700 dark:bg-[#121212]'>


      <div className='hidden md:relative md:flex items-center justify-between py-5 px-2'>

        <h1 className=' text-xl font-bold flex-1'> Home </h1>

        <BiRefresh className='w-8 h-8 cursor-pointer text-twitter mr-5  transition-all duration-500 ease-out 
        hover:rotate-180 active:scale-125 '
        onClick={handleRefresh}
        />

        
        {renderThemeChanger()}
        

      </div>

      <div>
        <FeedTweetBox setTweets={setTweets} />
      </div>

      <div>
      {/* <button onClick={() => console.log(tweets)} > LOG tweets </button> */}
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>


    </div>
  )
}

export default Feed


