import Breadcrumbs from '@/components/coordinator/Breadcrumbs'
import EditJob from '@/components/coordinator/jobs/EditJob'
import StudentApplied from '@/components/coordinator/jobs/StudentApplied'
import Layout from '@/components/coordinator/Layout'
import EligibleStudents from '@/components/coordinator/jobs/EligibleStudents'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import axios from 'axios'
import React from 'react'

export default function EditJobPage({ token = '', data }) {
  const pages = [
    { name: 'Jobs', href: '/coordinator/jobs', current: false },
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
