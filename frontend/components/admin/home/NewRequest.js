import React, { useEffect, useState } from 'react'
import {
  UserAddIcon,
  BriefcaseIcon,
  OfficeBuildingIcon,
} from '@heroicons/react/outline'

export default function NewRequest({ student, job, company }) {
  const [studentCount, setStudentCount] = useState(0)
  const [jobCount, setJobCount] = useState(0)
  const [companyCount, setCompanyCount] = useState(0)
  const people = [
    {
      
      name: 'Student Approval',
      count: studentCount,
      icon: UserAddIcon,
    },
    {
      icon:BriefcaseIcon,
      name: 'Job Approval',
      count: jobCount,
    },
    {
      icon:OfficeBuildingIcon,
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
    <div className='p-5 '>
      <div className='font-bold text-xl'>New Requests</div>
      <div className='m-3 py-4'>
      {people.map((person) => (
                    <div key={person.name} className='bg-yellow-100 mb-4 rounded-lg flex flex-col'>
                      <div className='text-sm h-7 w-7 text-red-900 self-center m-1'>
                      <person.icon />
                      </div>
                      <div className='text-sm text-black '>
                        <div className=' text-xl font-bold rounded-full'>
                          {person.count}
                        </div>
                      </div>
                      <div className='text-sm font-semibold text-black p-1 font-mono'>
                        {person.name}
                      </div>
                    </div>
                  ))}
      </div>
    </div>
  )
}
