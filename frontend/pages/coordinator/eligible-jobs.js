import Layout from '@/components/student/Layout'
import React from 'react'

export default function eligibleJobs() {
  return <Layout heading='Eligible Jobs'>eligible-jobs</Layout>
}

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
