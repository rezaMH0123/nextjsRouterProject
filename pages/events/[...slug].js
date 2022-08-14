import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../dummy-data'
import EventList from '../../components/events/EventList'
export default function FillteredEventPage() {
  const router = useRouter()
  const filterDate = router.query.slug
  if (!filterDate) {
    return <p className="m-0">loding...</p>
  }
  const numYear = +filterDate[0]
  const numMonth = +filterDate[1]
  if (
    isNaN(numMonth) ||
    isNaN(numYear) ||
    numMonth < 1 ||
    numMonth > 12 ||
    numYear < 2021
  ) {
    return (
      <p className="text-center font-bold text-2xl text-red-600 mt-10">
        invalid filter
      </p>
    )
  }
  const filterdEvents = getFilteredEvents({ year: numYear, month: numMonth })
  if (!filterdEvents || filterdEvents.length === 0) {
    return (
      <p className="text-center font-bold text-2xl text-red-600 mt-10">
        No event found for this filter!
      </p>
    )
  }
  return (
    <div className={styles.container}>
      <EventList item={filterdEvents} />
    </div>
  )
}
