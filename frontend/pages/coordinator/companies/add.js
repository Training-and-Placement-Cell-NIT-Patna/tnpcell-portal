import Breadcrumbs from '@/components/coordinator/Breadcrumbs'
import AddCompany from '@/components/coordinator/companies/AddCompany'
import Layout from '@/components/coordinator/Layout'
import { parseCookies } from '@/helpers/index'
import React from 'react'

export default function index({ token = '' }) {
  const pages = [
    { name: 'Companies', href: '/coordinator/companies', current: false },
    { name: `Add Company`, href: '#', current: true },
  ]
  return (
    <Layout>
      <Breadcrumbs pages={pages} />
      <AddCompany token={token} />
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  return {
    props: { token: token }, // will be passed to the page component as props
  }
}
