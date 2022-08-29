import '../styles/globals.css'
import Layout from '../components/layout/layout'
import Notification from '../components/ui/notification'
import { NotificationContextProvider } from '../store/notification-context'
function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Component {...pageProps} />
        <Notification />
      </Layout>
    </NotificationContextProvider>
  )
}

export default MyApp
