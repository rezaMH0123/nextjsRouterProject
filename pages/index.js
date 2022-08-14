import styles from '../styles/Home.module.css'
import { getFeaturedEvents } from '../dummy-data'
import EventList from '../components/events/EventList'
export default function Home() {
  const featuredEvents = getFeaturedEvents()
  return (
    <div className={styles.container}>
      <EventList item={featuredEvents} />
    </div>
  )
}
