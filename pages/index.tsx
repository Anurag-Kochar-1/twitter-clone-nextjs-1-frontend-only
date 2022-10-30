import {  useState , useEffect } from "react"
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed/Feed'
import Sidebar from '../components/Sidebar/Sidebar'
import Widgets from '../components/Widgets/Widgets'
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import { Toaster } from "react-hot-toast"

import 'react-toastify/dist/ReactToastify.css';
import MobileHeaderBar from "../components/HeaderBar/MobileHeaderBar"
// import { ToastContainer } from 'react-toastify';

interface Props {
  tweets: Tweet[]
}

const Home = ({ tweets }:Props ) => {
  // console.log(tweets);
  console.log('---------------------------------- index.js is executed ----------------------------------');



  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHydrated(true)
    console.log(`setHydrated is set to true from index.tsx`);
    
  },[])




  if(!hydrated) return null
  
  return (

    <div className="lg:max-w-7xl mx-auto max-h-screen overflow-hidden">
    
      <Head>
        <title> Twitter Clone </title>
        <link rel="shortcut icon" href="/twitterfavicon.ico" />
      </Head>

      <header>
        <MobileHeaderBar hydrated={hydrated} />
      </header>

      {/* <main className='grid grid-cols-9 grid-rows-6'> */}
      <main className='grid grid-cols-9 mt-[10vh] md:mt-0'>

         <Sidebar hydrated={hydrated} />
         <Feed tweets = {tweets} hydrated={hydrated} />
         <Widgets />


      </main>

      
    </div>
  )
}

export default Home

export const getServerSideProps:GetServerSideProps = async (context) => {
  console.log("getServerSideProps function is running");
  

  const tweets = await fetchTweets()
  return {
    props: {
      tweets
    }
  }
}