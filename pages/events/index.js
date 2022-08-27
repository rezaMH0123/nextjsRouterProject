import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import EventList from '../../components/events/EventList'
import EventSearch from '../../components/events/EventSearch'
import { getAllEvents } from '../../helpers/api-utils'

export default function AllEventsPge(props) {
  const router = useRouter()
  const events = props.events
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
export async function getStaticProps() {
  const events = await getAllEvents()

  return {
    props: {
      events: events,
    },
    revalidate: 1000,
  }
}
