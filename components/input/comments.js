import { useEffect, useState, useContext } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'
import NotificationContext from '../../store/notification-context'

function Comments(props) {
  const { eventId } = props
  const notificationCtx = useContext(NotificationContext)

  const [showComments, setShowComments] = useState(false)
  const [comment, setComments] = useState([])
  const [loding, setLoding] = useState(false)

  useEffect(() => {
    if (showComments) {
      setLoding(true)
      fetch('/api/comments/' + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.Comments)
          setLoding(false)
        })
    }
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'sending comment...',
      message: 'your comment is being stord.',
      status: 'pending',
    })
    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }

        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!')
        })
      })
      .then(() => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Your comment was saved!',
          status: 'success',
        })
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong!',
          status: 'error',
        })
      })
  }

  return (
    <>
      {comment ? (
        <section className={classes.comments}>
          <button onClick={toggleCommentsHandler}>
            {showComments ? 'Hide' : 'Show'} Comments
          </button>
          {showComments && <NewComment onAddComment={addCommentHandler} />}
          {!loding && showComments && <CommentList items={comment} />}
          {showComments && loding && <p>loding...</p>}
        </section>
      ) : (
        <p>loding...</p>
      )}
    </>
  )
}

export default Comments
