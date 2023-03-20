import Layout from '@/components/Layout/Layout'
import '@/styles/globals.css'
import UserContext from '@/utils/userContext/UserContext'


export default function App({ Component, pageProps }) {
  return (
    <UserContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext>
  )
}
