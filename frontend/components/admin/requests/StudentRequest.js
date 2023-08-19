import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { API_URL } from '@/config/index'
import { toast } from 'react-toastify'
import Link from 'next/link'

export default function StudentRequest({ token = '' }) {
  const [students, setStudents] = useState([])

  const handleApprove = async (id) => {
    // console.log('student', students)
    const res = await fetch(`${API_URL}/api/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        data: {
          approved: 'approved',
        },
      }),
    })
    if (!res.ok) {
      toast.success('Something Went Wrong!')
    } else {
      toast.success('Successfully Approved')
    }
    fetchData()
  }


  const handleReject = async (id) => {
    const res = await fetch(`${API_URL}/api/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        data: {
          approved: 'rejected',
        },
      }),
    })
    if (!res.ok) {
      toast.warning('Something Went Wrong!')
    } else {
      toast.info('Successfully Rejected')
    }
    fetchData()
  }

  const fetchData = async () => {
    const res = await fetch(
      `${API_URL}/api/students?filters[approved][$eq]=pending&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data = await res.json()
    if (res.ok) {
      setStudents(data.data)
    } else {
      console.log('error', data)
      toast.warning('Something Went Wrong!')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [columnDefs] = useState([
    {
      headerName: 'Student Name',
      field: 'attributes.name',
      cellRenderer: function (params) {
        return (
          <Link href={`/admin/unapproved_students/${params.data.id}`}>
            <a>{params.value}</a>
          </Link>
        )
      },
    },
    {
      headerName: 'Roll No.',
      field: 'attributes.roll',
      // cellRenderer: function (params) {
      //   return (
      //     <Link href={`/admin/students/${params.data.id}`}>
      //       <a>{params.value}</a>
      //     </Link>
      //   )
      // },
    },
    {
      headerName: 'Program',
      field: 'attributes.program.data.attributes.program_name',
    },
    {
      headerName: 'Course',
      field: 'attributes.course.data.attributes.course_name',
    },
    // {
    //   headerName: 'Registered For',
    //   field: 'attributes.registered_for',
    // },
    {
      headerName: 'Approve',
      field: 'id',
      cellRenderer: function (params) {
        return (
          <div>
            <button
              type='button'
              onClick={() => handleApprove(params.value)}
              className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            >
              Approve
            </button>
          </div>
        )
      },
    },
    {
      headerName: 'Reject',
      field: 'id',
      cellRenderer: function (params) {
        return (
          <div>
            <button
              type='button'
              onClick={() => handleReject(params.value)}
              className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
            >
              Reject
            </button>
          </div>
        )
      },
    },
  ])
  return (
    <div>
      <div className='md:flex md:items-center md:justify-between'>
        <div className='flex-1 min-w-0'>
          <h2 className='text-xl font-thin leading-7 text-gray-900 sm:text-2xl sm:truncate'>
            Student Registrations
          </h2>
        </div>
      </div>
      <div className='ag-theme-alpine mt-4' style={{ margin: "auto", width: "1100px", height: '500px' }}>
        <AgGridReact
          rowData={students}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true }}
          domLayout="normal"
          headerClass="my-header-class"
        ></AgGridReact>
      </div>
    </div >
  )
}
