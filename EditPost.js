import React, { useEffect } from 'react'
import { useParams,Link } from 'react-router-dom'

const EditPost = ({posts,handleEdit,editTitle,setEditTitle,editBody,setEditBody}) => {
    const {id} = useParams()
    const post = posts.find((post)=>(post.id).toString()===id)
    useEffect(()=>{
        if(post){
          setEditBody(post.body)
          setEditBody(post.title)
        }
},[post,setEditBody,setEditTitle])
  return (
    <main className='NewPost'>
      {editTitle &&
      <>
       <h2>Editpost</h2>
       <form className='newPostForm'onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor="postTitle">Title:</label>
        <input
         id='postTitle'
         required
         value={editTitle}
         onChange={(e)=>setEditTitle(e.target.value)}
        />
        <label htmlFor="postBody">Body:</label>
        <input
        id='postBody'
        required
        value={editBody}
        onChange={(e)=>setEditBody(e.target.value)}

        />
        <button type = "submit" onClick={()=>handleEdit(post.id)}>SUBMIT</button>
       </form>
      
      </>
      }
      {editTitle &&
      <>
        <p> page not found</p>
        <p>well that's disappointing..</p>
        <Link to = "/"><p>visit our home page</p></Link>
      
      </>

      }
    </main>
  )
}

export default EditPost