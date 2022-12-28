import React, {useState} from 'react'
import AddComment from './AddComment'
import Comment from './Comment'

const CommentBoard = () => {
  const [comments, setComments] = useState([
    <Comment key={1}/>
  ])

  const addComment = () => {
      let commentsCopy = comments.slice();
      commentsCopy.push(<Comment key={comments.length + 1} />);
      setComments(commentsCopy);
  }
  
  return (
    <div className='flex flex-start gap-8 h-[600px] bg-gray-300 py-8 px-16'>
      {comments.map(comment => comment)}
      <AddComment onClick={addComment}/>
    </div>
  )
}

export default CommentBoard