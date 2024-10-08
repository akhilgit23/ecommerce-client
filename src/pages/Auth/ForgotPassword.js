import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout';
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import api from '../../api';




const ForgotPassword = () => {
    
    const [email,setEmail] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [answer,setAnswer] = useState("");

    const navigate = useNavigate();
    

     //default behaviour||form
     const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
          const res = await api.post("/api/v1/auth/forgot-password", {
            email,
            newPassword,
            answer,
          });
             if (res && res.data.success){
               toast.success(res.data && res.data.message);
              
              navigate("/login");
             }else{
               toast.error(res.data.message)
             }
        }catch(error){
             console.log(error)
             toast.error('Something went wrong')
        }
     };
  return (
    <Layout title={'Fogot Password'}>
         <div className="form-container mt-5">
           
     <form onSubmit={handleSubmit}>
     <h4 className='title'>RESET PASSWORD</h4>
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
     type="text" 
     value={answer}
     onChange={(e) => setAnswer(e.target.value)}
     className="form-control" 
     id="exampleInputanswer" 
     placeholder='Enter Your Secret Color'
     required
     />
    
  </div>
  <div className="mb-3">
    
    <input
     type="password"
     value={newPassword}
     onChange={(e) => setNewPassword(e.target.value)}
      className="form-control" 
      id="exampleInputPassword1"
      placeholder='Enter Your Password'
      required
      />
  </div>
 
  <button type="submit" className="btn btn-primary">RESET</button>
 
</form>

 </div>
    </Layout>
  )
}

export default ForgotPassword;