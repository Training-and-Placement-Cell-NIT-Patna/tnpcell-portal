import Breadcrumbs from '@/components/coordinator/Breadcrumbs'
import Layout from '@/components/coordinator/Layout'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function RecruiterData({ data, token }) {
  const [recruiter, setRecruiter] = useState(null)

  useEffect(() => {
    const fetchRecruiterData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/recruiters?filter[email]=${data}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setRecruiter(res.data[0])
      } catch (err) {
        console.error(err)
      }
    }

    fetchRecruiterData()
  }, [])



  return (
    <Layout>
      <Breadcrumbs items={[{ label: 'Recruiters', path: '/coordinator/recruiters' }, { label: recruiter?.attributes?.recruiter_name }]} />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">{recruiter?.attributes?.recruiter_name}</h1>
      </div>
      {recruiter ? (
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <p><span className="font-semibold">Name:</span> {recruiter?.attributes?.recruiter_name}</p>
            <p><span className="font-semibold">Email:</span> {recruiter?.attributes?.email}</p>
            <p><span className="font-semibold">Contact No:</span> {recruiter?.attributes?.contact_no}</p>
          </div>
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Company Information</h3>
            <p><span className="font-semibold">Company:</span> {recruiter?.attributes?.company}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  )
}

export async function getServerSideProps({ params, req }) {
  const { token } = parseCookies(req)
  const { email } = params

  return {
    props: {
      // data: email,
      token
    }
  }
}
