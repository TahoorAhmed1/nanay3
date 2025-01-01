import React, { useEffect, useState } from "react";
import AuthBg from "@/assets/auth/auth-bg.png";
import { H6, Font2 } from "@/config/typography";
import InputField from "@/component/common/input";
import Button from "@/component/dashboard/button";
import { useNavigate } from "react-router-dom";
import Toast from "@/component/common/toast";
import { Post } from "@/config/api-method";
import { BackArrow } from "@/config/app-constant";
import line from "@/assets/auth/horizental.png";
import { storeData } from "@/config/helper";
import { useDispatch, useSelector } from "react-redux";
import { add } from "@/redux/reducers/userSlice";
import OTPInput from "@/component/common/otpField";
import { VscLoading } from "react-icons/vsc";

export default function AuthSignIn() {
  const [login, setLogin] = useState(true);
  const [forgetpassword, setForgetPassword] = useState(false);
  const [Otp, setOtp] = useState(false);
  const [otpData, setOtpData] = useState({});
  const [resetPassword, setResetPassword] = useState(false);
  const [timer, setTimer] = useState(600); // 2 minutes
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [model, setModel] = useState({});
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  const role = useSelector((state) => state?.user?.role);
  useEffect(()=>{
    const token = localStorage.getItem("token");
    console.log(token,'role', role, "token")
  if(token && role== "user"){
    navigate("/dashboard/for-family")
  }else if(token && role== "nanny"){
    navigate("/dashboard/for-nanny")

  }else if( token && role== "admin"){
    navigate("/admin-dashboard/")

  }
},[])

  const fillModel = (key, val) => {
    setModel((prevModel) => ({
      ...prevModel,
      [key]: val,
    }));
  };

  const showToast = (message, type) => {
    setToast({ isVisible: true, message, type });

    setTimeout(() => {
      setToast({ ...toast, isVisible: false });
    }, 3000);
  };
 
const [loading,setLoading]=useState(false)
  const save = () => {
    if (!model.email || !model.password) {
      showToast("Email and password are required.", "error");
      return;
    }
    setLoading(true)
    model.isSuccessfull = true;
    // console.log(model);
    Post("auth/login", model)
      .then((res) => {
        if (res?.data) {
          dispatch(add(res?.data?.user));
          storeData("token", res.data?.token);

       
          setTimeout(()=>{
            setLoading(false)
            navigate(
              res?.data?.user?.role === "admin"
                ? "/admin-dashboard"
                : "/welcome-dashboard",
              { state: { loggedIn: true } }
            );
          },2000)
        } else {
          
          showToast("Unexpected response format.", "error");
        }
      })
      .catch((err) => {
        setTimeout(()=>{
          setLoading(false)
          showToast("Login failed. Please check your credentials.", "error");
        },2000)
      });
  };

  const googleAuth = () => {
    window.open(`http://localhost:5000/auth/google/callback`, "_self");
  };

  const handleForgetPassword = () => {
    setLogin(false);
    setForgetPassword(true);
  };

  const [isForgot,setIsForgot]=useState(false)
  const handleOtp = () => {
    if (!model.email) {
      showToast("Email is required.", "error");
      return;
    }
    setIsForgot(true)
    Post("auth/forgotpassword", model)
      .then((res) => {
        setOtpData({ ...res?.data });
       
        
        setTimeout(()=>{
          showToast("OTP sent to your email", "success");
          setForgetPassword(false);
          setOtp(true);
          setIsForgot(false)
        },2000)
      })
      .catch((err) => {
        setTimeout(()=>{
        
          showToast("Login failed. Please check your credentials.", "error");
          setIsForgot(false)
        },2000)
      });
  };
  const handleOtpComplete = (otp) => {
    console.log("OTP entered:", otp);
    setOtp(false);
    setResetPassword(true);
  };

  const[isRecovery,setIsRecovery]=useState(false)
  const RecoverPassword = () => {
    model.resetToken = otpData.resetPasswordToken;
    model.otp = otpData.resetPasswordOTP;
    setIsRecovery(true)
    Post("auth/resetpassword", model)
      .then((res) => {
        setTimeout(()=>{
          showToast("Password Recover Successfully", "success");
          
          setIsRecovery(false)
          setLogin(true);
          setResetPassword(false);
        },2000)
      })
      .catch((err) => {
        setTimeout(()=>{
       
          setIsRecovery(false)
          showToast(err.message, "error");
        },2000)
      });
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  return (
    <>
      <div
        className=" min-h-[100dvh] relative"
        style={{ background: `url(${AuthBg}) 100% 100% / cover no-repeat` }}
      >
        <div className="flex justify-center items-center m-auto pt-[50px]">
          {login && (
            <div className="bg-white w-[97%] md:w-[85%] lg:w-[60%] xl:w-[40%] border shadow-lg rounded-md px-2">
              <div className="border-b border-gray-300 relative py-3">
                <button
                  className="absolute top-[40%] left-[30px]"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  {" "}
                  <BackArrow />
                </button>{" "}
                <H6 className="text-center py-3 capitalize ">Log In</H6>
              </div>
              <div className="md:w-2/3 px-2 w-full mx-auto text-center pb-14 pt-8">
                <div className="mb-[35px]">
                  <InputField
                    type="text"
                    label="Email*"
                    value={model.email || ""}
                    onChange={(e) => fillModel("email", e.target.value)}
                    className="input-class"
                  />
                </div>

                <div className="">
                  <InputField
                    type="password"
                    label="Password*"
                    value={model.password || ""}
                    onChange={(e) => fillModel("password", e.target.value)}
                    inputClass="bg-transparent mt-4 px-6 py-3 rounded-full border-gray-300 border
                     text-gray-900 text-sm  block w-full 
                      focus:outline-none"
                  />
                  <Font2 className="pt-0 mt-0 pb-2 text-end me-2">
                    <span
                      className="text-[#666666] text-xs italic cursor-pointer hover:underline"
                      onClick={handleForgetPassword}
                    >
                      Forget Password{" "}
                    </span>{" "}
                  </Font2>
                </div>

                <Button
                  className="w-[100%] capitalize rounded-[35px] py-2 px-6 bg-[#FF6F61] text-white text-[22px] font-bold mt-2 mb-4"
                  onClick={save}
                  disabled={loading}
                >
                  {loading ? <VscLoading className=" animate-spin w-7 h-7 mx-auto"/> :"Next"}
                </Button>
                <img src={line} />
                <Font2 className="pt-4 text-center">
                  <span className="text-[#666666]">
                    Don't have an account?{" "}
                  </span>{" "}
                  <span
                    className="text-[#FF6F61] md:font-extrabold font-bold cursor-pointer"
                    onClick={() => {
                      navigate("/auth/sign-up");
                    }}
                  >
                    Get Started{" "}
                  </span>
                </Font2>
              </div>
            </div>
          )}
          {forgetpassword && (
            <div className="bg-white w-[97%] md:w-[85%] lg:w-[60%] xl:w-[40%] border shadow-lg rounded-md ">
              <div className="border-b border-gray-300 relative py-3">
                <button
                  className="absolute top-[40%] left-[30px]"
                  onClick={() => {
                    setForgetPassword(false);
                    setLogin(true)
                  }}
                >
                  {" "}
                  <BackArrow />
                </button>{" "}
                <H6 className=" text-center py-3 capitalize h-full">
                  Forget Password
                </H6>
              </div>
              <div className="md:w-2/3 w-full px-2 mx-auto text-center pb-8 pt-8">
                <Font2 className="text-sm text-[#666] text-center mb-6">
                  Reset your password by receiving create password link on your
                  registered Email ID please enter your registered Email Id
                  Below
                </Font2>
                <div className="">
                  <InputField
                    type="text"
                    label="Email*"
                    value={model.email || ""}
                    onChange={(e) => fillModel("email", e.target.value)}
                    className="input-class"
                  />
                </div>
                <Button
                  className="w-[100%] rounded-[35px] py-1 px-6 bg-[#FF6F61] text-white text-[22px] font-bold mb-4"
                  onClick={handleOtp}
                  disabled={isForgot}
                >
                  {isForgot ?  <VscLoading className=" animate-spin w-7 h-7 mx-auto"/>:"Next" }
                </Button>
              </div>
            </div>
          )}
          {Otp && (
            <div className="bg-white w-[97%] md:w-[85%] lg:w-[60%] xl:w-[40%] border shadow-lg rounded-md ">
              <div className="border-b border-gray-300 relative py-3">
                <button
                  className="absolute top-[40%] left-[30px]"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  {" "}
                  <BackArrow />
                </button>{" "}
                <H6 className=" text-center py-3 capitalize h-full">
                  OTP Verification
                </H6>
              </div>
              <div className="w-2/3 mx-auto text-center pb-8 pt-8">
                <Font2 className="text-sm text-[#666] text-center mb-4">
                  Reset your password by receiving create password link on your
                  registered Email...
                </Font2>
                <div className="mb-3">
                  <OTPInput length={6} onComplete={handleOtpComplete} />
                  <p className="italic text-end text-sm pt-1">{formatTime()}</p>
                </div>
              </div>
            </div>
          )}
          {resetPassword && (
            <div className="bg-white w-[97%] md:w-[85%] lg:w-[60%] xl:w-[40%] border shadow-lg rounded-md ">
              <div className="border-b border-gray-300 relative py-3">
                <button
                  className="absolute top-[40%] left-[30px]"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  {" "}
                  <BackArrow />
                </button>{" "}
                <H6 className="text-center py-3 capitalize ">
                  Re-set Password
                </H6>
              </div>
              <div className="md:w-2/3 px-2 w-full mx-auto text-center pb-14 pt-8">
                <div className="">
                  <InputField
                    type="password"
                    label="New Password*"
                    value={model.password || ""}
                    onChange={(e) => fillModel("password", e.target.value)}
                    inputClass="bg-transparent mt-4 px-6 py-3 rounded-full border-gray-300 border
                     text-gray-900 text-sm  block w-full 
                      focus:outline-none"
                  />
                </div>

                <Button
                  className="w-[100%] rounded-[35px] py-1 px-6 bg-[#FF6F61] text-white text-[22px] font-bold mt-2 mb-4"
                  onClick={RecoverPassword}
                  disabled={isRecovery}
                >
              {  isRecovery?    <VscLoading className=" animate-spin w-7 h-7 mx-auto"/>:"submit"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </>
    // <div className="bg-white w-[97%] md:w-[85%] lg:w-[60%] xl:w-[40%] border shadow-lg rounded-md">
    // 	<div className="border-b border-gray-300">
    // 		<H6 className="pB-5 mb-2 xl:mb-3 capitalize text-center py-3">Sign Up</H6>
    // 	</div>
    // 	<div className="w-2/3 mx-auto text-center pb-14 pt-8">
    // 		<Font1 className="pb-5">Tell us what you are looking for...</Font1>
    // 		<div className='flex justify-center'>
    // 			<img src={imgbaby} />
    // 		</div>

    // 		<Radiobutton
    // 			id="user"
    // 			name="role"
    // 			value="user"
    // 			onChange={(e) => {
    // 				fillModel("role", e.target.value);
    // 				nextStep();
    // 			}}
    // 			label="I am looking to hire a nanny"
    // 			checked={model.role === "user"}
    // 		/>
    // 		<Radiobutton
    // 			id="nanny"
    // 			name="role"
    // 			value="nanny"
    // 			onChange={(e) => {
    // 				fillModel("role", e.target.value);
    // 				nextStep();
    // 			}}
    // 			label="I am looking to find a job"
    // 			checked={model.role === "nanny"}
    // 		/>
    // 		<Font2 className="py-1 text-center"><span className='text-[#666666]' >Already have an account? </span> <span className='text-[#FF6F61] md:font-extrabold font-bold'>Login</span></Font2>
    // 	</div>
    // </div>
    // <div className={styles.container}>
    // 	<h1 className={styles.heading}>Log in Form</h1>
    // 	<div className={styles.form_container}>
    // 		<div className={styles.left}>
    // 			<img className={styles.img} src="./images/login.jpg" alt="login" />
    // 		</div>
    // 		<div className={styles.right}>
    // 			<h2 className={styles.from_heading}>Members Log in</h2>
    // 			<input type="text" className={styles.input} placeholder="Email" />
    // 			<input type="text" className={styles.input} placeholder="Password" />
    // 			<button className={styles.btn}>Log In</button>
    // 			<p className={styles.text}>or</p>
    // 			<button className={styles.google_btn} onClick={googleAuth}>
    // 				<img src="./images/google.png" alt="google icon" />
    // 				<span>Sing in with Google</span>
    // 			</button>
    // 			<p className={styles.text}>
    // 				New Here ? <Link to="/signup">Sing Up</Link>
    // 			</p>
    // 		</div>
    // 	</div>
    // </div>
  );
}
