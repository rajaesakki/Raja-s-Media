import React, { useEffect, useState } from 'react'
import Header from './Header'
import Nav from './Nav'
import Newpost from './Newpost'
import Postpage from './Postpage'
import About from './About'
import Missing from './Missing'
import Footer from './Footer'
import Home from './Home'
import './App.css';
import { format } from "date-fns"
import Post from './Post'
import api from "./api/posts"
import { Link,Route, Routes, useNavigate } from 'react-router-dom'
import EditPost from './EditPost'
import { useWindowSize } from "./hooks/useWindowSize"
import useAxiosFetch from "./hooks/useFetchApi"

const App = () => {
  const [search,setSearch] = useState("")
  const [searchResults,setSearchResults] = useState([])
  const [posts,setPosts] = useState([])
  const [postBody,setPostBody] = useState("")
  const [postTitle,setPostTitle] = useState("")
  const [editBody,setEditBody] = useState("")
  const [editTitle,setEditTitle] = useState("")
  const navigate = useNavigate()
  const {width} = useWindowSize()
  const { data,fetchError,isLoading } = useAxiosFetch("http://localhost:3500/posts")

   useEffect(() =>{
    setPosts(data)
   },[data])

   /* useEffect(() => {
    const fetchPosts = async () => {
      try{
        const response = await api.get("/posts")
        setPosts(response.data);
      }catch(err){  
        if(err.response){
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        }
        else{
          console.log(`ERROR :${err.message}`)
        }
      }
    }
    fetchPosts();
  }, [])     */

  /* useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch posts from the server
        const response = await api.get("/posts");
  
        // Set the fetched posts into state
        setPosts(response.data);
      } catch (err) {
        // Handle errors
        if (err.response) {
          // If the error has a response, log response data
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          // If it's a general error, log the error message
          console.log(`ERROR :${err.message}`);
        }
      }
    };
  
    // Call the fetchPosts function when the component mounts
    fetchPosts();
  }, []); */
  
 useEffect(() => {
  const filteredResults = posts.filter((post) => ((post.body).toLowerCase()).includes(search.toLowerCase())
  || ((post.title).toLowerCase()).includes(search.toLowerCase()))
  setSearchResults(filteredResults.reverse())
},[posts,search])  



const handlesubmit = async (e) =>{
  e.preventDefault();
  const id = posts.length ? posts[posts.length -1].id +1 :1;
  const datetime = format(new Date(),'MMMM dd, yyyy pp')
  const newpost = {id,title : postTitle,datetime,body :postBody }
  try{
  const response = await api.post("/posts",newpost)
  const allPost = [...posts,response.data]
  setPosts(allPost)
  setPostTitle("")
  setPostBody("")
  navigate('/')
  } catch(err){
    console.log(`ERROR :${err.message}`)
  }
}

 const handleDelete = async(id) => {
  try{
  await api.delete(`posts/${id}`)
  const postsList = posts.filter((post)=>(post.id !== id))
 setPosts(postsList);
 navigate('/')
  }
  catch(err){
    console.log(`ERROR :${err.message}`)
  }
 }
  const handleEdit =async (id) =>{
    const datetime = format(new Date(),'MMMM dd, yyyy pp')
    const updatePosts = {id,title :editTitle,datetime,body : editBody}
    try{
      const response = api.put(`/posts/${id}`,updatePosts)
      setPosts(posts.map((post)=>post.id===id ? {...response.data}:post))
      setEditTitle("")
      setEditBody("")
      navigate('/')
    }
    catch(err){
      console.log(`ERROR :${err.message}`)
    }
  }
  return (
    <div className='App'>
     {/* <ul>
       <li><Link to="/" >Home</Link></li>
      <li><Link to = "/About">About</Link></li>
      <li><Link to = "/Newpost">Newpost</Link></li>
      <li><Link to= "/Postpage">Postpage</Link></li>
      <li><Link to = "/Nav">nav</Link></li>
      </ul>
      <Routes>
        <Route path='/' element={<Home />}/> 
        <Route path='/About' element={<About />} /> 
        <Route path='/Newpost' element= {<Newpost />} />
        <Route path='/Postpage' element = {<Postpage />} />
        <Route path='/Postpage/:id' element = {<Post />} />
        <Route path='/Nav' element = {<Nav />} />
  </Routes>*/}
      
      <Header title={"My media"} />
      <Nav 
       search = {search}
       setSearch={setSearch}
      />
      <Routes>
       <Route path='/' element = {<Home
       posts = {searchResults}
       fetchError = {fetchError}
       isLoading = {isLoading}
      />} />
      <Route path='post'> 
      <Route index element = {
      <Newpost
       postBody={postBody}
       setPostBody={setPostBody}
       postTitle={postTitle}
       setPostTitle={setPostTitle}
       handlesubmit={handlesubmit}
      />} />
      
      <Route path=':id' element = {<Postpage
        posts = {posts}
        handleDelete = {handleDelete}
      /> }/>
      </Route>
      <Route path='/edit/:id' element = {<EditPost
        handleEdit = {handleEdit}
        editTitle = {editTitle}
        editBody = {editBody}
        setEditBody = {setEditBody}
        setEditTitle = {setEditTitle}

      />} />
      <Route path='about' element = {<About />} />
      <Route path='*' element = {<Missing />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
