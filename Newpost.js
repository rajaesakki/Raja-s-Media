import React from 'react'

const Newpost = ({handlesubmit,postTitle,setPostTitle,postBody,setPostBody}) => {
  return (
    <main className='NewPost'>
      <h2>New post</h2>
      <form  className = "newPostForm"onSubmit={handlesubmit}>
        <label htmlFor="postTitle">TITLE:</label>
        <input
         id='postTitle' 
         type="text"
         required
         value={postTitle}
         onChange={(e) =>setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">POST:</label>
        <textarea
          id='postBody'
          required
          value={postBody}
          onChange={(e)=>setPostBody(e.target.value)}
        />
        <button type='submit'>SUBMIT</button>
      </form>

    </main>
  )
}

export default Newpost