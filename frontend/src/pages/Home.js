import axios from "axios";
import {useEffect, useState} from "react";

const Home = () => {

    const[post, setPosts] = useState([]);

    useEffect(() =>{
        axios.get("http://localhost:3000/api/post")
        .then(({data}) => {
            setPosts(data)
        })
    },[]
    )

    return(
        <div>
            
            <h1>Accueil</h1>
            
        </div>
    )
}

export default Home