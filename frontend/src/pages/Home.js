import axios from "axios";
import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Posts from "./Posts";

const Home = () => {

    const[post, setPosts] = useState([]);

    useEffect(() =>{
        axios.get("http://localhost:5000/api/comment")
        .then(({data}) => {
            setPosts(data)
        })
    },[]
    )
console.log(post);
    return(
        <div>
            
            <h1>Accueil</h1>
            <Link to= "/signup">Inscription</Link>
            <Link to = "/login">Connexion</Link>
            
            <Posts />
                         </div>

                )
            }
        
    


export default Home