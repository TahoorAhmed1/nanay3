import React, { useEffect } from 'react'
import Chat from '../../component/chat/chat'
import DashboardHeader from '../../component/layout/dashboard-header'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ChatMain() {

  const navigate = useNavigate();


//  useEffect(()=>{
//    const token = localStorage.getItem("token");
//     if(token !== ""){
//      navigate("/auth/sign-in")
//    }
//  },[])

    
  return (
    <>
     <DashboardHeader>
       
      </DashboardHeader>
   <Chat/>
    </>
  )
}

export default ChatMain