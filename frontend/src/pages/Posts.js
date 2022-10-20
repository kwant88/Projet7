import { useEffect, useState } from "react";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  const getPosts = () => {
    axios.get("http://localhost:5000/api/comment").then((res) => {
      console.log(res);
      setPosts(res.data);
    });
  };
  useEffect(() => {
    getPosts();
    axios.get("http://localhost:5000/api/user/profile").then(({ data }) => {
      setUser(data.user);
    });
  }, []);
  if (!user) {
    return <p>Loading</p>;
  }

  //La key assure la continuité entre dom virtuel et dom réel.Brouillon > navigateur
  return (
    <div>
      {posts.map((post) => {
        return (
          <div key={post._id}>
            <img src={post.image} alt="img" />
            {post.message}
            {user.role === "admin" || user._id === post.userId ? (
              <>
                <RemovePosts id={post._id} getPosts={getPosts} />
                <ModifyPosts id={post._id} getPosts={getPosts} />
              </>
            ) : null}
            <Likes id={post._id} getPosts={getPosts} post={post} />
          </div>
        );
      })}
      <Form getPosts={getPosts} />
    </div>
  );
}

//Pour créer un formulaire commentaires
function Form(props) {
  const [comment, setComment] = useState("");
  const [file, setFile] = useState();

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  /*
    useEffect(()=>{
        axios.post('http://localhost:5000/api/comment')
        .then((res)=>{
            console.log(res)
            props.setPosts(res.data) 
        })  
        },[])
*/
  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append("message", comment);
    formData.append("image", file);

    axios
      .post("http://localhost:5000/api/comment", formData)
      .then((res) => {
        console.log(res);
        props.getPosts();
      })
      .catch((error) => {
        console.log(error);
      });

    e.preventDefault();
  };
  console.log(file);
  return (
    <div className="Comment">
      <header className="App-comment">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          {/*quand l'utilisateur envoie le formulaire , la fonction handle summit sera appelée .*/}

          <h3> Formulaire </h3>

          <label>Commentaire:</label>
          <br />
          <input
            type="text"
            value={comment}
            required
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <br />

          <input
            type="file"
            required
            onChange={(e) => {
              handleFileChange(e);
            }}
          />

          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}
//Pour supprimer un post
function RemovePosts(props) {
  const handleSubmit = (e) => {
    console.log("click");

    axios
      .delete("http://localhost:5000/api/comment/" + props.id) //on passe des infos d'une fonction à une autre
      .then((res) => {
        props.getPosts();
        console.log(res);
      });
  };

  return (
    <div className="Delete">
      <header className="App-delete">
        <h3
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          {" "}
          Supprimer{" "}
        </h3>
      </header>
    </div>
  );
}

//Pour modifier les posts

function ModifyPosts(props) {
  const [comment, setComment] = useState("");
  const [file, setFile] = useState();

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append("message", comment);
    formData.append("image", file);

    axios
      .put("http://localhost:5000/api/comment/" + props.id, formData)
      .then((res) => {
        console.log(res);
        props.getPosts();
      })
      .catch((error) => {
        console.log(error);
      });

    e.preventDefault();
  };

  useEffect(() => {
    axios.put("http://localhost:5000/api/comment/" + props.id).then((res) => {
      props.getPosts();
      console.log(res);
    });
  }, []);

  return (
    <div className="Comment">
      <header className="App-comment">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          {/*quand l'utilisateur envoie le formulaire , la fonction handle summit sera appelée .*/}

          <h3> Formulaire de modification </h3>

          <label>Commentaire:</label>
          <br />
          <input
            type="text"
            value={comment}
            required
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <br />

          <input
            type="file"
            required
            onChange={(e) => {
              handleFileChange(e);
            }}
          />

          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );

  //Pour ajouter un like/dislike:
}
function Likes({ post }) {
  const [likes, setLikes] = useState(post.likes);

  console.log(post);

  //Pour gérer le bouton like:
  const handleLike = () => {
    axios
      .post("http://localhost:5000/api/comment/" + post._id + "/like")
      .then((res) => {
        if (res.data.liked) {
          setLikes(likes + 1);
        } else {
          setLikes(likes - 1);
        }
      });
  };
  return (
    <div classname={"likesButtons"}>
      <footer className={"buttons"}>
        <button onClick={handleLike}>Like</button> {likes}
      </footer>
    </div>
  );
}
export default Posts;
