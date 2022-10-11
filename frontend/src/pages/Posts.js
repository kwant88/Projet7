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
        <RemovePosts id={post._id} getPosts={getPosts}/>
        <ModifyPosts id={post._id} getPosts={getPosts}/>
        <Likes id={post._id} getPosts={getPosts}/>
            </div>
})}
<Form getPosts={getPosts}/>

</div>;
}
function Form(props) {
    const [comment , setComment] = useState('');
    const [file,setFile] = useState();

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
//Pour supprimer un post
function RemovePosts(props)  {
    

    const handleSubmit=(e)=>{
      console.log("click");
      
      axios.delete('http://localhost:5000/api/comment/'+ props.id) //on passe des infos d'une fonction à une autre
      .then((res)=>{
        props.getPosts()
          console.log(res)
          
      })  

    }


return (
  <div className="Delete">
  <header className="App-delete">
  <h3 onClick={(e) => {handleSubmit(e)}}> Supprimer </h3>
  </header>
  </div>
  )
}

//Pour modifier les posts

function ModifyPosts (props){
  const [comment , setComment] = useState('');
  const [file,setFile] = useState();

  const handleChange =(e)=>{
      setComment(e.target.value);
    }
    const handleFileChange = (e)=>{
      setFile (e.target.files[0]);
    }

    const handleSubmit=(e)=>
     {
        const formData = new FormData()
        formData.append("message",comment) 
        formData.append("image",file)
        
        axios.put("http://localhost:5000/api/comment/"+props.id,formData)
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

  useEffect(()=>{

    axios.put('http://localhost:5000/api/comment/'+ props.id)
    .then((res) => {
      props.getPosts()
      console.log(res)
    })
  },[])

  return (
    <div className="Comment">
    <header className="App-comment">
    <form onSubmit={(e) => {handleSubmit(e)}}>
     {/*quand l'utilisateur envoie le formulaire , la fonction handle summit sera appelée .*/}
     
    <h3> Formulaire de modification </h3>
    
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


//Pour ajouter un like/dislike:

}
function Likes(props){
const [likesCounter, setLikesCounter] = useState(props.likes);
const [dislikesCounter, setDislikesCounter] = useState(props.dislikes);
const [userReaction, setUserReaction] = useState(props.userReaction);
const [hasReacted, setHasReacted] = useState(props.userReaction === null ? false : true);


const userReactionHandler = (event) => {
  event.preventDefault();
  let reaction;

  switch (userReaction) {
      case null:
          if (event.currentTarget.name === "like") {
              setLikesCounter(likesCounter + 1);
              reaction = event.currentTarget.name;
          } else {
              setDislikesCounter(dislikesCounter + 1);
              reaction = event.currentTarget.name;
          }
          setUserReaction(event.currentTarget.name);
          setHasReacted(true);
          break;

      case "null":
          if (event.currentTarget.name === "like") {
              setLikesCounter(likesCounter + 1);
              reaction = event.currentTarget.name;
          } else {
              setDislikesCounter(dislikesCounter + 1);
              reaction = event.currentTarget.name;
          }
          setUserReaction(event.currentTarget.name);

          break;

      case "like":
          if (event.currentTarget.name === "like") {
              setLikesCounter(likesCounter - 1);
              reaction = "null";
          } else {
              setLikesCounter(likesCounter - 1);
              setDislikesCounter(dislikesCounter + 1);
              setUserReaction(event.currentTarget.name);
              reaction = event.currentTarget.name;
          }

          break;

      case "dislike":
          if (event.currentTarget.name === "dislike") {
              setDislikesCounter(dislikesCounter - 1);
              reaction = "null";
          } else {
              setLikesCounter(likesCounter + 1);
              setDislikesCounter(dislikesCounter - 1);
              setUserReaction(event.currentTarget.name);
              reaction = event.currentTarget.name;
          }

          break;

          default:
            console.log("error");
            break;
    }
  }

  return(
    <div classname={"likesButtons"}>
    <footer className={"buttons"}>
        <button
            btntype="functional"
            name="like"
            onReaction={userReactionHandler}
            reaction={userReaction === "like" ? "like" : null}
            icon="like"
            text={likesCounter}
            styling=""
        />
        <button
            btntype="functional"
            name="dislike"
            onReaction={userReactionHandler}
            reaction={userReaction === "dislike" ? "dislike" : null}
            icon="dislike"
            text={dislikesCounter}
            styling=""
        />
        
    </footer>
</div>
  )
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