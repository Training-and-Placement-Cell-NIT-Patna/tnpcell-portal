import Layout from '@/components/admin/Layout'
import AdminSettings from '@/components/admin/settings/AdminSettings'
import { parseCookies } from '@/helpers/index'
import React from 'react'

export default function index({ token }) {
  return (
    <Layout>
      <AdminSettings token={token} />
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  return {
    props: { token: token }, // will be passed to the page component as props
  }
}
