import React from 'react'
import { Link, useParams } from 'react-router-dom'
 {/* <div>Postpage</div>
    <Link to = "/Postpage/1">post 1</Link>
    <br></br>
    <Link to = "/Postpage/2">post 2</Link>
    <br></br>
    <Link to = "/Postpage/3">post 3</Link>
      */}
const Postpage = ({posts,handleDelete}) => {
  const {id} = useParams()
  const post = posts.find((post) =>(post.id).toString()===id)
  return (
    <main className='PostPage'>
    <article className='post'>
      {post &&
        <>
          <h2>{post.title}</h2>
          <p className='postDate'>{post.datetime}</p>
          <p className='postBody'>{post.body}</p>
          <Link to={`/edit/${id}`}>
          <button className='editButton'>Edit post</button>
          </Link>
          <button className='deleteButton' onClick={()=> handleDelete(post.id)}>Delete post</button>
        </>
    } 
    {!post &&
     <>
     <p>post not found</p>
     <p>well,that's disappointing</p>
     <p> visit our homepage</p>
     </>
    }
    </article>
    </main>
  )
}

export default Postpage 