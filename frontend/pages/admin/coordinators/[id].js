import Breadcrumbs from '@/components/admin/Breadcrumbs'
import EditCoordinator from '@/components/admin/coordinators/EditCoordinator'
import EditTpcCoordinator from './EditTpcCoordinator'
import Layout from '@/components/admin/Layout'
import React from 'react'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import axios from 'axios'

export default function EditCompanyPage({ data, token , isTpc }) {

  const [show , setShow]  = React.useState(isTpc==="true")
  const pages = [
    { name: 'Coordinators', href: '/admin/coordinators', current: false },
    { name: `${data.username}`, href: '#', current: true },
  ]

  

  return (
    <Layout>
      <Breadcrumbs pages={pages} />

      {isTpc ? (<EditTpcCoordinator user={data} token={token}/>):(<EditCoordinator user={data} token={token}/> )}

    
    </Layout>
  )
}

export async function getServerSideProps({ req, params,query }) {
  const { token } = parseCookies(req)
  const id = params.id


  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  let res;

  // change in the route suggest to fetch the TPC and coordinators data as per the "isTpc"

  res = await axios.get(`${API_URL}/api/users/${params.id}?populate=*`, config)

  if(query.isTpc) {
    res.data['id'] = id;
  }

  return {
    props: { data: res.data, statusCode: res.status, token: token , isTpc: query.isTpc }, // will be passed to the page component as props
  }
}


    {/* {show ? (<EditTpcCoordinator user={data} token={token} />):(<EditCoordinator user={data} token={token} />)} */}
    {/* {show && <EditTpcCoordinator user={data} token={token} />}
    {!show && <EditCoordinator user={data} token={token} />} */}