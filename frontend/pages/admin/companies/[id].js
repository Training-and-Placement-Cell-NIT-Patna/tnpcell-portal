import Breadcrumbs from '@/components/admin/Breadcrumbs'
import EditCompany from '@/components/admin/companies/EditCompany'
import JobsInCompany from '@/components/admin/companies/JobsInCompany'
import Layout from '@/components/admin/Layout'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import axios from 'axios'

export default function EditCompanyPage({ data, token }) {
  const pages = [
    { name: 'Companies', href: '/admin/companies', current: false },
    { name: `${data.data.attributes.company_name}`, href: '#', current: true },
  ]
  const id = data.data.id

  return (
    <Layout>
      <Breadcrumbs pages={pages} />
      <JobsInCompany id={id} token={token} />
      <EditCompany company={data.data} token={token} />
    </Layout>
  )
}

export async function getServerSideProps({ req, params }) {
  const { token } = parseCookies(req)
  const id = params.id
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const res = await axios.get(
    `${API_URL}/api/companies/${id}?populate=*`,
    config
  )
  console.log(res.data)
  return {
    props: { token: token, data: res.data }, // will be passed to the page component as props
  }
}
