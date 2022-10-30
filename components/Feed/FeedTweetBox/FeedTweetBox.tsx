import React , {useState , useRef, useEffect} from 'react'
import { AiOutlineCalendar ,  } from "react-icons/ai"
import { BsEmojiSmile } from "react-icons/bs"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { BiImage } from "react-icons/bi"
import { useSession } from "next-auth/react"
import {  Tweet, TweetBody } from '../../../typings'
import { fetchTweets } from '../../../utils/fetchTweets'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// import data from '@emoji-mart/data'
// import Picker from '@emoji-mart/react'
// import "emoji-mart/css/emoji-mart.css";

interface Props {
    setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
}


function FeedTweetBox( {setTweets}:Props ) {


    const notify = () => toast.success('Tweet Added' , {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    const [input, setInput] = useState<string>('')
    const { data: session } = useSession()
    
    const [imageUrlBoxIsOpen , setImageUrlBoxIsOpen] = useState <boolean> (false)
    const [emojiPickerBoxIsOpen , setEmojiPickerBoxIsOpen] = useState <boolean> (false)
    const [image, setImage] = useState<string>('')
    const imageInputRef = useRef<HTMLInputElement>(null)


    

    const handleRefresh = async () => {
        console.log('refreshing feed function is executed from FeedTweetBox');
        
        const fetchingNewtweets = await fetchTweets()
    
        // variable name changed to fetchingNewtweets from tweets
        setTweets(fetchingNewtweets)
        alert("updated")
    
      }

    

    const addImageToTweet =  (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if(!imageInputRef.current?.value) return;
        setImage(imageInputRef.current?.value)
        imageInputRef.current.value = ""
        setImageUrlBoxIsOpen(false)

    }


    // ADDING TWEET TO BACKEND THROUGH MUTATIONS
    const postTweet = async () => {
        try {
            console.log('postTweet is running')
            const tweetInfo: TweetBody = {
                text: input,
                username: session?.user?.name || "Unknown User",
                profileImg: session?.user?.image || "https://links.papareact.com/gll",
                image: image
            }
    
            const result = await fetch(`/api/addTweet`, {
                body: JSON.stringify(tweetInfo),
                method: "POST"
            })
    
            const json = await result.json()

            
    
            // const newTweets = await fetchTweets()
            
            // setTimeout(() => {
            //     setTweets(newTweets)
            //     console.log('setTweets is executed after 5000ms');
            // }, 5000);
            

        } catch (error) {
            alert('error occurred')
        }

        // return json
    }

    
    const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
        e.preventDefault()
        
        postTweet()

        setTimeout(() => {
            helperTest()
        }, 4000);
        

        
            
        

        setInput('')
        setImage('')
        setImageUrlBoxIsOpen(false)
    }

    const helperTest = async () => {
        console.log(`helperTest function is running`);
        
        const newTweets = await fetchTweets()

        setTimeout(() => {
            setTweets(newTweets)
            console.log('setTweets is executed after 5000ms');
            notify()
        }, 5000);
    }


    // onClick={() => setEmojiPickerBoxIsOpen(!emojiPickerBoxIsOpen)}

    // const addEmoji = (e:any) => {
    //     let symbol = e.unified.split("-");
    //     let codesArray:any[] = [];
    //     symbol.forEach((el:any) => codesArray.push("0x" + el));
    //     let emoji = String.fromCodePoint(...codesArray);
    //     setInput(input + emoji);
    // }

    // const closeEmojiPicker = () => {
    //     console.log('111111111111111'); 
    // }

    
    
  return (
    <div className='flex space-x-2 p-5 '>

        <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />

        <img className='h-14 w-14 object-cover rounded-full mt-4' src={ session?.user?.image || "https://links.papareact.com/gll" } alt="pp" />

        <div className='flex flex-1 items-center pl-2 '>
            <form className='flex flex-1 flex-col'>
                <input 
                    type="text"
                    placeholder="What's Happening?"
                    className='h-24 px-2 rounded-lg w-full text-xl outline-none placeholder:text-xl dark:bg-[#121212]'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                 />

                 <div className='flex items-center py-4 '>
                    <div className='flex flex-1 space-x-2 text-twitter'>
                        <BiImage  
                            className='h-5 w-5 cursor-pointer 
                            transition-transform duration-150 ease-out hover:scale-150' 
                            onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                            
                        />
                        <BsEmojiSmile 
                            className='h-5 w-5 cursor-pointer 
                            transition-transform duration-150 ease-out hover:scale-150'
                            
                            />
                        <AiOutlineCalendar className='h-5 w-5' />
                        <HiOutlineLocationMarker className='h-5 w-5' />
                    
                    </div>

                    <button 
                        disabled={!input || !session} 
                        className='bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40 disabled:cursor-not-allowed'
                        onClick={handleSubmit}
                        >  
                        Tweet
                    </button>
                 </div>

                 {imageUrlBoxIsOpen && (
                    <form className='mt-5 flex rounded-lg bg-twitter/80 px-4 py-2'>
                        <input 
                            type="upload" 
                            placeholder='Enter Image URL' 
                            className='flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white'
                            ref={imageInputRef}
                            />

                        <button
                            type='submit'
                            className='font-bold text-white'
                            onClick={ addImageToTweet}
                        > Add Image </button>
                    </form>
                 )}

                 {/* {emojiPickerBoxIsOpen && (
                    <Picker
                        data={data} 
                        onEmojiSelect={addEmoji}
                        onClickOutside={closeEmojiPicker}
                  />
                 )} */}

                 {
                    image && (
                        <img 
                            src={image} 
                            alt="tweet-image" 
                            className='mt-10 h-40 w-full rounded-xl object-contain shadow-lg'
                        />
                    )
                 }
            </form>  
        </div>
    </div>
  )
}

export default FeedTweetBox