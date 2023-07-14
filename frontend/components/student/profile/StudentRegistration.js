import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { API_URL } from '@/config/index'
import AuthContext from '@/context/AuthContext'

export default function StudentRegistration({ token = '' }) {
  const [values, setValues] = useState({
    name: '',
    roll: '',
    personal_email_id: '',
    institute_email_id: '',
    mobile_number_1: '',
    mobile_number_2: '',
    gender: '',
    category: '',
    father_name: '',
    father_occupation: '',
    mother_name: '',
    mother_occupation: '',
    blood_group: '',
    height: '',
    weight: '',
    type_of_disability: '',
    disibilaty_percentage: '',
    address: '',
    domicile: '',
    city: '',
    state: '',
    pin_code: '',
    correspondance_address: '',
    date_of_birth: '',
    rank: '',
    categoryRank: '',
    // registered_for: '',
    program: '',
    pwd: false,
    department: '',
    course: '',
    spi_1: '',
    spi_2: '',
    spi_3: '',
    spi_4: '',
    spi_5: '',
    spi_6: '',
    spi_7: '',
    spi_8: '',
    spi_9: '',
    cpi: '',
    X_board: '',
    X_YOP: '',
    X_marks: '',
    XII_board: '',
    XII_YOP: '',
    XII_marks: '',
    bachelor_marks: '',
    master_marks: '',
    admission_year: '',
    total_backlogs: '',
    current_backlogs: '',
    current_status: '',
    disability_certificate: '',
    aadhar_no: '',
    driving_licience_no: '',
    driving_licience_link: '',
    pancard_no: '',
    all_sem_marksheet: '',
    X_marksheet: '',
    XII_marksheet: ''
  })

  const router = useRouter()
  const { user } = useContext(AuthContext)
  if (user && user.username) {
    values.roll = user.username
    values.institute_email_id = user.email
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    // const hasEmptyFields = Object.values(values).some((element) => {
    //   element === ''

    // })

    if (confirm('Are you sure you want to submit for approval?')) {
      const res = await fetch(`${API_URL}/api/student/submit-for-approval`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: values }),
      })
      console.log(JSON.stringify({ data: values }))


      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error('No token included')
          return
        }
        const profile = await res.json()
        console.log(JSON.stringify(profile, null, 2))
        toast.error(profile?.error.name)
      } else {
        const profile = await res.json()
        toast.success('Profile Submitted for Approval')
        router.push(`/student/profile`)
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const [programs, setPrograms] = useState([])

  const [courses, setCourses] = useState([])

  //get courses of selected program

  useEffect(() => {
    fetch(`${API_URL}/api/programs?populate=*`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPrograms(data?.data)
      })
  }, [])

  useEffect(() => {
    programs.map((program) => {
      if (program.id === parseFloat(values.program)) {
        setCourses(program?.attributes?.courses?.data)
      }
    })
  }, [values?.program])

  return (
    <form onSubmit={handleSubmit}>
      <div className=' min-h-full mt-2'>
        <div className='md:col-span-1 py-5 '>
          <div className='my-4'>

            <div className='mt-5 md:mt-0 md:col-span-2 shadow-xl bg-white p-4'>
              <h3 className='text-2xl font-bold leading-6 text-blue-900 p-2'>
                Personal Information
              </h3>
              <span className='m-1 text-sm font-medium text-red-600 '>
                * Student Personal Information, account will be active after admin
                approval.
              </span>
              <div className='grid grid-cols-9 gap-6'>
                <div className='col-span-9 sm:col-span-3'>
                  <label
                    htmlFor='roll'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Roll No.
                  </label>
                  <input
                    disabled
                    value={values.roll}
                    type='text'
                    name='roll'
                    id='roll'
                    readOnly={true}
                    autoComplete='roll'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 border-blue-900 '
                  />
                </div>


                <div className='col-span-9 sm:col-span-3'>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Full Name
                  </label>
                  <input
                    value={values.name}
                    onChange={handleInputChange}
                    type='text'
                    name='name'
                    id='name'
                    autoComplete='name'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>

                
                <div className='col-span-9 sm:col-span-3'>
                  <label
                    htmlFor='father_name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Father&apos;s Name
                  </label>
                  <input
                    value={values.father_name}
                    onChange={handleInputChange}
                    type='text'
                    name='father_name'
                    id='father_name'
                    autoComplete='father_name'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>

                <div className='col-span-9 sm:col-span-3'>
                  <label
                    htmlFor='father_occupation'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Father&apos;s Occupation
                  </label>
                  <input
                    value={values.father_occupation}
                    onChange={handleInputChange}
                    type='text'
                    name='father_occupation'
                    id='father_occupation'
                    autoComplete='father_occupation'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>



                <div className='col-span-9 sm:col-span-3'>
                  <label
                    htmlFor='mother_name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Mother&apos;s Name
                  </label>
                  <input
                    value={values.mother_name}
                    onChange={handleInputChange}
                    type='text'
                    name='mother_name'
                    id='mother_name'
                    autoComplete='mother_name'
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>

                <div className='col-span-9 sm:col-span-3'>
                  <label
                    htmlFor='mother_occupation'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Mother&apos;s Occupation
                  </label>
                  <input
                    value={values.mother_occupation}
                    onChange={handleInputChange}
                    type='text'
                    name='mother_occupation'
                    id='mother_occupation'
                    autoComplete='mother_occupation'
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>


                <div className='col-span-9 sm:col-span-3'>
                  <label
                    htmlFor='personal_email_id'
                    className='block text-sm font-medium text-gray-700 '
                  >
                    Personal Email
                  </label>
                  <input
                    value={values.personal_email_id}
                    onChange={handleInputChange}
                    type='email'
                    name='personal_email_id'
                    id='personal_email_id'
                    autoComplete='email'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>
                <div className='col-span-9 sm:col-span-3'>
                  <label
                    htmlFor='institute_email_id'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Institute Email
                  </label>
                  <input
                    disabled
                    value={values.institute_email_id}
                    onChange={handleInputChange}
                    pattern='.+@nitp\.ac\.in'
                    type='email'
                    name='institute_email_id'
                    id='institute_email_id'
                    autoComplete='email'
                    placeholder='Ex: 1234xx21@nitp.ac.in'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 border-blue-900 focus:ring-0 focus:border-stone-500'
                  />
                </div>

                <div className='col-span-9 sm:col-span-3'>
                  <label
                    htmlFor='mobile_number_1'
                    className='block text-sm font-medium text-gray-700'
                    required
                  >
                    Mobile Number 1
                  </label>
                  <input
                    value={values.mobile_number_1}
                    onChange={handleInputChange}
                    type='number'
                    name='mobile_number_1'
                    id='mobile_number_1'
                    autoComplete='tel-national'
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>
                <div className='col-span-9 sm:col-span-3'>
                  <label
                    htmlFor='mobile_number_2'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Mobile Number 2
                  </label>
                  <input
                    value={values.mobile_number_2}
                    onChange={handleInputChange}
                    type='number'
                    name='mobile_number_2'
                    id='mobile_number_2'
                    autoComplete='tel-national'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>
                <div className='col-span-2 sm:col-span-1'>
                  <label
                    htmlFor='gender'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Gender
                  </label>
                  <select
                    value={values.gender}
                    onChange={handleInputChange}
                    id='gender'
                    name='gender'
                    autoComplete='gender'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  >
                    <option value=''>Select</option>
                    <option value='female'>female</option>
                    <option value='male'>male</option>
                    <option value=''>other</option>
                  </select>
                </div>
                <div className='col-span-2 sm:col-span-1'>
                  <label
                    htmlFor='category'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Category
                  </label>
                  <select
                    value={values.category}
                    onChange={handleInputChange}
                    id='category'
                    name='category'
                    autoComplete='category'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  >
                    <option value=''>Select</option>
                    <option value='general'>General</option>
                    <option value='obc'>OBC</option>
                    <option value='sc'>SC</option>
                    <option value='st'>ST</option>
                    <option value='ews'>EWS</option>
                  </select>
                </div>

                <div className='col-span-2 sm:col-span-1'>
                  <label
                    htmlFor='pwd'
                    className='block text-sm font-medium text-gray-700'
                  >
                    PWD
                  </label>
                  <select
                    value={values.pwd}
                    onChange={handleInputChange}
                    id='pwd'
                    name='pwd'
                    autoComplete='pwd'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>


                <div className='col-span-9 sm:col-span-3'>
                  <label
                    htmlFor='type_of_disability'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Type Of Disability (If PWD)
                  </label>
                  <input
                    value={values.type_of_disability}
                    type='text'
                    name='type_of_disability'
                    id='type_of_disability'
                    autoComplete='type_of_disability'
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 border-blue-900 '
                  />
                </div>


                <div className='col-span-9 sm:col-span-3'>
                  <label
                    htmlFor='disability_percentage'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Disability Percentage (If PWD)
                  </label>
                  <input
                    value={values.disability_percentage}
                    type='text'
                    name='disability_percentage'
                    id='disability_percentage'
                    autoComplete='disability_percentage'
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 border-blue-900 '
                  />
                </div>



                
              <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='disability_certificate'
                    className='block text-sm font-medium text-gray-700'
                  >
                  Disability Certificate (IF PWD)
                  </label>
                  <input
                    value={values.disability_certificate}
                    onChange={handleInputChange}
                    type='text'
                    name='disability_certificate'
                    id='disability_certificate'
                    autoComplete='disability_certificate'
                    placeholder='Drive Link'
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>





                <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='date_of_birth'
                    className='block text-sm font-medium text-gray-700'
                  >
                       Date of Birth
                  </label>
                  <input
                    value={values.date_of_birth}
                    onChange={handleInputChange}
                    type='date'
                    name='date_of_birth'
                    id='date_of_birth'
                    autoComplete='date_of_birth'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>


                <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='blood_group'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Blood Group
                  </label>
                  <input
                    value={values.blood_group}
                    onChange={handleInputChange}
                    type='text'
                    name='blood_group'
                    id='blood_group'
                    autoComplete='blood_group'
                    placeholder='E.g- A+'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>


                <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='height'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Height
                  </label>
                  <input
                    value={values.height}
                    onChange={handleInputChange}
                    type='text'
                    name='height'
                    id='height'
                    autoComplete='height'
                    placeholder='In cm (E.g 68.9)'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>



                <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='weight'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Weight
                  </label>
                  <input
                    value={values.weight}
                    onChange={handleInputChange}
                    type='text'
                    name='weight'
                    id='weight'
                    autoComplete='weight'
                    placeholder='In Kg (E.g - 58)'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>

                




                <div className='col-span-10 sm:col-span-5'>
                  <label
                    htmlFor='address'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Permanent Address
                  </label>
                  <textarea
                    value={values.address}
                    onChange={handleInputChange}
                    rows={2}
                    name='address'
                    id='address'
                    autoComplete='address'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>


                
                <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='domicile'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Domicile
                  </label>
                  <input
                    value={values.domicile}
                    onChange={handleInputChange}
                    type='text'
                    name='domicile'
                    id='domicile'
                    autoComplete='domicile'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>

                 
                <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='city'
                    className='block text-sm font-medium text-gray-700'
                  >
                    City
                  </label>
                  <input
                    value={values.city}
                    onChange={handleInputChange}
                    type='text'
                    name='city'
                    id='city'
                    autoComplete='city'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>


                <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='state'
                    className='block text-sm font-medium text-gray-700'
                  >
                    State
                  </label>
                  <input
                    value={values.state}
                    onChange={handleInputChange}
                    type='text'
                    name='state'
                    id='state'
                    autoComplete='state'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>


                <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='pin_code'
                    className='block text-sm font-medium text-gray-700'
                  >
                    PIN CODE
                  </label>
                  <input
                    value={values.pin_code}
                    onChange={handleInputChange}
                    type='text'
                    name='pin_code'
                    id='pin_code'
                    autoComplete='pin_code'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>


                <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='correspondance_address'
                    className='block text-sm font-medium text-gray-700'
                  >
                    correspondence Address
                  </label>
                  <input
                    value={values.correspondance_address}
                    onChange={handleInputChange}
                    type='text'
                    name='correspondance_address'
                    id='correspondance_address'
                    autoComplete='correspondance_address'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>


                <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='aadhar_no'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Aadhar No
                  </label>
                  <input
                    value={values.aadhar_no}
                    onChange={handleInputChange}
                    type='text'
                    name='aadhar_no'
                    id='aadhar_no'
                    autoComplete='aadhar_no'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>


                <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='driving_licience_no'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Driving Licience No
                  </label>
                  <input
                    value={values.driving_licience_no}
                    onChange={handleInputChange}
                    type='text'
                    name='driving_licience_no'
                    id='driving_licience_no'
                    autoComplete='driving_licience_no'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>


                <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='driving_licience_link'
                    className='block text-sm font-medium text-gray-700'
                  >
                  Driving Licience
                  </label>
                  <input
                    value={values.driving_licience_link}
                    onChange={handleInputChange}
                    type='text'
                    name='driving_licience_link'
                    id='driving_licience_link'
                    autoComplete='driving_licience_link'
                    placeholder='Drive Link'
                  
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>


                <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='pancard_no'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Pan Card No
                  </label>
                  <input
                    value={values.pancard_no}
                    onChange={handleInputChange}
                    type='text'
                    name='pancard_no'
                    id='pancard_no'
                    autoComplete='pancard_no'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>










              </div>
            </div>
          </div>
          <div className='mt-9 md:mt-0 md:col-span-2 shadow-xl bg-white p-5'>
            <div className='py-5'>
              <h3 className='text-2xl font-bold leading-6 text-blue-900 p-2'>
                Academic Details
              </h3>
              <p className='mt-1 text-sm font-medium text-rose-700'>
                *Student Academic Information, account will be active after admin
                approval.
              </p>
            </div>
            <div className='grid grid-cols-10 gap-6'>
              <div className='col-span-8 sm:col-span-2'>
                <label
                  htmlFor='rank'
                  className='block text-sm font-medium text-gray-700'
                >
                  GATE / JEE / JAM Rank
                </label>
                <input
                  value={values.rank}
                  onChange={handleInputChange}
                  type='number'
                  name='rank'
                  id='rank'
                  autoComplete='rank'
                  className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                />
              </div>

              <div className='col-span-8 sm:col-span-2'>
                <label
                  htmlFor='categoryRank'
                  className='block text-sm font-medium text-gray-700'
                >
                  Category Rank
                </label>
                <input
                  value={values.categoryRank}
                  onChange={handleInputChange}
                  type='number'
                  name='categoryRank'
                  id='categoryRank'
                  autoComplete='categoryRank'
                  className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                />
              </div>
              <div className='col-span-8 sm:col-span-2'>
                <label
                  htmlFor='course'
                  className='block text-sm font-medium text-gray-700'
                >
                  Course
                </label>
                <select
                  value={values.course}
                  onChange={handleInputChange}
                  id='course'
                  name='course'
                  autoComplete='course'
                  required
                  className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                >
                  <option value=''>Select Course</option>
                  {courses?.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.attributes.course_name}
                    </option>
                  ))}
                </select>
              </div>

{/* 
              <div className='col-span-5 sm:col-span-2'>
                <label
                  htmlFor='registered_for'
                  className='block text-sm font-medium text-gray-700'
                >
                  Registering for
                </label>
                <select
                  value={values.registered_for}
                  onChange={handleInputChange}
                  id='registered_for'
                  name='registered_for'
                  autoComplete='registered_for'
                  required
                  className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                >
                  <option value=''>Select</option>
                  <option value='Internship'>Internship</option>
                  <option value='FTE'>FTE</option>
                </select>
              </div> */}




              <div className='col-span-5 sm:col-span-2'>
                <label
                  htmlFor='program'
                  className='block text-sm font-medium text-gray-700'
                >
                  Program
                </label>
                <select
                  value={values.program}
                  onChange={handleInputChange}
                  id='program'
                  name='program'
                  autoComplete='program'
                  required
                  className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                >
                  <option value=''>Select</option>
                  {programs.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.attributes.program_name}
                    </option>
                  ))}
                </select>
              </div>



              <div className='col-span-5 sm:col-span-2'>
                <label
                  htmlFor='X_board'
                  className='block text-sm font-medium text-gray-700'
                >
                  X Board
                </label>
                <input
                  value={values.X_board}
                  onChange={handleInputChange}
                  type='text'
                  name='X_board'
                  id='X_board'
                  // min={33}
                  // max={100}
                  // step='.01'
                  autoComplete='X_board'
                  // placeholder='In percentage Ex: 88.5'
                  required
                  className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                />
              </div>



              <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='X_YOP'
                    className='block text-sm font-medium text-gray-700'
                  >
                    X Year Of Passing
                  </label>
                  <input
                    value={values.X_YOP}
                    onChange={handleInputChange}
                    type='text'
                    name='X_YOP'
                    id='X_YOP'
                    autoComplete='X_YOP'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>


              <div className='col-span-5 sm:col-span-2'>
                <label
                  htmlFor='X_marks'
                  className='block text-sm font-medium text-gray-700'
                >
                  X Marks
                </label>
                <input
                  value={values.X_marks}
                  onChange={handleInputChange}
                  type='number'
                  name='X_marks'
                  id='X_marks'
                  min={33}
                  max={100}
                  step='.01'
                  autoComplete=''
                  placeholder='In percentage Ex: 88.5'
                  required
                  className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                />
              </div>


              <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='X_marksheet'
                    className='block text-sm font-medium text-gray-700'
                  >
                    X Marksheet
                  </label>
                  <input
                    value={values.X_marksheet}
                    onChange={handleInputChange}
                    type='text'
                    name='X_marksheet'
                    id='X_marksheet'
                    autoComplete='X_marksheet'
                  placeholder='Drive Link'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>




              <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='XII_board'
                    className='block text-sm font-medium text-gray-700'
                  >
                    XII Board
                  </label>
                  <input
                    value={values.XII_board}
                    onChange={handleInputChange}
                    type='text'
                    name='XII_board'
                    id='XII_board'
                    autoComplete='XII_board'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>


                <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='XII_YOP'
                    className='block text-sm font-medium text-gray-700'
                  >
                    XII Year Of Passing
                  </label>
                  <input
                    value={values.XII_YOP}
                    onChange={handleInputChange}
                    type='text'
                    name='XII_YOP'
                    id='XII_YOP'
                    autoComplete='XII_YOP'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>


              <div className='col-span-5 sm:col-span-2'>
                <label
                  htmlFor='XII_marks'
                  className='block text-sm font-medium text-gray-700'
                >
                  XII Marks
                </label>
                <input
                  value={values.XII_marks}
                  onChange={handleInputChange}
                  type='number'
                  name='XII_marks'
                  id='XII_marks'
                  min={33}
                  max={100}
                  step='.01'
                  placeholder='In percentage Ex: 88.5'
                  autoComplete='XII_marks'
                  required
                  className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                />
              </div>


              <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='XII_marksheet'
                    className='block text-sm font-medium text-gray-700'
                  >
                    XII Marksheet
                  </label>
                  <input
                    value={values.XII_marksheet}
                    onChange={handleInputChange}
                    type='text'
                    name='XII_marksheet'
                    id='XII_marksheet'
                    autoComplete='XII_marksheet'
                  placeholder='Drive Link'

                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>


              <div className='col-span-5 sm:col-span-2'>
                <label
                  htmlFor='admission_year'
                  className='block text-sm font-medium text-gray-700'
                >
                  Year of admission
                </label>
                <input
                  value={values.admission_year}
                  onChange={handleInputChange}
                  type='number'
                  min={2000}
                  max={2200}
                  name='admission_year'
                  id='admission_year'
                  autoComplete='admission_year'
                  placeholder='Ex: 2022'
                  required
                  className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                />
              </div>



              <div className='col-span-5 sm:col-span-2'>
                <label
                  htmlFor='cpi'
                  className='block text-sm font-medium text-gray-700'
                >
                  CPI (Current)
                </label>
                <input
                  required
                  value={values.cpi}
                  onChange={handleInputChange}
                  type='number'
                  min={2}
                  max={10}
                  step='.01'
                  placeholder='Ex: 8.86'
                  name='cpi'
                  id='cpi'
                  autoComplete=''
                  className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                />
              </div>
              <div className='col-span-5 sm:col-span-2'>
                <label
                  htmlFor='bachelor_marks'
                  className='block text-sm font-medium text-gray-700'
                >
                  Bachelor&apos;s Marks
                </label>
                <input
                  value={values.bachelor_marks}
                  onChange={handleInputChange}
                  type='number'
                  name='bachelor_marks'
                  id='bachelor_marks'
                  min={2}
                  max={10}
                  step='.01'
                  placeholder='Ex: 8.86'
                  autoComplete=''
                  className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                />
              </div>
              <div className='col-span-5 sm:col-span-2'>
                <label
                  htmlFor='master_marks'
                  className='block text-sm font-medium text-gray-700'
                >
                  {/* Master marks for those who have completed */}
                  Master&apos;s Marks
                </label>
                <input
                  value={values.master_marks}
                  onChange={handleInputChange}
                  type='number'
                  name='master_marks'
                  id='master_marks'
                  min={2}
                  max={10}
                  step='.01'
                  placeholder='Ex: 8.86'
                  autoComplete=''
                  className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                />
              </div>

              <div className='col-span-2 sm:col-span-1'>
                <label
                  htmlFor='spi_1'
                  className='block text-sm font-medium text-gray-700'
                >
                  SPI-1
                </label>
                <input
                  value={values.spi_1}
                  onChange={handleInputChange}
                  type='number'
                  min={2}
                  max={10}
                  step='.01'
                  placeholder='Ex: 8.86'
                  name='spi_1'
                  id='spi_1'
                  autoComplete='spi_1'
                  className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                />
              </div>

              <div className='col-span-2 sm:col-span-1'>
                <label
                  htmlFor='spi_2'
                  className='block text-sm font-medium text-gray-700'
                >
                  SPI-2
                </label>
                <input
                  value={values.spi_2}
                  onChange={handleInputChange}
                  type='number'
                  min={2}
                  max={10}
                  step='.01'
                  placeholder='Ex: 8.86'
                  name='spi_2'
                  id='spi_2'
                  autoComplete=''
                  className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                />
              </div>

              <div className='col-span-2 sm:col-span-1'>
                <label
                  htmlFor='spi_3'
                  className='block text-sm font-medium text-gray-700'
                >
                  SPI-3
                </label>
                <input
                  value={values.spi_3}
                  onChange={handleInputChange}
                  type='number'
                  min={2}
                  max={10}
                  step='.01'
                  placeholder='Ex: 8.86'
                  name='spi_3'
                  id='spi_3'
                  autoComplete=''
                  className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                />
              </div>
              <div className='col-span-2 sm:col-span-1'>
                <label
                  htmlFor='spi_4'
                  className='block text-sm font-medium text-gray-700'
                >
                  SPI-4
                </label>
                <input
                  value={values.spi_4}
                  onChange={handleInputChange}
                  type='number'
                  min={2}
                  max={10}
                  step='.01'
                  placeholder='Ex: 8.86'
                  name='spi_4'
                  id='spi_4'
                  autoComplete=''
                  className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                />
              </div>
              <div className='col-span-2 sm:col-span-1'>
                <label
                  htmlFor='spi_5'
                  className='block text-sm font-medium text-gray-700'
                >
                  SPI-5
                </label>
                <input
                  value={values.spi_5}
                  onChange={handleInputChange}
                  type='number'
                  min={2}
                  max={10}
                  step='.01'
                  placeholder='Ex: 8.86'
                  name='spi_5'
                  id='spi_5'
                  autoComplete=''
                  className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                />
              </div>
              <div className='col-span-2 sm:col-span-1'>
                <label
                  htmlFor='spi_6'
                  className='block text-sm font-medium text-gray-700'
                >
                  SPI-6
                </label>
                <input
                  value={values.spi_6}
                  onChange={handleInputChange}
                  type='number'
                  min={2}
                  max={10}
                  step='.01'
                  placeholder='Ex: 8.86'
                  name='spi_6'
                  id='spi_6'
                  autoComplete=''
                  className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                />
              </div>
              <div className='col-span-2 sm:col-span-1'>
                <label
                  htmlFor='spi_7'
                  className='block text-sm font-medium text-gray-700'
                >
                  SPI-7
                </label>
                <input
                  value={values.spi_7}
                  onChange={handleInputChange}
                  type='number'
                  min={2}
                  max={10}
                  step='.01'
                  placeholder='Ex: 8.86'
                  name='spi_7'
                  id='spi_7'
                  autoComplete=''
                  className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                />
              </div>


              <div className='col-span-2 sm:col-span-1'>
                <label
                  htmlFor='spi_8'
                  className='block text-sm font-medium text-gray-700'
                >
                  SPI-8
                </label>
                <input
                  value={values.spi_8}
                  onChange={handleInputChange}
                  type='number'
                  min={2}
                  max={10}
                  step='.01'
                  placeholder='Ex: 8.86'
                  name='spi_8'
                  id='spi_8'
                  autoComplete=''
                  className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                />
              </div>


              <div className='col-span-2 sm:col-span-1'>
                <label
                  htmlFor='spi_9'
                  className='block text-sm font-medium text-gray-700'
                >
                  SPI-9
                </label>
                <input
                  value={values.spi_9}
                  onChange={handleInputChange}
                  type='number'
                  min={2}
                  max={10}
                  step='.01'
                  placeholder='Ex: 8.86'
                  name='spi_9'
                  id='spi_9'
                  autoComplete='spi_9'
                  className='mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-stone-500'
                />
              </div>


              
              <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='all_sem_marksheet'
                    className='block text-sm font-medium text-gray-700'
                  >
                  All Sem Marksheets
                  </label>
                  <input
                    value={values.all_sem_marksheet}
                    onChange={handleInputChange}
                    type='text'
                    name='all_sem_marksheet'
                    id='all_sem_marksheet'
                    autoComplete='all_sem_marksheet'
                    placeholder='Drive Link'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>


              <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='total_backlogs'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Total Backlogs
                  </label>
                  <input
                    value={values.total_backlogs}
                    onChange={handleInputChange}
                    type='text'
                    name='total_backlogs'
                    id='total_backlogs'
                    autoComplete='total_backlogs'
                    placeholder='Ex: 0,1'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>


                
              <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='current_backlogs'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Current Backlogs
                  </label>
                  <input
                    value={values.current_backlogs}
                    onChange={handleInputChange}
                    type='text'
                    name='current_backlogs'
                    id='current_backlogs'
                    autoComplete='current_backlogs'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>


                <div className='col-span-3 sm:col-span-1'>
                  <label
                    htmlFor='current_status'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Current Status
                  </label>
                  <input
                    value={values.current_status}
                    onChange={handleInputChange}
                    type='text'
                    name='current_status'
                    id='current_status'
                    autoComplete='current_status'
                    placeholder='Ex: P/F'
                    required
                    className='mt-0 block w-full px-0.5 border-0 border-b-2 text-sm text-gray-600 border-gray-300 focus:ring-0 focus:border-stone-500'
                  />
                </div>


            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-end'>
        <button
          type='submit'
          className='ml-3 inline-flex justify-center py-2 px-3 border border-transparent shadow-lg shadow-gray-900/80 hover:shadow-yellow-600/50 text-sm font-medium rounded-xl text-white bg-gray-900 hover:bg-yellow-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500'
        >
          Submit for approval
        </button>
      </div>
    </form >
    
  )
}
