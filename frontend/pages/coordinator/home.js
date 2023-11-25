import Layout from '@/components/coordinator/Layout'
import React from 'react'
import { parseCookies } from '@/helpers/index'
import Home from '@/components/coordinator/home/Home'

export default function profile({ token }) {
  return (
    <Layout heading='Welcome, Coordinator'>
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
