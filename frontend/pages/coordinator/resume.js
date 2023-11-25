import Layout from '@/components/student/Layout'
import FileUpload from '@/components/student/resume/FileUpload'
import React from 'react'

export default function resume() {
  return (
    <Layout heading='Resume'>
      <FileUpload />
    </Layout>
  )
}
