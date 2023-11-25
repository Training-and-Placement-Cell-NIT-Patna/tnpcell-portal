import { useState } from 'react'
import { toast } from 'react-toastify'
import { API_URL } from '@/config/index'

export default function EditCompany({ token = '', company = '' }) {
  const [values, setValues] = useState(company.attributes)
  const id = company.id

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
    <form>
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
                    disabled
                    value={values.company_name}
                    onChange={handleInputChange}
                    type='text'
                    name='company_name'
                    id='company_name'
                    autoComplete='company_name'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md'
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
                    disabled
                    value={values.company_address}
                    onChange={handleInputChange}
                    type='text'
                    name='company_address'
                    id='company_address'
                    autoComplete='company_address'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md'
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
                    disabled
                    value={values.remarks}
                    onChange={handleInputChange}
                    type='text'
                    name='remarks'
                    id='remarks'
                    autoComplete='remarks'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md'
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
                    disabled
                    value={values.contact1.name}
                    onChange={handleContactOneInputChange}
                    type='text'
                    name='name'
                    id='name'
                    autoComplete='name'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md'
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
                    disabled
                    value={values.contact1.mail_id}
                    onChange={handleContactOneInputChange}
                    type='text'
                    name='mail_id'
                    id='mail_id'
                    autoComplete='email'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md'
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
                    disabled
                    value={values.contact1.mobile_no}
                    onChange={handleContactOneInputChange}
                    type='text'
                    name='mobile_no'
                    id='mobile_no'
                    autoComplete='tel-national'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md'
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
                    disabled
                    value={values.contact1.designation}
                    onChange={handleContactOneInputChange}
                    type='text'
                    name='designation'
                    id='designation'
                    autoComplete='designation'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md'
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
                    disabled
                    value={values.contact2.name}
                    onChange={handleContactTwoInputChange}
                    type='text'
                    name='name'
                    id='name'
                    autoComplete='name'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md'
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
                    disabled
                    value={values.contact2.mail_id}
                    onChange={handleContactTwoInputChange}
                    type='text'
                    name='mail_id'
                    id='mail_id'
                    autoComplete='email'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md'
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
                    disabled
                    value={values.contact2.mobile_no}
                    onChange={handleContactTwoInputChange}
                    type='text'
                    name='mobile_no'
                    id='mobile_no'
                    autoComplete='tel-national'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md'
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
                    disabled
                    value={values.contact2.designation}
                    onChange={handleContactTwoInputChange}
                    type='text'
                    name='designation'
                    id='designation'
                    autoComplete='designation'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md'
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
                    disabled
                    value={values.contact3.name}
                    onChange={handleContactThreeInputChange}
                    type='text'
                    name='name'
                    id='name'
                    autoComplete='name'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md'
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
                    disabled
                    value={values.contact3.mail_id}
                    onChange={handleContactThreeInputChange}
                    type='text'
                    name='mail_id'
                    id='mail_id'
                    autoComplete='email'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md'
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
                    disabled
                    value={values.contact3.mobile_no}
                    onChange={handleContactThreeInputChange}
                    type='text'
                    name='mobile_no'
                    id='mobile_no'
                    autoComplete='tel-national'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md'
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
                    disabled
                    value={values.contact3.designation}
                    onChange={handleContactThreeInputChange}
                    type='text'
                    name='designation'
                    id='designation'
                    autoComplete='designation'
                    className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-red-300 rounded-md'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
