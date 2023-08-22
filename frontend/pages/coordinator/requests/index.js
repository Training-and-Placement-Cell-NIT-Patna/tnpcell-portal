import Layout from '@/components/coordinator/Layout'
import React from 'react'
import CompaniesRequest from '@/components/coordinator/requests/CompaniesRequest'
import { parseCookies } from '@/helpers/index'
import JobRequest from '@/components/coordinator/requests/JobsRequest'
import StudentRequest from '@/components/coordinator/requests/StudentRequest'

export default function index({ token }) {
  return (
    <Layout heading='Requests'>
      <div className='mt-4'>
        <div className='flex flex-col items-center'>
          <div className='py-3'>
            <CompaniesRequest token={token} />
          </div>
          <div className='py-3'>
            <JobRequest token={token} />
          </div>
          <div className='py-3'>
            <StudentRequest token={token} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  return {
    props: { token: token }, // will be passed to the page component as props
  }
}
