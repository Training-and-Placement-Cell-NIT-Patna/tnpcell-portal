import Breadcrumbs from '@/components/admin/Breadcrumbs'
import AddJob from '@/components/admin/jobs/AddJob'
import Layout from '@/components/admin/Layout'
//import AddComp from '@/components/admin/companies/AddCompany'
import { parseCookies } from '@/helpers/index'
import React from 'react'

export default function index({ token = '' }) {
  const pages = [
    { name: 'Jobs', href: '/admin/jobs', current: false },
    { name: `Add Job`, href: '#', current: true },
  ]
  return (
    <Layout>
      <Breadcrumbs pages={pages} />
      <AddJob token={token} />

      {/* <AddComp>
        xyz
      </AddComp> */}

    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  return {
    props: { token: token }, // will be passed to the page component as props
  }
}
