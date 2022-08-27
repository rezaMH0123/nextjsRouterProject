import { useRouter } from 'next/router'

import { getEventById, getAllEvents } from '../../helpers/api-utils'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import ErrorAlert from '../../components/ui/error-alert'
import Comments from '../../components/input/comments'

export default function EventsDetailPge(props) {
  const event = props.event

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    )
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  )
}
export async function getStaticProps(context) {
  const eventId = await getEventById(context.params.eventId)
  return {
    props: {
      event: eventId,
    },
    revalidate: 1800,
  }
}
export async function getStaticPaths() {
  const events = await getAllEvents()
  const paths = events.map((event) => ({ params: { eventId: event.id } }))
  return {
    paths: paths,
    fallback: false,
  }
}
