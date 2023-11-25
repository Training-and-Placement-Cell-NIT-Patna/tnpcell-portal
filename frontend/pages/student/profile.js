import Layout from '@/components/student/Layout'
// import { useContext } from 'react'
import axios from 'axios'
import { API_URL } from '@/config/index'
import StudentRegistration from '@/components/student/profile/StudentRegistration'
import Profile from '@/components/student/profile/Profile'
import { parseCookies } from '@/helpers/index'

export default function profile({ data = '', statusCode = '', token = '' }) {
  return (
    <Layout heading='Profile' >
      {statusCode === 204 ? (
        <StudentRegistration token={token} />
      ) : (
        <Profile student={data} token={token} />
      )}
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const res = await axios.get(`${API_URL}/api/student/me`, config)
  return {
    props: { data: res.data, statusCode: res.status, token: token }, // will be passed to the page component as props
  }
}
