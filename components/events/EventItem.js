import React from 'react'
import Link from 'next/link'
import Button from '../ui/button'
import style from './event-item.module.css'
const EventItem = (props) => {
  const { title, location, date, id, image } = props
  const HumanReadabledate = new Date(date).toLocaleDateString('en-US')
  const formatAddres = location.replace(',', '\n')
  const explorLink = `/events/${id}`

  return (
    <li className={style.item}>
      <div className="w-1/2 rounded-md">
        <img className="h-full w-full" src={'/' + image} alt={title} />
      </div>
      <div className={style.content}>
        <div className={style.summary}>
          <h2>Title</h2>
          <div className={style.date}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <time>{HumanReadabledate}</time>
          </div>
          <div className={style.address}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <address>{formatAddres}</address>
          </div>
        </div>
        <div className={style.actions}>
          <Button Link={explorLink}>
            <span className="mr-2">Explor Event</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Button>
        </div>
      </div>
    </li>
  )
}

export default EventItem
