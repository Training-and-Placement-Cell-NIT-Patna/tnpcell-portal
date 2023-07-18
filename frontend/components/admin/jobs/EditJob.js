import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { TrashIcon } from '@heroicons/react/solid'
import { toast } from 'react-toastify'
import { API_URL } from '@/config/index'
import moment from 'moment'

export default function EditJob({ token = '', job = '' }) {
  const id = job.id
  const { company, createdAt, updatedAt, publishedAt, jaf, ...newJob } =
    job.attributes

  if (newJob.start_date) {
    // newJob.start_date = moment(newJob.start_date)
    //   .local()
    //   .format('yyyy-MM-DDThh:mm:ss.SSS')
    newJob.start_date = moment(newJob.start_date).utcOffset('+0530', true)
  }
  if (newJob.last_date) {
    // newJob.last_date = moment(newJob.last_date)
    //   .local()
    //   .format('yyyy-MM-DDThh:mm:ss.SSS')
    newJob.last_date = moment(newJob.last_date).utcOffset('+0530', true)
  }

  const [values, setValues] = useState(newJob)

  const router = useRouter()

  const [eligibleCourses, setEligibleCourses] = useState(
    new Set(
      // convert string of values to numbers
      values.eligible_courses.split(',').map(Number)
    )
  )

  const [programs, setPrograms] = useState([])

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        const res = await fetch(`${API_URL}/api/jobs/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (res.status === 200) {
          toast.success('Job deleted successfully')
          router.push('/admin/jobs')
        }
      } catch (error) {
        toast.error('Error deleting job')
        console.log(error)
      }
    }
  }

  const handleCheckboxChange = (e) => {
    const { id } = e.target
    if (e.target.checked) {
      setEligibleCourses((prev) => new Set([...prev, parseInt(id)]))
    } else {
      setEligibleCourses(
        (prev) => new Set([...prev].filter((course) => course !== parseInt(id)))
      )
    }
  }

  const handleDateChange = (e) => {
    let { name, value } = e.target
    value = moment(value).utcOffset('+0530', true)
    setValues({ ...values, [name]: value === '' ? undefined : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    // const hasEmptyFields = Object.values(values).some((element) => {
    //   element === ''

    // })
    if (eligibleCourses.size === 0) {
      toast.error('Please select atleast one course')
      return
    }


    values['eligible_courses'] = Array.from(eligibleCourses).toString()



    if (confirm('Are you sure you edit job?')) {
      const res = await fetch(`${API_URL}/api/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: values }),
      })

      // console.log(JSON.stringify({ data: values }))

      

  if (values.POC1.name=="") {
    toast.error('Please add details of 1st POC')
    return
    
  }

  if (values.POC2.name=="") {
    toast.error('Please add details of 2nd POC')
    return
  }


      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error('No token included')
          return
        }
        const profile = await res.json()
        console.log(profile)
        toast.error('Something went wrong')
        toast.error('Error: ' + profile.error.details.errors[0].message)
      } else {
        toast.success('Job Edited Successfully')
      }
    }
  }

  const handleInputChange = (e) => {

    const { name, value } = e.target

    setValues({ ...values, [name]: value })
  }


  useEffect(() => {
    fetch(`${API_URL}/api/programs?populate=*`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPrograms(data.data)
      })
      .catch((err) => console.log(err))

    // console.log(eligibleCourses)
  }, [])


  
  const handleContactThreeInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      ['details_of_pay_package']: {
        ...values.details_of_pay_package,
        [name]: value,
      },
    })
  }


   
  const handleContactFourInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      ['hr']: {
        ...values.hr,
        [name]: value,
      },
    })
  }


  const handleUpload = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('jaf', newJaf)
    const res = await fetch(`${API_URL}/api/job/upload-jaf?jobId=${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
    console.log('res', res)
    if (res.status === 200) {
      toast.success('JAF uploaded successfully')
      // reload after 3 seconds
      setTimeout(() => {
        router.reload()
      }, 3000)
    } else {
      toast.error('Error uploading JAF')
    }
  }
  const [newJaf, setNewJaf] = useState('')

  const handleFileChange = (e) => {
    setNewJaf(e.target.files[0])
  }


  const handleContactOneInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      ['POC1']: {
        ...values.POC1,
        [name]: value,
      },
    })
  }
  const handleContactTwoInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      ['POC2']: {
        ...values.POC2,
        [name]: value,
      },
    })
  }



  return (
    <>
      <form onSubmit={handleUpload}>
        <div className='py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6'>
          <dt className='text-sm font-medium text-gray-500 sm:col-span-1'>
            JAF
          </dt>
          <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1'>
            {jaf.data ? (
              <div>
                JAF is already uploaded.
                <div>
                  <a
                    href={API_URL + jaf.data.attributes.url}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <p className='inline-flex items-center px-3.5 py-2 mt-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'>
                      View JAF
                    </p>
                  </a>
                </div>
              </div>
            ) : (
              'No JAF uploaded'
            )}
          </dd>
          <div className='sm:col-span-2'>
            <label className='block text-sm font-medium text-gray-700'>
              JAF Upload
            </label>
            <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
              <div className='space-y-1 text-center'>
                {newJaf !== '' ? (
                  <div className='text-gray-600 text-sm'>
                    <object
                      className='w-full h-full'
                      data={URL.createObjectURL(newJaf)}
                      type='application/pdf'
                      width='100%'
                      height='100%'
                    >
                      <p>Pdf preview is not supported in your browser.</p>
                    </object>
                  </div>
                ) : (
                  <svg
                    className='mx-auto h-12 w-12 text-gray-400'
                    stroke='currentColor'
                    fill='none'
                    viewBox='0 0 48 48'
                    aria-hidden='true'
                  >
                    <path
                      d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                      strokeWidth={2}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                )}
                <div className='flex text-sm text-gray-600'>
                  <label
                    htmlFor='jaf'
                    className='relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yellow-500'
                  >
                    <span>Upload a file</span>
                    <input
                      // value={values.profile_pic}
                      onChange={handleFileChange}
                      id='jaf'
                      name='jaf'
                      type='file'
                      className='sr-only'
                      required
                      accept='application/pdf'
                    />
                  </label>
                  <p className='pl-1'>or drag and drop</p>
                </div>
                <p className='text-xs text-gray-500'>PDF up to 500KB</p>
              </div>
            </div>
            <button
              type='submit'
              className='inline-flex items-center px-3.5 py-2 mt-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
            >
              Update
            </button>
          </div>
        </div>
      </form>

      <form onSubmit={handleSubmit}>
        <div className='space-y-6 mt-4'>
          <div className='bg-white shadow px-4 py-5 sm:rounded-md sm:p-6'>
            <div className=''>
              <h3 className='text-lg font-medium leading-6 text-gray-900 mb-4'>
                Job Details
              </h3>
              {/* <p className='mt-1 text-sm text-gray-500'>
              Some other details of the job
            </p> */}
            </div>
            <div className='md:grid md:grid-cols-3 md:gap-6'>
              <div className='mt-5 md:mt-0 md:col-span-3'>
                <div className='grid grid-cols-6 gap-6'>


                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='company_address'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Company
                    </label>
                    <p className='mt-1 block w-full py-2 px-3 border border-green-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'>
                      {company.data.attributes.company_name}
                    </p>
                  </div>


                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='company_category'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Company Category
                    </label>
                    <p className='mt-1 block w-full py-2 px-3 border border-green-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'>
                      {company.data.attributes.company_category}
                    </p>
                  </div>


                  
                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='industry_sector'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Industry Sector
                    </label>
                    <p className='mt-1 block w-full py-2 px-3 border border-green-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'>
                      {company.data.attributes.industry_sector}
                    </p>
                  </div>


                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='job_title'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Job Title
                    </label>
                    <input
                      value={values.job_title}
                      onChange={handleInputChange}
                      type='text'
                      name='job_title'
                      id='job_title'
                      autoComplete='job_title'
                      className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>


                  <div className='col-span-6 sm:col-span-2'>
                    <label
                      htmlFor='classification'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Classification
                    </label>
                    <select
                      name='classification'
                      onChange={handleInputChange}
                      value={values.classification}
                      className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
                    >
                      <option value=''>Select Classification</option>
                      <option value='A1'>A1</option>
                      <option value='A2'>A2</option>
                      <option value='X'>X</option>
                      <option value='none'>None (for Internship)</option>
                    </select>
                  </div>


                  <div className='col-span-6 sm:col-span-2'>
                    <label
                      htmlFor='category'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Internship / FTE
                    </label>
                    <select
                      name='category'
                      onChange={handleInputChange}
                      value={values.category}
                      className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
                    >
                      <option value=''>Select</option>
                      <option value='Internship'>Internship</option>
                      <option value='FTE'>FTE</option>
                    </select>
                  </div>



                  <div className='col-span-6 sm:col-span-2'>
                    <label
                      htmlFor='job_status'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Job Status
                    </label>
                    <select
                      name='job_status'
                      onChange={handleInputChange}
                      value={values.job_status}
                      className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
                    >
                      <option value=''>Select</option>
                      <option value='open'>open</option>
                      <option value='ongoing'>ongoing</option>
                      <option value='results_declared'>results_declared</option>
                      <option value='abandoned'>abandoned</option>
                    </select>
                  </div>

                  <div className='col-span-6 sm:col-span-2'>
                    <label
                      htmlFor='min_X_marks'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Minimum X Marks
                      <small className='text-gray-500 ml-1'>
                        Ex: 88.5 (out of 100)
                      </small>
                    </label>
                    <input
                      value={values.min_X_marks}
                      onChange={handleInputChange}
                      type='number'
                      name='min_X_marks'
                      id='min_X_marks'
                      autoComplete='min_X_marks'
                      className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-2'>
                    <label
                      htmlFor='min_XII_marks'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Minimum XII Marks
                      <small className='text-gray-500 ml-1'>
                        Ex: 88.5 (out of 100)
                      </small>
                    </label>
                    <input
                      value={values.min_XII_marks}
                      onChange={handleInputChange}
                      type='number'
                      name='min_XII_marks'
                      id='min_XII_marks'
                      autoComplete='min_XII_marks'
                      className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-2'>
                    <label
                      htmlFor='min_cpi'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Minimum CPI
                      <small className='text-gray-500 ml-1'>
                        Ex: 8.86 (out of 10)
                      </small>
                    </label>
                    <input
                      value={values.min_cpi}
                      onChange={handleInputChange}
                      type='number'
                      name='min_cpi'
                      id='min_cpi'
                      autoComplete='min_cpi'
                      className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                  <div className='col-span-6 sm:col-span-2'>
                    <label
                      htmlFor='start_date'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Start Date
                    </label>
                    <input
                      defaultValue={values.start_date}
                      onChange={handleDateChange}
                      type='datetime-local'
                      name='start_date'
                      id='start_date'
                      autoComplete='start_date'
                      className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                    <small className='text-yellow-500 py-1 px-2 '>
                      {moment(newJob.start_date)
                        .local()
                        .format('yyyy-MM-DD hh:mm A')}
                    </small>
                  </div>
                  <div className='col-span-6 sm:col-span-2'>
                    <label
                      htmlFor='last_date'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Last Date
                    </label>
                    <input
                      defaultValue={values.last_date}
                      onChange={handleDateChange}
                      type='datetime-local'
                      name='last_date'
                      id='last_date'
                      autoComplete='last_date'
                      className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                    <small className='text-yellow-500 py-1 px-2 '>
                      {moment(newJob.last_date)
                        .local()
                        .format('yyyy-MM-DD hh:mm A')}
                    </small>
                  </div>
                  <div className='col-span-6 sm:col-span-2'>
                    <label
                      htmlFor='only_for_female'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Only for female
                    </label>
                    <select
                      name='only_for_female'
                      onChange={handleInputChange}
                      value={values.only_for_female}
                      className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
                    >
                      <option value='false'>No</option>
                      <option value='true'>Yes</option>
                    </select>
                  </div>
                  <div className='col-span-6 sm:col-span-2'>
                    <label
                      htmlFor='only_for_pwd'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Only for PWD
                    </label>
                    <select
                      name='only_for_pwd'
                      onChange={handleInputChange}
                      value={values.only_for_pwd}
                      className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
                    >
                      <option value='false'>No</option>
                      <option value='true'>Yes</option>
                    </select>
                  </div>
                  <div className='col-span-6 sm:col-span-2'>
                    <label
                      htmlFor='only_for_ews'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Only for EWS
                    </label>
                    <select
                      name='only_for_ews'
                      onChange={handleInputChange}
                      value={values.only_for_ews}
                      className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
                    >
                      <option value='false'>No</option>
                      <option value='true'>Yes</option>
                    </select>
                  </div>


                  <div className='col-span-12 sm:col-span-6'>
                    <div className='grid grid-cols-12 gap-6'>
                      {programs.map((program) => (
                        <div
                          key={program.id}
                          className='col-span-6 sm:col-span-4'
                        >
                          <fieldset>
                            <legend className='block text-sm font-medium text-gray-900'>
                              {program.attributes.program_name}
                            </legend>
                            <div className='pt-6 space-y-3'>
                              {program?.attributes?.courses?.data?.map((course) => (
                                <div
                                  key={course.id}
                                  className='flex items-center'
                                >
                                  <input
                                    id={course.id}
                                    name={course.id}
                                    type='checkbox'
                                    // check if the course is in set of eligible courses
                                    defaultChecked={eligibleCourses.has(
                                      course.id
                                    )}
                                    onChange={handleCheckboxChange}
                                    className='h-4 w-4 border-gray-300 rounded-md text-yellow-600 focus:ring-yellow-500'
                                  />
                                  <label
                                    htmlFor={`${course.id}`}
                                    className='ml-3 text-sm text-gray-600'
                                  >
                                    {course.attributes.course_name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </fieldset>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>




          <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
          <div className='md:grid md:grid-cols-3 md:gap-6'>
            <div className='md:col-span-1'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Pay Package
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
              Details of Pay Package
              </p>
            </div>
            <div className='mt-5 md:mt-0 md:col-span-2'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='basic_salary'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Basic Salary
                  </label>
                  <input
                    value={values?.details_of_pay_package?.basic_salary}
                    onChange={handleContactThreeInputChange}
                    type='text'
                    name='basic_salary'
                    id='basic_salary'
                    autoComplete='basic_salary'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'              
                  />
                </div>

                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='allowance'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Allowance
                  </label>
                  <input
                    value={values?.details_of_pay_package?.allowance}
                    onChange={handleContactThreeInputChange}
                    type='text'
                    name='allowance'
                    id='allowance'
                    autoComplete='allowance'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>

                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='perks'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Perks
                  </label>
                  <input
                    value={values?.details_of_pay_package?.perks}
                    onChange={handleContactThreeInputChange}
                    type='text'
                    name='perks'
                    id='perks'
                    autoComplete='perks'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>

                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='ctc'
                    className='block text-sm font-medium text-gray-700'
                  >
                    CTC
                  </label>
                  <input
                    value={values?.details_of_pay_package?.ctc}
                    onChange={handleContactThreeInputChange}
                    type='text'
                    name='ctc'
                    id='ctc'
                    autoComplete='ctc'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>





         
        <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
          <div className='md:grid md:grid-cols-3 md:gap-6'>
            <div className='md:col-span-1'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                HR/Recruiter
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Contact Details Of HR/Recruiter
              </p>
            </div>
            <div className='mt-5 md:mt-0 md:col-span-2'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Name
                  </label>
                  <input
                    value={values?.hr?.name}
                    onChange={handleContactFourInputChange}
                    type='text'
                    name='name'
                    id='name'
                    autoComplete='name'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>

                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='mail_id'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Email
                  </label>
                  <input
                    value={values?.hr?.mail_id}
                    onChange={handleContactFourInputChange}
                    type='email'
                    name='mail_id'
                    id='mail_id'
                    autoComplete='email'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>

                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='mobile_no'
                    className='block text-sm font-medium text-gray-700'
                  >
                    	Telephone/ Mobile
                  </label>
                  <input
                    value={values?.hr?.mobile_no}
                    onChange={handleContactFourInputChange}
                    type='text'
                    name='mobile_no'
                    id='mobile_no'
                    autoComplete='tel-national'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>




        
        <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
          <div className='md:grid md:grid-cols-3 md:gap-6'>
            <div className='md:col-span-1'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                POC 1
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Details of 1st POC.
              </p>
            </div>
            <div className='mt-5 md:mt-0 md:col-span-2'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Full Name
                  </label>
                  <input
                    value={values.POC1.name}
                    onChange={handleContactOneInputChange}
                    type='text'
                    name='name'
                    id='name'
                    autoComplete='name'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>

                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='mail_id'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Email
                  </label>
                  <input
                    value={values.POC1.mail_id}
                    onChange={handleContactOneInputChange}
                    type='email'
                    name='mail_id'
                    id='mail_id'
                    autoComplete='email'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>

                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='mobile_no'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Mobile Number
                  </label>
                  <input
                    value={values.POC1.mobile_no}
                    onChange={handleContactOneInputChange}
                    type='text'
                    name='mobile_no'
                    id='mobile_no'
                    autoComplete='tel-national'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              
                {/* <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='designation'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Designation
                  </label>
                  <input
                    value={values.contact1.designation}
                    onChange={handleContactOneInputChange}
                    type='text'
                    name='designation'
                    id='designation'
                    autoComplete='designation'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div> */}

              </div>
            </div>
          </div>
        </div>

        <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
          <div className='md:grid md:grid-cols-3 md:gap-6'>
            <div className='md:col-span-1'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                POC 2
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Details of 2nd POC.
              </p>
            </div>
            <div className='mt-5 md:mt-0 md:col-span-2'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Full Name
                  </label>
                  <input
                    value={values.POC2.name}
                    onChange={handleContactTwoInputChange}
                    type='text'
                    name='name'
                    id='name'
                    autoComplete='name'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>

                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='mail_id'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Email
                  </label>
                  <input
                    value={values.POC2.mail_id}
                    onChange={handleContactTwoInputChange}
                    type='email'
                    name='mail_id'
                    id='mail_id'
                    autoComplete='email'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>

                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='mobile_no'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Mobile Number
                  </label>
                  <input
                    value={values.POC2.mobile_no}
                    onChange={handleContactTwoInputChange}
                    type='text'
                    name='mobile_no'
                    id='mobile_no'
                    autoComplete='tel-national'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>

                {/* <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='designation'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Designation
                  </label>
                  <input
                    value={values.contact2.designation}
                    onChange={handleContactTwoInputChange}
                    type='text'
                    name='designation'
                    id='designation'
                    autoComplete='designation'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div> */}

              </div>
            </div>
          </div>
        </div>








          <div className='flex justify-end'>
            <button
              type='button'
              onClick={handleDelete}
              className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            >
              <TrashIcon className='w-5 h-5 text-white' />
            </button>
            <button
              type='submit'
              className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
            >
              Edit
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
