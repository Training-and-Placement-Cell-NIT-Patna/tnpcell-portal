import React, { useEffect, useState } from 'react'

export default function NewRequest({ student, job, company }) {
  const [studentCount, setStudentCount] = useState(0)
  const [jobCount, setJobCount] = useState(0)
  const [companyCount, setCompanyCount] = useState(0)
  const people = [
    {
      name: 'Student Approval',
      count: studentCount,
    },
    {
      name: 'Job Approval',
      count: jobCount,
    },
    {
      name: 'Company Approval',
      count: companyCount,
    },
  ]
  useEffect(() => {
    let count = 0
    student.map((item) => {
      if (item.attributes.approved === 'pending') {
        count++
      }
    })
    setStudentCount(count)
  }, [student])

  useEffect(() => {
    if (job.meta) {
      setJobCount(job.meta.pagination.total)
    }
  }, [job])

  useEffect(() => {
    if (company.meta) {
      setCompanyCount(company.meta.pagination.total)
    }
  }, [company])

  return (
    <div className='-mx-4'>
      <p className='text-center text-xl font-bold'>New Requests</p>
      {/* Component showing notification count */}
      <div className='mt-8 flex flex-col'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden  md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-300'>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {people.map((person) => (
                    <tr key={person.name}>
                      <td className='whitespace-nowrap py-4 px-2 text-sm text-gray-600 text-left'>
                        {person.name}
                      </td>

                      <td className='whitespace-nowrap px-3 py-2 text-sm text-gray-500 '>
                        <p className='bg-cyan-600 text-white px-1 py-0.5 rounded-full'>
                          {person.count}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
