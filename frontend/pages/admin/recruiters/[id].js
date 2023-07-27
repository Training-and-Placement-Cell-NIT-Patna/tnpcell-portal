import Breadcrumbs from '@/components/admin/Breadcrumbs'
import EditRecruiters from '@/components/admin/recruiters/EditRecruiters'
import Layout from '@/components/admin/Layout'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import axios from 'axios'

export default function EditRecruiterPage({ data, token }) {
  const pages = [
    { name: 'Recruiters', href: '/admin/recruiters', current: false },
    { name: `${data.username}`, href: '#', current: true },
  ]

  return (
    <Layout>
      <Breadcrumbs pages={pages} />
      <EditRecruiters user={data} token={token} />
    </Layout>
  )
}

export async function getServerSideProps({ req, params }) {

  const { token } = parseCookies(req)

  const id = params.id

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const res = await axios.get(`${API_URL}/api/users/${id}?populate=*`, config)



  return {
    props: { data: res.data, statusCode: res.status, token: token }, // will be passed to the page component as props
  }
}
