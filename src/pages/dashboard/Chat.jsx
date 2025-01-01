import React, { useEffect } from 'react'
import Chat from '../../component/chat/chat'
import DashboardHeader from '../../component/layout/dashboard-header'
import { useSelector } from 'react-redux';

function ChatMain() {
  const userData = useSelector((state) => state.user);



  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token !== "" && userData.role =="user"){
      navigate("/dashboard/for-family")
    }else if(token && userData?.role== "nanny"){
      navigate("/dashboard/for-nanny")
  
    }else if( token && userData?.role== "admin"){
      navigate("/admin-dashboard/")
  
    }
    else if(token == ""){
      navigate("/auth/sign-in")
    }
  },[])
  
    
  return (
    <>
     <DashboardHeader>
       
      </DashboardHeader>
   <Chat/>
    </>
  )
}

export default ChatMain