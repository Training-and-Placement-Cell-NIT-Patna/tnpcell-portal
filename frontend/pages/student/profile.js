import Layout from '@/components/student/Layout'
// import { useContext } from 'react'
import axios from 'axios'
import { API_URL } from '@/config/index'
import StudentRegistration from '@/components/student/profile/StudentRegistration'
import Profile from '@/components/student/profile/Profile'
import { parseCookies } from '@/helpers/index'
import { toast } from 'react-toastify'
export default function profile({ data = '', statusCode = '', token = '' }) {
  const handleDeleteStudentData = async () => {
    const yes = window.confirm('This will delete the data and you will have to register again.')
    if (!yes) {
      return;
    }
    const res = await fetch(`${API_URL}/api/students/${data.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) {
      toast.warning('Something Went Wrong!')
    } else {
      toast.success('Successfully Deleted')
      window.location.reload();
    }
  }

  return (
    <Layout heading='Profile' >
      {statusCode === 204 ? (
        <StudentRegistration token={token} />
      ) : (
        <>
          {data.approved === 'rejected' && <div className='text-center text-red-500 text-lg'>
            <p className='animate-pulse'>Your profile has been rejected. Please contact your branch coordinator!</p>
            <button className='bg-red-500 text-black rounded-md py-1 px-2' onClick={handleDeleteStudentData} >Again Fill Form</button>
          </div>}
          <Profile student={data} token={token} />
        </>
      )}
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
