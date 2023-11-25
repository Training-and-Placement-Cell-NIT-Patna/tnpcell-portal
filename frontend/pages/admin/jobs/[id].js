import Breadcrumbs from '@/components/admin/Breadcrumbs'
import EditJob from '@/components/admin/jobs/EditJob'
import StudentApplied from '@/components/admin/jobs/StudentApplied'
import EligibleStudents from '@/components/admin/jobs/EligibleStudents'
import Layout from '@/components/admin/Layout'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import axios from 'axios'
import React from 'react'

export default function EditJobPage({ token = '', data }) {
  const pages = [
    { name: 'Jobs', href: '/admin/jobs', current: false },
    { name: data.data.attributes.job_title, href: '#', current: true },
  ]
  return (
    <Layout>
      <Breadcrumbs pages={pages} />
      <EligibleStudents token={token} id={data.data.id} />
      <StudentApplied token={token} id={data.data.id} />
      <EditJob token={token} job={data.data} />
    </Layout>
  )
}

export async function getServerSideProps({ req, params }) {
  const { token } = parseCookies(req)
  const id = params.id
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const res = await axios.get(`${API_URL}/api/jobs/${id}?populate=*`, config)
  return {
    props: { token: token, data: res.data }, // will be passed to the page component as props
  }
}
