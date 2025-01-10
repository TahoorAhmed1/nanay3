import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const withUserDetails = (WrappedComponent) => {
  return (props) => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
      const userCookie = localStorage.getItem("token");

      if (userCookie) {
        fetchUserDetails(userCookie);
      } else {
        setLoading(false);
        navigate("/auth/sign-in")
      }
    }, []);

    const fetchUserDetails = async (token) => {
      try {
        const response = await fetch(`https://nany-backend.vercel.app/auth/get-user`, {
          method: "GET", 
          headers: {
            Authorization: token, 
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          localStorage.clear("token")
          navigate("/auth/sign-in")

        }
        const data = await response.json();
        setUserDetails(data?.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      return <div className=" min-h-screen flex justify-center items-center"></div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if(userDetails?.role !== "admin" && !userDetails?.selectPackage?._id   ){
        return       navigate("/package")
    }else{
      if(userDetails?.role !== "admin" && userDetails?.selectPackage?._id ){
        return <WrappedComponent {...props} userDetails={userDetails} />;
    }

    }

  };
};

export default withUserDetails;
