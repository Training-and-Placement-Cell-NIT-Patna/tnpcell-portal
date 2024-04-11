
import React, { useEffect, useState } from 'react'
import { BiSolidUser, BiMobile, BiLogoGmail } from "react-icons/bi";
import { API_URL } from '@/config/index'
import Layout from '@/components/admin/Layout'
import { toast } from 'react-toastify'
import Breadcrumbs from '@/components/admin/Breadcrumbs'
import { parseCookies } from '@/helpers/index'
import axios from 'axios'
export default function EditTpcCoordinator({ token, user }) {



  const [formData, setFormData] = useState({
    name: user.username,
    email: user.email,
    mobile: user.mobile,
    year: user.year,
    linkedin: user.linkedin,
    twitter: user.twitter,
    imgId: ''
  })
  const [toUpdateImg , setToUpdateImg] = useState(false);
  const [image, setImage] = useState(null);
  const [fetchedImage , setFetchedImage] = useState(null);
  const [loading, setLoading] = useState(false)
  const [prev, setPrev] = useState({
    name: 'Name',
    email: "Email",
    mobile: "Mobile",
    year: "Year",
    linkedin: "LinkedIn",
    twitter: "Twitter",
    imgId: ''
  })


  // uploading the image



  // removing bg logic

async function removeBg(){

  try {
    const res = await axios(`http://localhost:1337/api/upload/files/${formData.imgId}`,{
    method:'delete',
    headers: {
      Authorization: `Bearer ${token}`,
    },  })



    if(res.data.id){
      toast.success("Image has been successfully deleted");
    } else {
      toast.error("Something went wrong"); // when the problems is from server side
    }
  } catch (err) {
    toast.error("Something went wrong") // when the problems is from client side
  }
}

  const fetchAllCoordinators = async (id) => {

    fetch(`http://localhost:1337/api/coordinators/${id}?populate=*`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then((res) => {
        return res.json();
      }).then((res) => {

        const image = res.data.attributes.image;


        const data = res.data.attributes;


        setFormData(
          {
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            year: data.year,
            linkedin: data.linkedin,
            twitter: data.twitter,
            imgId: (image.data) ? (image.data?.id):null
          }
        )

        setFetchedImage(image.data?.attributes)

      })
      .catch((err) => {
        throw new Error(err.message);
        
      })
  }



  useEffect(() => {
    fetchAllCoordinators(user.id)
  }, [])


  const pages = [
    { name: 'Coordinators', href: '/admin/coordinators', current: false },
    { name: `Add Coordinator Details`, href: '#', current: true },
  ]

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => { 

    e.preventDefault();

    if (!formData.name || !formData.email || !formData.mobile || !formData.year || !formData.linkedin || !formData.twitter ) {

      // console.log("check something below: ")
      // console.log("name: ",formData.name," email: ",formData.email, " mobile: ",formData.mobile, " twitter: ",formData.twitter, " linkedin: ",formData.linkedin," year: ",formData.year , " image: ",image)

      toast.error('Please fill all the fields')
      return;
    }

    if(fetchedImage && image){ // prevent the admin for uploading more than one image for single coordinator
      toast.error("Image is already uploaded")
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
   if(!fetchedImage) formDataToSend.append('files.image', image); // update the image only when there is none
    try 
    {
      /**
       * this thing have to change
       */

      const resp = await fetch(`${API_URL}/api/coordinators/${user.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      })
      if (resp.ok) {
        setLoading(false)
        toast.success('Coordinator Updated Successfully');
      }
      else {
        // console.log("resp: ",resp)
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





  return (
    <>


      <div className={'flex justify-center w-[100%] items-center'}>
        <div className={' w-[85%] flex flex-col h-[60%]'}>
          <div className='bg-white mx-auto sm:static my-4 rounded-md w-[100%] flex h-[70%] justify-center items-start flex-col sm:flex-row sm:justify-between p-3'>

            <div className={' relative w-[100%] sm:w-[50%] h-[70vh] flex flex-col'}>
              <h1 className='my-2 h-[10%] text-2xl font-semibold flex justify-center items-start w-[100%]  sm:text-xl md:text-2xl '>Coordinator Details</h1>

              <div
                // style={{backgroundSize:'cover'}}
                className={'flex flex-col h-[80%] items-center'}>
                <div
                  style={{ backgroundImage: `url(${fetchedImage ? `${API_URL}${fetchedImage.url}` : '/images/genericProfile.png'})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'top', backgroundSize: 'cover' }}
                  className={" sm:w-[80%] w-[75%] md:w-[65%] h-[46%] sm:h-[100%] bg-center bg-cover bg-no-repeat flex justify-center items-center "}>

                  {
                    fetchedImage ? null : (
                      <>

                        <div
                          className={'absolute flex flex-col justify-end font-poppins border-1 border-solid rounded-2xl items-center md:w-[66%] w-[70%] sm:w-[85%] bg-black bg-opacity-70 text-white h-[41%] sm:h-[75%] md:pb-3 text-sm sm:pb-7 md:text-md text-md pb-3 mb-4'}>
                        </div>
                      </>
                    )
                  }

                </div>

              

                <button type="button" onClick={removeBg} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Remove Image</button>
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

              <div className='m-2 flex w-[100%] sm:w-[90%] md:w-[60%]  flex-col '>
                <label className="block mb-2 text-gray-900 dark:text-black " htmlFor="file_input">Update Image</label>
                <div className="flex items-center justify-center w-full">
                  <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>

                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">{(image) ? (image.name):"Click to upload"}</span> {image ? null:("or drag and drop")}</p>

                    </div>
                    <input onChange={handleImage} id="dropzone-file" aria-describedby="file_input_help" type="file" className="hidden" />
                  </label>
                </div>
              </div>


              {/* <div className='col-span-5 sm:col-span-2'>

<div className="flex items-center ps-4 border border-gray-200 rounded-xl dark:border-gray-700">
  <input id="bordered-checkbox-1" type="checkbox" name="bordered-checkbox" onChange={(e) => { setToUpdateImg(e.target.checked); }} clxzassName="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 m-1  mx-2 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
  <label for="bordered-checkbox-1" className="w-full py-4 ms-2 text-sm font-Medium text-black dark:text-black">Want to update the image</label>

</div>
</div> */}





            </form>
          </div>
          <div className="flex justify-center " >
            <button type='submit' onClick={handleSubmit} className='px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-gradient-to-r from-sky-500 to-indigo-500 bg-yellow-600 focus:ring-0 focus:border-2 focus:border-solid focus:border-yellow-500'>{loading ? 'Submitting...' : 'Submit'}</button>
          </div>

        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ req , query}) {
  const { token } = parseCookies(req)

  return {
    props: { token: token },
  }
}