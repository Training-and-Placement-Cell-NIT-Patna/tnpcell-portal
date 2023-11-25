import React, { useCallback, useEffect, useState } from 'react'
import RegisteredGraph from '@/components/coordinator/home/RegisteredGraph'
import NewRequest from './NewRequest'
import { API_URL } from '@/config/index'
import axios from 'axios'
import PlacedGraph from './PlacedGraph'

export default function Home({ token = '' }) {
  const [student, setStudent] = useState([])
  const [job, setJob] = useState([])
  const [company, setCompany] = useState([])


  // const [ftestudent, setFtestudent] = useState([])
  // const [internstudent, setInternstudent] = useState([])

  useEffect(() => {
    axios
      .get(`${API_URL}/api/students?populate=*`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then(async (res) => {
        let fetched_data = res.data.data
        fetched_data = await getPlacedStatus(fetched_data)
        // Get fte students
        // const fte_students = fetched_data.filter(
        //   (student) => student.attributes.registered_for === 'FTE'
        // )
        // // Get intern students
        // const intern_students = fetched_data.filter(
        //   (student) => student.attributes.registered_for === 'Internship'
        // )

        // setFtestudent(fte_students)
        // setInternstudent(intern_students)
        setStudent(fetched_data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    fetch(
      `${API_URL}/api/jobs?filters[approval_status][$eq]=pending&populate=*`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setJob(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    fetch(`${API_URL}/api/companies?filters[status][$eq]=pending&populate=*`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setCompany(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [token])

  // Get placed status of students from /api/student/placed-status
  // @Ouput: {placed: {placed_a1: [], placed_a2: [], placed_x: []}}
  const getPlacedStatus = useCallback(async (data) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
    const res = await axios.get(`${API_URL}/api/student/placed-status`, config)
    const placed = res.data.placed
    const placed_tier1 = placed.placed_tier1
    const placed_tier2 = placed.placed_tier2
    const placed_tier3 = placed.placed_tier3

    // Update placed status of students
    const new_row_data = data.map((student) => {
      if (placed_tier1.includes(student.attributes.roll)) {
        student.attributes.placed = 'Tier1'
      } else if (placed_tier2.includes(student.attributes.roll)) {
        student.attributes.placed = 'Tier2'
      } else if (placed_tier3.includes(student.attributes.roll)) {
        student.attributes.placed = 'Tier3'
      } else {
        student.attributes.placed = 'Not Placed'
      }
      return student
    })

    return new_row_data
  }, [])

  return (
    <div className='mt-4'>
      <ul
        role='list'
        className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
      >
        <li className='md:col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200 p-4'>
          <NewRequest student={student} job={job} company={company} />
        </li>
        <li className='md:col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200 p-4'>
          <RegisteredGraph student={student} title='Registered Students' />
        </li>
        {/* <li className='md:col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200 p-4'>
          <RegisteredGraph student={ftestudent} title='FTE students' />
        </li>
        <li className='md:col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200 p-4'>
          <RegisteredGraph student={internstudent} title='Intern students' />
        </li> */}
        <li className='md:col-span-2 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200 p-4'>
          <PlacedGraph student={student} />
        </li>
      </ul>
    </div>
  )
}
