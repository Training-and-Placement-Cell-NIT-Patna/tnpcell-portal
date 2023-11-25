import Breadcrumbs from '@/components/admin/Breadcrumbs'
import AddCoordinatorComponent from '@/components/admin/coordinators/Add'
import Layout from '@/components/admin/Layout'
import { parseCookies } from '@/helpers/index'
import React from 'react'

export default function AddCoordinator({ token }) {
  return (
    <Layout>
      <Breadcrumbs
        pages={[
          { name: 'Coordinators', href: '/admin/coordinators', current: false },
          { name: 'Add', href: '#', current: true },
        ]}
      />
      <div className='mt-10 pb-5 border-b border-gray-200'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>
          Add Coordinator
        </h3>
      </div>
      <AddCoordinatorComponent token={token} />
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  return {
    props: { token: token }, // will be passed to the page component as props
  }
}
