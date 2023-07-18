import { useState } from 'react'
import { toast } from 'react-toastify'
import { API_URL } from '@/config/index'

export default function EditCompany({ token = '', company = '' }) {
  const [values, setValues] = useState(company.attributes)
  const id = company.id

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    // const hasEmptyFields = Object.values(values).some((element) => {
    //   element === ''

    // })
    if (confirm('Are you sure you Edit company Details?')) {
      const res = await fetch(`${API_URL}/api/companies/${id}`, {
        method: 'PUT',
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
        toast.error(res.status)
        toast.error('Something Went Wrong')
      } else {
        toast.success('Company Edited Successfully')
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleContactOneInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      ['contact1']: {
        ...values.contact1,
        [name]: value,
      },
    })
  }
  const handleContactTwoInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      ['contact2']: {
        ...values.contact2,
        [name]: value,
      },
    })
  }
  const handleContactThreeInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      ['contact3']: {
        ...values.contact3,
        [name]: value,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='space-y-6 mt-4'>
        <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
          <div className='md:grid md:grid-cols-3 md:gap-6'>
            <div className='md:col-span-1'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Company Details
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Some other details of the company
              </p>
            </div>
            <div className='mt-5 md:mt-0 md:col-span-2'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='company_name'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Company Name
                  </label>
                  <input
                    value={values.company_name}
                    onChange={handleInputChange}
                    type='text'
                    name='company_name'
                    id='company_name'
                    autoComplete='company_name'
                    required
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='company_address'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Company address
                  </label>
                  <textarea
                    value={values.company_address}
                    onChange={handleInputChange}
                    type='text'
                    name='company_address'
                    id='company_address'
                    autoComplete='company_address'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>

                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='remarks'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Remarks
                  </label>
                  <input
                    value={values.remarks}
                    onChange={handleInputChange}
                    type='text'
                    name='remarks'
                    id='remarks'
                    autoComplete='remarks'
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
                Contact 1
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Details of 1st Contact person.
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
                    value={values.contact1.name}
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
                    value={values.contact1.mail_id}
                    onChange={handleContactOneInputChange}
                    type='text'
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
                    value={values.contact1.mobile_no}
                    onChange={handleContactOneInputChange}
                    type='text'
                    name='mobile_no'
                    id='mobile_no'
                    autoComplete='tel-national'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'

                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
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
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
          <div className='md:grid md:grid-cols-3 md:gap-6'>
            <div className='md:col-span-1'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Contact 2
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Details of 2nd Contact person.
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
                    value={values.contact2.name}
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
                    value={values.contact2.mail_id}
                    onChange={handleContactTwoInputChange}
                    type='text'
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
                    value={values.contact2.mobile_no}
                    onChange={handleContactTwoInputChange}
                    type='text'
                    name='mobile_no'
                    id='mobile_no'
                    autoComplete='tel-national'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
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
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
          <div className='md:grid md:grid-cols-3 md:gap-6'>
            <div className='md:col-span-1'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Contact 3
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Details of 3rd Contact person.
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
                    value={values.contact3.name}
                    onChange={handleContactThreeInputChange}
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
                    value={values.contact3.mail_id}
                    onChange={handleContactThreeInputChange}
                    type='text'
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
                    value={values.contact3.mobile_no}
                    onChange={handleContactThreeInputChange}
                    type='text'
                    name='mobile_no'
                    id='mobile_no'
                    autoComplete='tel-national'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='designation'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Designation
                  </label>
                  <input
                    value={values.contact3.designation}
                    onChange={handleContactThreeInputChange}
                    type='text'
                    name='designation'
                    id='designation'
                    autoComplete='designation'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
          >
            Edit
          </button>
        </div>
      </div>
    </form>
  )
}
