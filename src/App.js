import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Components/Post';
import { db, auth } from './Components/firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './Components/ImageUpload';
import InstagramEmbed from 'react-instagram-embed';
import logo from './images/instalogo.png';
import Menu from "./Components/Menu";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

/*--------------------------------------*/
function App() {

  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [openSignIn, setOpenSignIn] = useState(false);
 // const [postId, setPostId] = useState('')
  
  useEffect( () => {
    const unsubscribe = auth.onAuthStateChanged( (authUser) =>{
      if(authUser){
        console.log(authUser);
        setUser(authUser);
      } else {
        //user has logged out
        setUser(null);
       }
    })

    return () =>{
      //perform some cleanup actions
      unsubscribe();
     }
    }, [user, username]);


  //useEffect : runs a piece of code on a specific condition
  useEffect(() => {
    //here the code runs
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot( snapshot => {
      //every time a new post is added, this code fires
      setPosts(snapshot.docs.map( doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
    
  }, []);
  
  const signUp = (e) =>{
      e.preventDefault();
      auth.createUserWithEmailAndPassword(email, password)
      .then((authUser)=> { 
        authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));

      setOpen(false)
  }
  
  const signIn = (e) =>{
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .catch( (error) => alert(error.message))

    setOpenSignIn(false)
  }
  const post = posts.map( ({id, post}) =>{
    return(
     <Post key = {id} user={user} postId={id} username = {post.username} caption={post.caption} imageUrl={post.imageUrl} />
    )
  })
  return (
    <div className="App">
      
      <Modal open={open} onClose={()=> setOpen(false) } >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
                <img className="app__headerImage"
                  src={logo}alt="instalogo"
              />
            </center>  
             <Input
               type= "text"
               placeholder="username"
               value={username}
               onChange ={(e)=> setUsername(e.target.value)}
             />
             <Input
               type= "text"
               placeholder="email"
               value={email}
               onChange ={(e)=> setEmail(e.target.value)}
             />
             <Input
               type= "text"
               placeholder="password"
               value={password}
               onChange ={(e)=> setPassword(e.target.value)}
             />
             <Button onClick = {signUp} >Sign Up</Button>
            </form>
          </div>
       </Modal>

       <Modal open={openSignIn} onClose={()=> setOpenSignIn(false) } >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
                <img className="app__headerImage"
                  src={logo} alt="instalogo"
              />
            </center>
             <Input
               type= "text"
               placeholder="email"
               value={email}
               onChange ={(e)=> setEmail(e.target.value)}
             />
             <Input
               type= "text"
               placeholder="password"
               value={password}
               onChange ={(e)=> setPassword(e.target.value)}
             />
             <Button onClick = {signIn} >Sign In</Button>
            </form>
          </div>
       </Modal>

       <div className="app__header">
          <div className="app__headerContainter">
              <img className="app__headerImage"
                  src={logo} alt="instalogo"
              />
              
              {user && <Menu/>}
              
              {user? (<Button onClick={() => auth.signOut()}>Logout</Button>
            ):(
              <div className="app__loginContainer"> 
                  <Button onClick = {() => setOpenSignIn(true)} >Sign In</Button>
                  <Button onClick = {() => setOpen(true)} >Sign Up</Button>
                  </div> 
            )}
         </div>
       </div>    
       
       <div className="app__posts">
          <div className="app__postsLeft">
            {
                  post
                }
          </div>
          
          <div className="app__postsRight">
              {/*<InstagramEmbed
              url='https://www.instagram.com/p/CJ1j3cTD7Cb/'
              clientAccessToken='123|456'
              maxWidth={320}
              hideCaption={false}
              containerTagName='div'
              protocol=''
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
              /> */}
          </div>
       </div>
      {user? (
          <ImageUpload username ={user.displayName} />
        ): (
          <h3>Sorry you need to login to upload images!</h3>
        )}
       
    </div>
  );
}

export default App;
