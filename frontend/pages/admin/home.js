import Home from '@/components/admin/home/Home'
import Layout from '@/components/admin/Layout'
import { parseCookies } from '@/helpers/index'
import React from 'react'

export default function home({ token }) {
  return (
    <Layout heading='Welcome, Admin'>
      <Home token={token} />
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)
  return {
    props: { token: token }, // will be passed to the page component as props
  }
}
