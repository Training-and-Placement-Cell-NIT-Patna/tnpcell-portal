import Home from '@/components/admin/home/Home'
import Layout from '@/components/admin/Layout'
import { parseCookies } from '@/helpers/index'
import React from 'react'
import axios from 'axios'
import { API_URL } from '@/config/index'
export default function home({ token = '' }) {
  return (
    <Layout heading='Welcome, Admin'>
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
