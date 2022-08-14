import React from 'react'
import EventItem from './EventItem'
import style from './event-list.module.css'
const EventList = ({ item }) => {
  return (
    <ul className={style.list}>
      {item.map((event) => (
        <EventItem
          key={event.id}
          location={event.location}
          id={event.id}
          image={event.image}
          title={event.title}
          date={event.date}
        />
      ))}
    </ul>
  )
}

export default EventList
