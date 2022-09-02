import axios from "axios";
import {useState} from "react";


 
function Connexion() {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confPassword , setConfPassword] = useState('');
 
    
    
    const handleEmailChange =(e)=>{
      setEmail(e.target.value);
    }
     
    const handlePasswordChange =(e)=>{
      setPassword(e.target.value);
    }
     
    const handleConfPasswordChange =(e)=>{
      setConfPassword(e.target.value);
    }
    
    const handleSubmit=(e)=>{
      if(password!=confPassword)
      {
       
        alert("le mot de passe ne correspond pas");
      }
      else{
        
        axios.post("http://localhost:5000/api/user/login",{email,password})
        .then (res=> {
          console.log(res);
        }
        )
        .catch (error =>{
          console.log(error);
        })
      }
      e.preventDefault();
 
    }
}

export default Connexion;