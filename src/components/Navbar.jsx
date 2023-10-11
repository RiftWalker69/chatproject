import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
const Navbar = () =>{
    const {currentUser} = useContext(AuthContext);
    return (
        <div className="Navbar">
            <span className="logo" >ChatBox</span>
            <div className="user">
                <img src={ currentUser.photoURL } alt="" />
                <span>{ currentUser.displayName }</span>
                <button onClick={()=>signOut(auth)}> LogOut </button>
            </div>
            
        </div>
    );
}
export default Navbar;
