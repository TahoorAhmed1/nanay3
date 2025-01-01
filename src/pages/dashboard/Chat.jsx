import React, { useState } from 'react'
import Chat from '../../component/chat/chat'
import DashboardHeader from '../../component/layout/dashboard-header'

function ChatMain() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleInput = () => {
    setIsVisible((prev) => !prev);
  };
  
    
  return (
    <>
     <DashboardHeader onClickSearch={toggleInput}>
       
      </DashboardHeader>
   <Chat/>
    </>
  )
}

export default ChatMain