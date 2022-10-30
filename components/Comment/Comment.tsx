import React from 'react'
import { Comment } from '../../typings'
import TimeAgo from "react-timeago"

interface Props {
    commentData : Comment
}

function Comment( {commentData}:Props ) {
  return (
    <div className='flex relative space-x-2'>

        <hr className='absolute left-5 top-10 h-8 border-x border-twitter/30' />
        <img src={commentData.profileImg} alt="profile-img" 
            className='h-7 w-7 mt-2 mr-1 object-contain rounded-full'
        />

        <div>
            <div className='flex items-center space-x-1'>
                <p className='mr-1 font-bold '> {commentData.username} </p>
                <p className='hidden text-sm text-gray-500 lg:inline'> @{commentData?.username.replace(/\s+/g, '').toLowerCase()} • </p> 

                <TimeAgo 
                className="text-sm text-gray-500"
                date={commentData._createdAt}
                />
            </div>

            <p> {commentData.comment} </p>
        </div>
    </div>
  )
}

export default Comment