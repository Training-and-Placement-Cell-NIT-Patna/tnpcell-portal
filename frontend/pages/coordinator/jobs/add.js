import Breadcrumbs from '@/components/coordinator/Breadcrumbs'
import AddJob from '@/components/coordinator/jobs/AddJob'
import Layout from '@/components/coordinator/Layout'
import { parseCookies } from '@/helpers/index'
import React from 'react'

export default function index({ token = '' }) {
  const pages = [
    { name: 'Jobs', href: '/coordinator/jobs', current: false },
    { name: `Add Job`, href: '#', current: true },
  ]
  return (
    <Layout>
      <Breadcrumbs pages={pages} />
      <AddJob token={token} />
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  return {
    props: { token: token }, // will be passed to the page component as props
  }
}
