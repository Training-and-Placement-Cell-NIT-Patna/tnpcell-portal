import Breadcrumbs from '@/components/admin/Breadcrumbs'
import AddRecruitersComponent from '@/components/admin/recruiters/Add'
import Layout from '@/components/admin/Layout'
import { parseCookies } from '@/helpers/index'
import React from 'react'

export default function AddRecruiter({ token }) {
  return (
    <Layout>
      <Breadcrumbs
        pages={[
          { name: 'Recruiter', href: '/admin/recruiters', current: false },
          { name: 'Add', href: '#', current: true },
        ]}
      />
      <div className='mt-10 pb-5 border-b border-gray-200'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>
          Add Recruiters
        </h3>
      </div>
      <AddRecruitersComponent token={token} />
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  return {
    props: { token: token }, // will be passed to the page component as props
  }
}
