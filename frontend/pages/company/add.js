//import Breadcrumbs from '@/components/company/Breadcrumbs'
import AddJob from '@/components/company/AddJob'
import Layout from '@/components/company/Layout'
import { parseCookies } from '@/helpers/index'
import React from 'react'

export default function index({ token = '' }) {
  const pages = [
    //  { name: 'Jobs', href: '/coordinator/jobs', current: false },
    { name: `Add Job`, href: '#', current: true },
  ]
  return (
    <Layout>
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
