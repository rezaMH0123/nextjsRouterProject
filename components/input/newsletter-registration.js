import { useRef, useState, useContext } from 'react'
import classes from './newsletter-registration.module.css'
import NotificationContext from '../../store/notification-context'

function NewsletterRegistration() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)
  const emailInputRef = useRef()
  const notificationCtx = useContext(NotificationContext)
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
  }
  const handleChange = (event) => {
    if (!validateEmail(event.target.value)) {
      setError('Email is invalid')
    } else {
      setError(null)
    }
    if (event.target.value === '') {
      setError('')
    }

    setMessage(event.target.value)
  }
  function registrationHandler(event) {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value

    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    })

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
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
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully registered for newsletter!',
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
    <div className="">
      <section className={classes.newsletter}>
        <h2>Sign up to stay updated!</h2>
        <form onSubmit={registrationHandler}>
          <div className={classes.control}>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              aria-label="Your email"
              ref={emailInputRef}
              value={message}
              onChange={handleChange}
            />
            <button>Register</button>
          </div>
        </form>
      </section>
      {error && (
        <h2 className="text-center" style={{ color: 'red' }}>
          {error}
        </h2>
      )}
    </div>
  )
}

export default NewsletterRegistration
