import Layout from '@/components/student/Layout'
import FileUpload from '@/components/student/resume/FileUpload'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import React, { useEffect, useState } from 'react'
import NotApproved from '@/components/student/NotApproved'

export default function Resume({ token }) {
  const [approved, setApproved] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/api/student/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.approved === 'approved') {
          setApproved(true)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  if (!approved) {
    return (
      <Layout>
        <NotApproved />
      </Layout>
    )
  }
  return (
    <Layout heading='Resume'>
      <FileUpload token={token} />
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  return {
    props: { token: token }, // will be passed to the page component as props
  }
}
