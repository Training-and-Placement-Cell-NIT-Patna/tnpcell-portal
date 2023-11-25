import Breadcrumbs from '@/components/admin/Breadcrumbs'
import EditCoordinator from '@/components/admin/coordinators/EditCoordinator'
import Layout from '@/components/admin/Layout'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import axios from 'axios'

export default function EditCompanyPage({ data, token }) {
  const pages = [
    { name: 'Coordinators', href: '/admin/coordinators', current: false },
    { name: `${data.username}`, href: '#', current: true },
  ]

  return (
    <Layout>
      <Breadcrumbs pages={pages} />
      <EditCoordinator user={data} token={token} />
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
  console.log(res.data)

  return {
    props: { data: res.data, statusCode: res.status, token: token }, // will be passed to the page component as props
  }
}
