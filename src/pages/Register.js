import React, { useState } from 'react'
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {auth, db, storage} from "../firebase"
import gallery from "../icons/galleryicon.png";
import bg from "../icons/background.gif";
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
const Register = () =>{
  const navigate = useNavigate();
  const [err,setErr] = useState(false);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const displayName = e.target[0].value;
        const email =e.target[1].value;
        const password = e.target[2].value;
        const file =e.target[3].files[0];
        try{
          const res = await createUserWithEmailAndPassword(auth, email, password);


const storageRef = ref(storage, displayName);

const uploadTask = uploadBytesResumable(storageRef, file);
uploadTask.on('state_changed', 
  (snapshot) => {

    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    setErr(true);
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
      await updateProfile(res.user,{
        displayName,
        photoURL: downloadURL,
      })
      await setDoc(doc(db, "users", res.user.uid),
      {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadURL
      });
      await setDoc(doc(db,"userChats", res.user.uid),{});
      navigate("/");
    });
  }
);
        }catch(err){
          setErr(true);
        }
        
    }
    return(
    
      <div className='formcontainer'>
            
            <div className='formwrap'>
                <form onSubmit={handleSubmit}>
                <span className='tittle'>Register</span>
                    <input type='text' placeholder='Display Name' />
                    <input type='email' placeholder='Email' />
                    <input type='password' placeholder='Password' />
                    <input style={{display: "none"}} type='file' id='file'/>
                    <label htmlFor='file'>
                        <img src={gallery} alt=''/>
                        <span> Add an avatar </span></label>     
                    <button> Sign up </button>
                    {err&&<span>Something is wrong</span>}
                    <p>You do have an account then <Link to={"/login"} >Login</Link></p>
                </form>
            </div>
          </div>
          
       
    );
}
export default Register;