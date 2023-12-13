import Layout from '@/components/coordinator/Layout'
import React from 'react'
import { parseCookies } from '@/helpers/index'
import Home from '@/components/coordinator/home/Home'
import axios from 'axios'
import { API_URL } from '@/config/index'
export default function profile({ token =''}) {
  return (
    <Layout heading='Welcome, Coordinator'>
      <Home token={token} />
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const res = await axios.get(`${API_URL}/api/student/me`, config)
  return {
    props: { data: res.data, statusCode: res.status, token: token }, // will be passed to the page component as props
  }
}
