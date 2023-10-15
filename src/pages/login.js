import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import { auth } from "../firebase";

const Login = () =>{

    const navigate = useNavigate();
  const [err,setErr] = useState(false);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const email =e.target[0].value;
        const password = e.target[1].value;
        try{
          const res = await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    }catch(err){
          setErr(true);
        }
        
    }
    return(
        <div className='formcontainer'>
            <div className='formwrap'>
               
                <form onSubmit={handleSubmit}>
                <div className='logo'>
                  <img src='https://cdn-icons-png.flaticon.com/512/11527/11527872.png'/>
                  <span className='tittle'>Login</span>
                  </div>
                    <input type='email' placeholder='Email' />
                    <input type='password' placeholder='Password' />
                    <button> Sign in </button>
                    <p>If u dont have an account <Link to={"/register"}>Register</Link> </p>
                    {err&&<span>Something is wrong</span>}
                </form>
            </div>
          
        </div>
    );
}
export default Login;