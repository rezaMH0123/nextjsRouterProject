import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import EventList from '../components/events/EventList'
import { getAllFeaturedEvents } from '../helpers/api-utils'
import NewsletterRegistration from '../components/input/newsletter-registration'
export default function Home(props) {
  return (
    <div className={styles.container}>
      <NewsletterRegistration />
      <EventList item={props.events} />
    </div>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getAllFeaturedEvents()

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  }
}
