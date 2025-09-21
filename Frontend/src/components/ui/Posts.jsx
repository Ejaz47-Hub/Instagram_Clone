import React from 'react'
import Post from './Post'

const Posts = () => {
  return (
    <div className="flex-1 my-8 flex flex-col items-center px-4 md:px-0">
      {[1, 2, 3].map((item, index) => (
        <Post key={index} />
      ))}
    </div>
  )
}

export default Posts
