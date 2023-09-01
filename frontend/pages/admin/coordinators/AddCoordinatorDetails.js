import React, { useState } from 'react'
import { API_URL } from '@/config/index'
import Layout from '@/components/admin/Layout'
import { toast } from 'react-toastify'
import Breadcrumbs from '@/components/admin/Breadcrumbs'
import { parseCookies } from '@/helpers/index'
export default function AddCoordinatorDetails({ token }) {

  const pages = [
    { name: 'Coordinators', href: '/admin/coordinators', current: false },
    { name: `Add Coordinator Details`, href: '#', current: true },
  ]

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    year: '',
    linkedin: '',
    twitter: '',
  })
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !formData.year || !formData.linkedin || !formData.twitter || !image) {
      toast.error('Please fill all the fields')
      return;
    }
    setLoading(true)
    const formDataToSend = new FormData();
    const userData = {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      year: formData.year,
      linkedin: formData.linkedin,
      twitter: formData.twitter,
    };
    formDataToSend.append('data', JSON.stringify(userData));
    formDataToSend.append('files.image', image);
    try {
      const resp = await fetch(`${API_URL}/api/coordinators`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      })
      if (resp.ok) {
        setLoading(false)
        toast.success('Coordinator Added Successfully');
      }
      else {
        setLoading(false)
        toast.error('Something Went Wrong');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something Went Wrong');
      setLoading(false)
    }
  }
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const deleteCoordinator = async (id) => {
    const yes = window.confirm('Are you sure you want to delete this coordinator?')
    if (!yes) {
      return
    }
    const resp = await fetch(`${API_URL}/api/coordinators/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (resp.ok) {
      console.log("Coordinator Deleted Successfully")
    } else {
      console.log("Something Went Wrong")
    }
  }



  return (
    <>
      <Layout>

        <Breadcrumbs pages={pages}/>

        <div className='bg-white mx-auto sm:static  w-[70%] sm:w-full my-4 rounded-md flex flex-col justify-center sm:flex-row sm:justify-between p-3'>

          <h1 className='m-7 text-xl font-semibold '>Coordinator Deatils</h1>
          <form className='flex flex-wrap items-center sm:justify-around w-[85%]'>
            <div className='m-2 mx-3  flex w-[100%] flex-col sm:w-auto '>
              <label htmlFor="name" className="my-1">Name</label>
              <input type="text" name='name' value={formData.name} onChange={handleOnChange} placeholder={"Coordinator's Name"} className="bg-white border-1 rounded-md" />
            </div>
            <div className='m-2 mx-3   flex w-[100%] flex-col sm:w-auto '>
              <label htmlFor="email"  className="mx-1">Email</label>
              <input type="text" name='email' value={formData.email} onChange={handleOnChange} placeholder={"Coordinator's Email"} className="bg-white border-1 rounded-md" />
            </div>
            <div className='m-2 mx-3   flex w-[100%] flex-col sm:w-auto '>
              <label htmlFor="mobile" className="mx-1" >Mobile</label>
              <input type="text" name='mobile' value={formData.mobile} onChange={handleOnChange} placeholder={"Mobile No."} className="bg-white border-1 rounded-md" />
            </div>
            <div className='m-2 mx-3   flex w-[100%] flex-col sm:w-auto '>
              <label htmlFor="year" className="mx-1" >Year</label>
              <input type="text" name='year' value={formData.year} onChange={handleOnChange} placeholder={"Year"} className="bg-white border-1 rounded-md" />
            </div>

            <div className='m-2 mx-3   flex w-[100%] flex-col sm:w-auto '>
              <label htmlFor="linkedin" className="mx-1">Linkedin</label>
              <input type="text" name='linkedin' value={formData.linkedin} onChange={handleOnChange} placeholder={"Coordinator's LinkedIn"} className="bg-white border-1 rounded-md" />
            </div>
            <div className='m-2 mx-3 flex w-[100%] flex-col sm:w-auto '>
              <label htmlFor="twitter" className="mx-1">Twitter</label>
              <input type="text" name='twitter' value={formData.twitter} onChange={handleOnChange} placeholder={"Coordinator's Twitter"} className="bg-white border-1 rounded-md" />
            </div>
            <div className='m-2 mx-3 flex w-[100%] sm:w-[50%] flex-col '>
              <label htmlFor="image"  className=" ">Image</label>
              <input className=" w-full  self-center" type="file" name='image' onChange={e => setImage(e.target.files[0])}  />
            </div>

          </form>
        </div>

        <div className="relative left-[50%] sm:left-[85%] md:left-[90%] md:mx-auto lg:m-5" >
          <button type='submit' onClick={handleSubmit} className='bg-yellow-400 p-2 rounded-sm'>{loading ? 'Submitting...' : 'Submit'}</button>
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  return {
    props: { token: token }, // will be passed to the page component as props
  }
}