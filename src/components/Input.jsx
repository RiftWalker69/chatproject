import React, { useContext, useState } from "react";
import gal from "../icons/gallery.png"
import send from "../icons/send.png"
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { v4 as uuid} from "uuid";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const Input = () =>{
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    
    const handleSend = async() =>{
        if(img){
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, img);
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
   // setErr(true);
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
        await updateDoc(doc(db, "chats",data.chatId),{
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img:downloadURL,
            }),
        })
    });
  }
);

        }else{
            await updateDoc(doc(db, "chats",data.chatId),{
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            })
            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [`${data.chatId}.lastMessage`]: {
                    text
                },
                [`${data.chatId}.date`]: serverTimestamp()
            });
            await updateDoc(doc(db, "userChats", data.user.uid), {
                [`${data.chatId}.lastMessage`]: {
                    text
                },
                [`${data.chatId}.date`]: serverTimestamp()
            });
            setText("");
            setImg(null);

        }
}
    return (
        <div className="input">
            <div className="typeinput">
                <input type="text"  placeholder="Type anything" onChange={e=>setText(e.target.value)}
                value={text}/>
            </div>    
            <div className="send">
                <input style={{display:'none'}} type="file" id="file" onChange={e=>setImg(e.target.files[0])} />
                <label htmlFor="file">
                    <img className="icon" src={gal} alt="" />
                </label>
                <button onClick={handleSend}>
                    <img src={send}/>
                </button>
            </div>
            
        </div>
    );
}
export default Input;