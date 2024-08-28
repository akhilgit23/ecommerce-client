import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout';
import {useNavigate,useLocation} from 'react-router-dom'
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import { axiosInstance } from '../../config/axiosInstance';

const Login = () => {
    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [auth,setAuth] = useAuth()
   
    const navigate = useNavigate();
    const location = useLocation();

     //default behaviour||form
     const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
              const res = await axiosInstance({
                url:"/auth/login",
              method:"POST",
            data:{email,password},
            });
             if (res && res.data.success){
               toast.success(res.data && res.data.message);
               setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token,
               })
               localStorage.setItem("auth", JSON.stringify(res.data));
               navigate(location.state || "/");
             }else{
               toast.error(res.data.message)
             }
        }catch(error){
             console.log(error)
             toast.error("Something went wrong")
        }
     };
  return (
    <Layout title="Login - Ecommerce App">
        <div className="form-container mt-5">
         <form onSubmit={handleSubmit}>
     <h3 className='title'>LOGIN FORM</h3>
  <div className="mb-3">
    
    <input
     type="email" 
     value={email}
     onChange={(e) => setEmail(e.target.value)}
     className="form-control" 
     id="exampleInputemail" 
     placeholder='Enter Your Email'
     required
     />
    
  </div>
  <div className="mb-3">
    
    <input
     type="password"
     value={password}
     onChange={(e) => setPassword(e.target.value)}
      className="form-control" 
      id="exampleInputPassword1"
      placeholder='Enter Your Password'
      required
      />
  </div>
  <div className='mb-3'>
  <button type="button" className="btn btn-primary" onClick={() =>{navigate('/forgot-password')}}>
  Forgot Password</button>
  </div>
  <button type="submit" className="btn btn-primary">LOGIN</button>
 
</form>

 </div>
    </Layout>
  )
}

export default Login;