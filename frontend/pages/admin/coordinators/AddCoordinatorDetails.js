
import React, { useEffect, useState } from 'react'
import { BiSolidUser, BiMobile, BiLogoGmail } from "react-icons/bi";
import Head from 'next/head';
import { API_URL } from '@/config/index'
import Image from 'next/image'
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
  const [prev, setPrev] = useState({
    name: "Name",
    email: 'Email',
    mobile: 'Mobile',
    year: 'Year',
  })

  const fetchAllCoordinators = async (token) => {

    try {
      const res = await fetch(`${API_URL}/api/coordinators`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

    } catch (err) {
      throw new Error(err.message)
    }

  }



  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !formData.year || !formData.linkedin || !formData.twitter || !image) {
      toast.error('Please fill all the fields')
      return;
    }
    setLoading(true)
    const formDataToSend = new FormData();

    // const preview=


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
    setPrev({ ...prev, [e.target.name]: e.target.value })
    
  }
  const handleimage = (e) => {
    setImage(e.target.files[0]);
  };
  const deleteCoordinator = async (id) => {
    try {
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
    } catch (err) {
      console.log("error: ",err);
    }
  }
  
  useEffect(() => {
  fetchAllCoordinators(token)
  }, [])


  return (
    <>

      <Layout>

        <Breadcrumbs pages={pages} />

        <div className={'flex justify-center w-[100%] items-center'}>
          <div className={' w-[85%] flex flex-col h-[100%]'}>
            <div className='bg-white mx-auto sm:static my-4 rounded-md w-[100%] flex h-[100%] justify-center items-start flex-col sm:flex-row sm:justify-between p-3'>

              <div className={' relative w-[100%] sm:w-[50%] h-[100vh] flex flex-col justify-center '}>
                <h1 className='my-2 h-[10%] text-2xl font-semibold flex justify-center items-start w-[100%]  sm:text-xl md:text-2xl '>Coordinator Details</h1>

                <div className={'flex flex-col justify-center items-center h-[90%]'}>
                  <div className={" sm:w-[80%] w-[75%] md:w-[40%] h-[58%] sm:h-[55%] bg-[url('/images/genericProfile.png')] bg-center bg-cover bg-no-repeat bg-cyan-500 flex justify-center items-center "}>
                    {/*<Image*/}
                    {/*    src={'/images/genericProfile.png'}*/}
                    {/*    width={280}*/}
                    {/*    height={300}*/}
                    {/*    className={''}*/}
                    {/*></Image>*/}
                  </div>


                  <div
                    className={'absolute flex flex-col justify-end font-poppins border-1 border-solid rounded-2xl items-center md:w-[50%] w-[80%] sm:w-[70%] bg-black bg-opacity-70 text-white h-[55%] sm:h-[56%] md:pb-3 text-sm sm:pb-7 md:text-md text-md pb-3 mb-4'}>
                    <div className={'flex border-b-2 p-1 m-1  border-solid border-white '}>
                      <label className={'flex items-center px-1'}><BiSolidUser /></label>
                      <p className={'m-1  w-[8rem] overflow-x-hidden'} id={'name'}  >{prev.name}</p>
                    </div>
                    <div className={'flex border-b-2 p-1 m-1  border-solid border-white '}>
                      <label className={'flex items-center  px-1'}><BiLogoGmail /></label>
                      <p className={'m-1  w-[8rem] overflow-x-hidden'} id={'name'} >{prev.email}</p>
                    </div>
                    <div className={'flex border-b-2 p-1 m-1  border-solid border-white '}>
                      <label className={'flex items-center px-1'}><BiMobile /></label>
                      <p className={'m-1 w-[8rem] overflow-x-hidden'} id={'name'} >{prev.mobile}</p>
                    </div>
                    {/*<p className={'m-1 '} id={'year'} >{prev.year}</p>*/}
                  </div>
                </div>

              </div>
              <form id="addCoordinatorDetailsForm" className='flex flex-col items-center sm:justify-around w-[100%] sm:w-[50%] md:w-[50%] '>
                <div className='m-2 mx-3  flex w-[100%] flex-col sm:w-[90%] md:w-[60%]'>
                  <label htmlFor="name" className="my-1">Name</label>
                  <input type="text" name='name' value={formData.name} onChange={handleOnChange} placeholder={"Coordinator's Name"} className="bg-white border-1  rounded-md focus:ring-0 focus:border-2 focus:border-solid focus:border-yellow-500" />
                </div>
                <div className='m-2 mx-3   flex w-[100%] flex-col sm:w-[90%] md:w-[60%]  '>
                  <label htmlFor="email" className="mx-1">Email</label>
                  <input type="text" name='email' value={formData.email} onChange={handleOnChange} placeholder={"Coordinator's Email"} className="bg-white border-1 rounded-md focus:ring-0 focus:border-2 focus:border-solid focus:border-yellow-500" />
                </div>
                <div className='m-2 mx-3   flex w-[100%] flex-col sm:w-[90%] md:w-[60%]  '>
                  <label htmlFor="mobile" className="mx-1" >Mobile</label>
                  <input type="text" name='mobile' value={formData.mobile} onChange={handleOnChange} placeholder={"Mobile No."} className="bg-white border-1 rounded-md focus:ring-0 focus:border-2 focus:border-solid focus:border-yellow-500 " />
                </div>
                <div className='m-2 mx-3   flex w-[100%] flex-col sm:w-[90%] md:w-[60%] '>
                  <label htmlFor="year" className="mx-1" >Year</label>
                  <input type="text" name='year' value={formData.year} onChange={handleOnChange} placeholder={"Year"} className="bg-white border-1 rounded-md focus:ring-0 focus:border-2 focus:border-solid focus:border-yellow-500 " />
                </div>

                <div className='m-2 mx-3   flex w-[100%] flex-col sm:w-[90%] md:w-[60%] '>
                  <label htmlFor="linkedin" className="mx-1">Linkedin</label>
                  <input type="text" name='linkedin' value={formData.linkedin} onChange={handleOnChange} placeholder={"Coordinator's LinkedIn"} className="bg-white border-1 rounded-md focus:ring-0 focus:border-2 focus:border-solid focus:border-yellow-500" />
                </div>
                <div className='m-2 mx-3 flex w-[100%] flex-col sm:w-[90%] md:w-[60%] '>
                  <label htmlFor="twitter" className="mx-1">Twitter</label>
                  <input type="text" name='twitter' value={formData.twitter} onChange={handleOnChange} placeholder={"Coordinator's Twitter"} className="bg-white border-1 rounded-md focus:ring-0 focus:border-2 focus:border-solid focus:border-yellow-500" />
                </div>
                {/*<div className='m-2  flex w-[100%] sm:w-[50%] flex-col '>*/}
                {/*  <label for = "addCoordiantorDetailsImage"  className="  rounded-md px-2 ">Image</label>*/}
                {/*  <input id={"addCoordiantorDetailsImage"} className=" w-full self-center" type="file" placeholder={"choose some file"} name='image' onChange={e => setImage(e.target.files[0])}  />*/}
                {/*</div>*/}

                <div className='m-2 flex w-[100%] sm:w-[90%] md:w-[60%]  flex-col '>
                  <label className="block mb-2 text-gray-900 dark:text-black " htmlFor="file_input">Upload file</label>
                  <input onChange={handleimage} className="block  w-full sm:text-md md:text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:ring-0 focus:border-2 focus:border-solid focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"></input>
                </div>

              </form>
            </div>
            <div className="flex justify-center " >
              <button type='submit' onClick={handleSubmit} className='px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-gradient-to-r from-sky-500 to-indigo-500 bg-yellow-600 focus:ring-0 focus:border-2 focus:border-solid focus:border-yellow-500'>{loading ? 'Submitting...' : 'Submit'}</button>
            </div>

          </div>
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