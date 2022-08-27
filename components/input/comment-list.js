import classes from './comment-list.module.css'
import { useRouter } from 'next/router'
function CommentList(props) {
  const { items } = props
  const router = useRouter()
  const eventId = router.query.eventId
  const coments = items.map((item) => item.coments)
  return (
    <ul className={classes.comments}>
      {coments.map((item, id) => (
        <div key={id}>
          {eventId === item.eventId ? (
            <li>
              <p>{item.text}</p>
              <div>
                By <address>{item.name}</address>
              </div>
            </li>
          ) : null}
        </div>
      ))}
    </ul>
  )
}

export default CommentList
