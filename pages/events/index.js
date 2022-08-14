import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import { getAllEvents } from '../../dummy-data'
import EventList from '../../components/events/EventList'
import EventSearch from '../../components/events/EventSearch'
export default function AllEventsPge() {
  const router = useRouter()
  const events = getAllEvents()
  const findeEventHandler = (year, month) => {
    const path = `/events/${year}/${month}`
    router.push(path)
    console.log(path)
  }
  return (
    <div className={styles.container}>
      <EventSearch onSubmit={findeEventHandler} />
      <EventList item={events} />
    </div>
  )
}
