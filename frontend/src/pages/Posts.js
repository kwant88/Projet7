import {useEffect, useState} from "react";
import axios from "axios";

function Posts () {
const [posts, setPosts] = useState([]);

const getPosts = () =>
{
    axios.get('http://localhost:5000/api/comment')
.then((res)=>{
    console.log(res)
    setPosts(res.data)
})  
}
useEffect(()=>{
getPosts()
},[])
//La key assure la continuité entre dom virtuel et dom réel.Brouillon > navigateur
return <div>
    {posts.map((post)=> {
        return <div key={post._id}>  
        {post.message}
            </div>
})}
<Form getPosts={getPosts}/>
</div>;
}
function Form(props) {
    const [comment , setComment] = useState('');
    const [file,setFile] = useState()

    const handleChange =(e)=>{
        setComment(e.target.value);
      }
      const handleFileChange = (e)=>{
        setFile (e.target.files[0]);
      }
  
    useEffect(()=>{
        axios.post('http://localhost:5000/api/comment')
        .then((res)=>{
            console.log(res)
            props.setPosts(res.data) 
        })  
        },[])

        const handleSubmit=(e)=>
     {
        const formData = new FormData()
        formData.append("message",comment) 
        formData.append("image",file)
        
        axios.post("http://localhost:5000/api/comment",formData)
        .then (res=> {
          console.log(res);
          props.getPosts()
        }
        )
        .catch (error =>{
          console.log(error);
        })
      
      e.preventDefault();
 
    }
console.log(file);
        return (
            <div className="Comment">
            <header className="App-comment">
            <form onSubmit={(e) => {handleSubmit(e)}}>
             {/*quand l'utilisateur envoie le formulaire , la fonction handle summit sera appelée .*/}
             
            <h3> Formulaire </h3>
            
                <label >
                  Commentaire:
                </label><br/>
                <input type="text" value={comment} required onChange={(e) => {handleChange(e)}} /><br/>

                   <input type = "file" required onChange={(e) => {handleFileChange(e)}  } />
               
                <input type="submit" value="Submit"/>
              </form>
            </header>
            </div>
          );

}
export default Posts;
/*
<label >
Likes:
</label><br/>
<input type="text" value={likesCounter} required onChange={(e) => {handleLikesChange(e)}} /><br/>

<label >
Dislikes:
</label><br/>
<input type="text" value={dislikesCounter} required onChange={(e) => {handleDislikesChange(e)}} /><br/>
     
     */ 