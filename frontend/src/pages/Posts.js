import {useEffect, useState} from "react";
import axios from "axios";
function Posts () {
const [posts, setPosts] = useState([]);

useEffect(()=>{
axios.get('http://localhost:5000/api/comment')
.then((res)=>{
    console.log(res)
    setPosts(res.data)
})  
},[])
//La key assure la continuité entre dom virtuel et dom réel.Brouillon > navigateur
return <div>
    {posts.map((post)=> {
        return <div key={post._id}>  
        {post.message}
            </div>
})}
</div>;
}

export default Posts;