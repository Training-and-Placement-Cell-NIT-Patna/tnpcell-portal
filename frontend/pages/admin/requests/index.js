import Layout from '@/components/admin/Layout'
import React from 'react'
import CompaniesRequest from '@/components/admin/requests/CompaniesRequest'

import RecruiterRegister from '@/components/admin/requests/RecruiterRegister'

import { parseCookies } from '@/helpers/index'
import JobRequest from '@/components/admin/requests/JobsRequest'
import StudentRequest from '@/components/admin/requests/StudentRequest'

export default function index({ token }) {
  return (
    <Layout heading='Requests'>
      <div className='mt-4'>
        <div className=''>
         
          {/* <div className='py-3'>
            <CompaniesRequest token={token} />
          </div> */}

          <div className='py-3'>
            <RecruiterRegister token={token} />
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
