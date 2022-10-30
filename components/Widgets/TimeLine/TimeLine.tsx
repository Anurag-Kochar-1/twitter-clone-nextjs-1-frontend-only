import { TwitterTimelineEmbed } from "react-twitter-embed"

import React from 'react'

function TimeLine() {
  return (
    <div className="p-1 dark:bg-[#121212] scrollbar-hide ">
        
        <div className="dark:hidden ">
          <TwitterTimelineEmbed
              sourceType="profile"
              screenName="anurag__kochar"
              options={{height: 600}}
              theme={"light"}       
          />
        </div>

        <div className="hidden dark:inline ">
          <TwitterTimelineEmbed
              sourceType="profile"
              screenName="anurag__kochar"
              options={{height: 600}}
              theme={"dark"}   
          />
        </div>

      
    </div>
  )
}

export default TimeLine